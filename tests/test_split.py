import os
import re
import sys

def test_split_implementation():
    base_dir = os.path.dirname(os.path.dirname(__file__))
    split_html_path = os.path.join(base_dir, "split.html")
    split_js_path = os.path.join(base_dir, "split.js")

    assert os.path.exists(split_html_path), "split.html does not exist"
    assert os.path.exists(split_js_path), "split.js does not exist"

    with open(split_html_path, "r", encoding="utf-8") as f:
        html = f.read()

    with open(split_js_path, "r", encoding="utf-8") as f:
        js = f.read()

    print("=" * 60)
    print("VERIFYING SPLIT PDF TOOL IMPLEMENTATION")
    print("=" * 60)

    checks = []

    # 1. HTML Elements
    has_dropzone = 'id="dropzone"' in html
    has_file_input = 'id="pdf-file-input"' in html
    has_config_panel = 'id="config-panel"' in html
    has_range_input = 'id="page-range-input"' in html
    has_split_btn = 'id="btn-execute-split"' in html
    has_hub_btn = 'href="index.html"' in html
    has_pdflib_cdn = "unpkg.com/pdf-lib" in html or "pdf-lib.min.js" in html
    has_sample_btn = 'id="btn-load-sample"' in html

    checks.append(("Dropzone element in split.html", has_dropzone))
    checks.append(("Hidden file input in split.html", has_file_input))
    checks.append(("Configuration panel in split.html", has_config_panel))
    checks.append(("Page range input field in split.html", has_range_input))
    checks.append(("Split & Download execution button in split.html", has_split_btn))
    checks.append(("Back to Hub button (index.html) in split.html", has_hub_btn))
    checks.append(("PDF-Lib CDN included in split.html", has_pdflib_cdn))
    checks.append(("Try Sample PDF button in split.html", has_sample_btn))

    # 2. JS Logic
    has_parse_range = "function parsePageRanges" in js
    has_pdflib_load = "PDFLib.PDFDocument.load" in js
    has_pdflib_create = "PDFLib.PDFDocument.create" in js
    has_copy_pages = "copyPages" in js
    has_add_page = "addPage" in js
    has_save = "save()" in js
    has_download_trigger = "createElement('a')" in js and "download" in js
    has_error_handling = "try {" in js and "catch" in js

    checks.append(("parsePageRanges function in split.js", has_parse_range))
    checks.append(("PDFDocument.load in split.js", has_pdflib_load))
    checks.append(("PDFDocument.create in split.js", has_pdflib_create))
    checks.append(("copyPages logic in split.js", has_copy_pages))
    checks.append(("addPage logic in split.js", has_add_page))
    checks.append(("save() logic in split.js", has_save))
    checks.append(("Client-side download trigger in split.js", has_download_trigger))
    checks.append(("Error handling & validation feedback in split.js", has_error_handling))

    # Report results
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
    success = test_split_implementation()
    sys.exit(0 if success else 1)
