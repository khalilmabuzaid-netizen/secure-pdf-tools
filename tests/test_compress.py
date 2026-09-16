import os
import sys

def test_compress_implementation():
    base_dir = os.path.dirname(os.path.dirname(__file__))
    compress_html_path = os.path.join(base_dir, "compress.html")
    compress_js_path = os.path.join(base_dir, "compress.js")

    assert os.path.exists(compress_html_path), "compress.html does not exist"
    assert os.path.exists(compress_js_path), "compress.js does not exist"

    with open(compress_html_path, "r", encoding="utf-8") as f:
        html = f.read()

    with open(compress_js_path, "r", encoding="utf-8") as f:
        js = f.read()

    print("=" * 60)
    print("VERIFYING COMPRESS PDF TOOL IMPLEMENTATION")
    print("=" * 60)

    checks = []

    # 1. HTML Element verification
    checks.append(("Dropzone element in compress.html", 'id="dropzone"' in html))
    checks.append(("Hidden file input in compress.html", 'id="pdf-file-input"' in html))
    checks.append(("Configuration panel in compress.html", 'id="config-panel"' in html))
    checks.append(("Compression presets in compress.html", 'data-level="extreme"' in html and 'data-level="balanced"' in html and 'data-level="light"' in html))
    checks.append(("Quality slider in compress.html", 'id="quality-slider"' in html))
    checks.append(("Progress bar card in compress.html", 'id="progress-card"' in html and 'id="progress-fill"' in html))
    checks.append(("Compress & Download button in compress.html", 'id="btn-execute-compress"' in html))
    checks.append(("Back to Hub button in compress.html", 'href="index.html"' in html))
    checks.append(("PDF.js CDN in compress.html", "pdf.js" in html))
    checks.append(("PDF-Lib CDN in compress.html", "pdf-lib.min.js" in html or "unpkg.com/pdf-lib" in html))

    # 2. JavaScript logic verification
    checks.append(("Preset configurations in compress.js", "COMPRESSION_PRESETS" in js))
    checks.append(("PDF.js worker initialization in compress.js", "GlobalWorkerOptions.workerSrc" in js))
    checks.append(("PDF.js getDocument loading in compress.js", "pdfjsLib.getDocument" in js))
    checks.append(("PDF-Lib document synthesis in compress.js", "PDFLib.PDFDocument.create" in js))
    checks.append(("Canvas toDataURL JPEG export in compress.js", "toDataURL('image/jpeg'" in js or 'toDataURL("image/jpeg"' in js))
    checks.append(("PDF-Lib embedJpg in compress.js", "embedJpg" in js))
    checks.append(("Progress update handling in compress.js", "updateProgress" in js))
    checks.append(("Savings statistics calculation in compress.js", "reductionPercent" in js or "bytesSaved" in js))
    checks.append(("Client-side download trigger in compress.js", "createElement('a')" in js and "download" in js))

    all_passed = True
    for desc, passed in checks:
        status = "[PASS]" if passed else "[FAIL]"
        print(f"  {status} {desc}")
        if not passed:
            all_passed = False

    print("-" * 60)
    if all_passed:
        print(f"RESULT: ALL {len(checks)} CHECKS PASSED SUCCESSFULLY!\n")
    else:
        print("RESULT: SOME CHECKS FAILED!\n")
    return all_passed

if __name__ == "__main__":
    success = test_compress_implementation()
    sys.exit(0 if success else 1)
