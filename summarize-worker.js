/**
 * summarize-worker.js - Dedicated Web Worker for In-Browser PDF Summarization
 * 
 * 4 Golden Performance Rules:
 * 1. 100% Web Worker offloading (Zero main-thread blocking, 60 FPS UI).
 * 2. On-Demand Lazy Initialization (0 MB initial bundle impact on page load).
 * 3. Quantized Model (quantized: true, Xenova/distilbart-cnn-6-6 ~40 MB lightweight weights).
 * 4. Transparent Progress Tracking (progress_callback for real-time download bar).
 */

import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

// Enforce browser cache & disable local fs lookup
env.allowLocalModels = false;
env.useBrowserCache = true;

let summarizerPipeline = null;
let isInitializing = false;

self.addEventListener('message', async (event) => {
  const { type, text, format = 'bullets', length = 'short', maxPages = 80 } = event.data || {};

  // 1. On-Demand Lazy Model Loading & Caching
  if (type === 'init' || type === 'summarize') {
    if (!summarizerPipeline && !isInitializing) {
      isInitializing = true;
      try {
        self.postMessage({
          status: 'loading_model',
          message: 'Downloading lightweight local AI model (~40 MB)...'
        });

        summarizerPipeline = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6', {
          quantized: true, // Rule 3: Quantized 8-bit model for minimal download size & fast inference
          progress_callback: (info) => {
            if (info.status === 'progress') {
              self.postMessage({
                status: 'progress',
                file: info.file || 'model.onnx',
                progress: Math.round(info.progress || 0),
                loaded: info.loaded,
                total: info.total
              });
            }
          }
        });

        isInitializing = false;
        self.postMessage({
          status: 'ready',
          message: 'Local AI summarizer loaded and cached in browser memory.'
        });
      } catch (err) {
        isInitializing = false;
        self.postMessage({
          status: 'error',
          error: `Failed to load AI summarization model: ${err.message}`
        });
        return;
      }
    }
  }

  // 2. Summarization Execution with Intelligent Chunking
  if (type === 'summarize') {
    if (!summarizerPipeline) {
      self.postMessage({
        status: 'error',
        error: 'Summarization Model is not ready yet.'
      });
      return;
    }

    try {
      self.postMessage({ status: 'analyzing', stage: 'chunking' });

      if (!text || !text.trim()) {
        self.postMessage({
          status: 'error',
          error: 'No text provided for summarization.'
        });
        return;
      }

      const startTime = performance.now();

      // Chunk text into clean ~400-word windows to avoid token overflow
      const chunks = splitTextIntoChunks(text, 400, 50);

      const maxChunksToProcess = Math.min(chunks.length, 12); // Protect memory & runtime
      const chunkSummaries = [];

      // Length parameters based on user selection
      const isShort = (length === 'short');
      const minLength = isShort ? 25 : 45;
      const maxLength = isShort ? 65 : 120;

      for (let i = 0; i < maxChunksToProcess; i++) {
        self.postMessage({
          status: 'chunk_progress',
          current: i + 1,
          total: maxChunksToProcess,
          percent: Math.round(((i + 1) / maxChunksToProcess) * 100)
        });

        const chunk = chunks[i];
        // Only summarize chunks with sufficient substance (> 30 words)
        const wordCount = chunk.split(/\s+/).filter(Boolean).length;
        if (wordCount < 30) {
          chunkSummaries.push(chunk.trim());
          continue;
        }

        const out = await summarizerPipeline(chunk, {
          max_length: maxLength,
          min_length: minLength,
          no_repeat_ngram_size: 3,
          early_stopping: true
        });

        if (out && out[0] && out[0].summary_text) {
          chunkSummaries.push(out[0].summary_text.trim());
        }
      }

      // Format final output based on user format preference
      let finalSummary = '';
      if (format === 'bullets') {
        const bulletList = chunkSummaries.map((s, idx) => {
          // Clean summary sentence
          let cleanSentence = s.replace(/^[-•*]\s*/, '').trim();
          if (!cleanSentence.endsWith('.')) cleanSentence += '.';
          return `• ${cleanSentence}`;
        });
        finalSummary = bulletList.join('\n\n');
      } else {
        // Executive paragraph overview
        finalSummary = chunkSummaries.join(' ');
      }

      const durationMs = Math.round(performance.now() - startTime);

      self.postMessage({
        status: 'complete',
        result: {
          summary: finalSummary,
          format,
          length,
          chunksProcessed: maxChunksToProcess,
          totalChunks: chunks.length,
          durationMs
        }
      });

      // Memory hygiene
      chunks.length = 0;
      chunkSummaries.length = 0;
    } catch (err) {
      self.postMessage({
        status: 'error',
        error: `Summarization failed: ${err.message}`
      });
    }
  }
});

/**
 * Text Chunking Helper
 * Splits large document text into overlapping windows of words
 */
function splitTextIntoChunks(text, chunkSize = 400, overlap = 50) {
  const words = text.replace(/\s+/g, ' ').trim().split(' ');
  if (words.length <= chunkSize) {
    return [text];
  }

  const chunks = [];
  let i = 0;
  while (i < words.length) {
    const chunkWords = words.slice(i, i + chunkSize);
    chunks.push(chunkWords.join(' '));
    i += (chunkSize - overlap);
  }
  return chunks;
}
