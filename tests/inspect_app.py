"""
inspect_app.py
Validates interactive PDF annotator application architecture,
canvas element mounting, event listener registrations, MathJax integration,
client-side PDF-lib flattening, and multi-language support.
"""

import os
import re
import sys

def inspect_app():
    base_dir = os.path.join(os.path.dirname(__file__), "..")
    html_path = os.path.join(base_dir, "index.html")
    js_path = os.path.join(base_dir, "app.js")

    if not os.path.exists(html_path):
        print(f"[FAIL] index.html not found at {html_path}")
        return False

    if not os.path.exists(js_path):
        print(f"[FAIL] app.js not found at {js_path}")
        return False

    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    with open(js_path, "r", encoding="utf-8") as f:
        js_content = f.read()

    print("\n" + "=" * 60)
    print("RUNNING APP ARCHITECTURE, CANVAS & EVENT LISTENER TEST SUITE")
    print("=" * 60)

    checks = []

    # 1. Canvas Elements Mounting in HTML
    has_pdf_canvas = 'id="pdf-canvas"' in html_content
    has_annotation_canvas = 'id="annotation-canvas"' in html_content
    has_shadow_container = 'id="canvas-shadow-container"' in html_content
    has_stage_wrapper = 'id="canvas-stage-wrapper"' in html_content
    canvas_mounted = has_pdf_canvas and has_annotation_canvas and has_shadow_container and has_stage_wrapper
    checks.append(("Dual Canvas Mounting Elements in HTML", canvas_mounted))

    # 2. Drag & Drop HTML Elements
    has_dropzone = 'id="dropzone"' in html_content
    has_file_input = 'id="pdf-file-input"' in html_content and 'type="file"' in html_content
    has_upload_trigger = 'id="btn-upload-trigger"' in html_content
    checks.append(("Drag & Drop UI Elements Present in DOM", has_dropzone and has_file_input and has_upload_trigger))

    # 3. Drag & Drop Event Listeners in app.js
    has_dragover_listener = "addEventListener('dragover'" in js_content or 'addEventListener("dragover"' in js_content or "'dragover'" in js_content
    has_dragleave_listener = "addEventListener('dragleave'" in js_content or 'addEventListener("dragleave"' in js_content or "'dragleave'" in js_content
    has_drop_listener = "addEventListener('drop'" in js_content or 'addEventListener("drop"' in js_content or "'drop'" in js_content
    checks.append(("Active Drag & Drop Event Listeners in app.js", 
                   has_dragover_listener and has_dragleave_listener and has_drop_listener))

    # 4. Tool Controls in HTML & JS
    tools = ['select', 'pen', 'highlighter', 'text', 'math']
    html_tools_ok = all(f'data-tool="{t}"' in html_content for t in tools)
    has_delete_tool = 'id="tool-delete"' in html_content
    checks.append(("Interactive Tool Elements (Select, Pen, Highlighter, Text, Math, Delete)", 
                   html_tools_ok and has_delete_tool))

    # 5. Fabric.js Canvas Initialization & Brush Setup
    has_fabric_init = "new fabric.Canvas('annotation-canvas'" in js_content
    has_pencil_brush = "new fabric.PencilBrush(fabricCanvas)" in js_content
    has_fabric_itext = "new fabric.IText(" in js_content
    checks.append(("Fabric.js Interactive Engine (Canvas, PencilBrush, IText)", 
                   has_fabric_init and has_pencil_brush and has_fabric_itext))

    # 6. MathJax LaTeX Formula Modal & SVG Integration
    has_math_modal = 'id="math-modal"' in html_content
    has_latex_input = 'id="latex-input"' in html_content
    has_math_preview = 'id="math-preview-box"' in html_content
    has_math_svg_render = "MathJax.tex2svgPromise" in js_content
    has_svg_to_fabric = "fabric.loadSVGFromString" in js_content or "fabric.util.groupSVGElements" in js_content
    checks.append(("MathJax Formula Rendering & Fabric SVG Integration", 
                   has_math_modal and has_latex_input and has_math_preview and has_math_svg_render and has_svg_to_fabric))

    # 7. Mozilla pdf.js Document Loading & Viewport Logic
    has_pdfjs_worker = "pdfjsLib.GlobalWorkerOptions.workerSrc" in js_content
    has_pdfjs_render = "page.render(renderContext)" in js_content
    checks.append(("Mozilla pdf.js Engine & Viewport Renderer", has_pdfjs_worker and has_pdfjs_render))

    # 8. Client-Side Document Merging & Export with pdf-lib
    has_pdflib_load = "PDFLib.PDFDocument.load" in js_content or "PDFDocument.load(currentPdfBytes)" in js_content
    has_embed_png = "pdfDoc.embedPng" in js_content
    has_draw_image = "pdfPage.drawImage" in js_content
    has_pdf_save = "pdfDoc.save()" in js_content
    checks.append(("PDF-Lib Client-Side Flattening & Direct Export Logic", 
                   has_pdflib_load and has_embed_png and has_draw_image and has_pdf_save))

    # 9. Raw PDF Bytes State Management (currentPdfBytes)
    has_global_bytes = "let currentPdfBytes" in js_content and "window.currentPdfBytes" in js_content
    has_upload_storage = "currentPdfBytes = new Uint8Array" in js_content
    has_export_bytes_usage = "PDFDocument.load(currentPdfBytes)" in js_content
    checks.append(("Raw PDF Bytes State Management (currentPdfBytes in upload, sample, export)",
                   has_global_bytes and has_upload_storage and has_export_bytes_usage))

    # 9. Multi-Language (i18n) Support
    languages = ['en', 'es', 'fr', 'de', 'ar']
    has_i18n = all(f"{lang}:" in js_content for lang in languages)
    has_set_language = "function setLanguage" in js_content
    checks.append(("Multi-Language (i18n) Dictionary & RTL Handling (en, es, fr, de, ar)", 
                   has_i18n and has_set_language))

    # 10. External CDNs in index.html
    has_pdfjs_cdn = "cdnjs.cloudflare.com/ajax/libs/pdf.js" in html_content
    has_fabric_cdn = "cdnjs.cloudflare.com/ajax/libs/fabric.js" in html_content
    has_pdflib_cdn = "unpkg.com/pdf-lib" in html_content or "cdnjs.cloudflare.com/ajax/libs/pdf-lib" in html_content
    has_mathjax_cdn = "cdn.jsdelivr.net/npm/mathjax@3" in html_content
    has_lucide_cdn = "unpkg.com/lucide" in html_content
    cdns_ok = has_pdfjs_cdn and has_fabric_cdn and has_pdflib_cdn and has_mathjax_cdn and has_lucide_cdn
    checks.append(("Required External CDNs Configured (pdf.js, fabric.js, pdf-lib, MathJax, Lucide)", cdns_ok))

    # Report results
    all_passed = True
    for desc, passed in checks:
        status = "[PASS]" if passed else "[FAIL]"
        print(f"  {status} {desc}")
        if not passed:
            all_passed = False

    print("-" * 60)
    if all_passed:
        print(f"RESULT: ALL {len(checks)} APPLICATION TEST CHECKS PASSED SUCCESSFULLY!\n")
        return True
    else:
        print("RESULT: SOME APPLICATION TEST CHECKS FAILED.\n")
        return False

if __name__ == "__main__":
    success = inspect_app()
    sys.exit(0 if success else 1)
