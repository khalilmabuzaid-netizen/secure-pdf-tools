import os
import re
import json

def verify_i18n_implementation():
    base_dir = os.path.dirname(os.path.dirname(__file__))
    annotator_html = os.path.join(base_dir, "annotator.html")
    app_js = os.path.join(base_dir, "app.js")
    style_css = os.path.join(base_dir, "style.css")

    with open(annotator_html, "r", encoding="utf-8") as f:
        html = f.read()

    with open(app_js, "r", encoding="utf-8") as f:
        js = f.read()

    with open(style_css, "r", encoding="utf-8") as f:
        css = f.read()

    print("=" * 60)
    print("VERIFYING ARABIC / ENGLISH I18N AND CANVAS PROTECTION")
    print("=" * 60)

    checks = []

    # 1. Check data-i18n in annotator.html
    required_html_keys = [
        "badge_client_side", "nav_upload", "nav_sample", "nav_merge",
        "nav_clear", "nav_export", "tool_select", "tool_pen",
        "tool_highlighter", "tool_text", "tool_math", "tool_delete",
        "action_undo", "action_redo", "prop_color", "prop_size",
        "prop_opacity", "prop_font", "prop_font_size", "hint_default",
        "dropzone_title", "dropzone_desc", "dropzone_browse",
        "dropzone_sample", "feature_private", "feature_math",
        "feature_flatten", "label_page", "math_modal_title",
        "math_presets", "math_input_label", "math_preview_label",
        "math_preview_placeholder", "math_color_label", "math_scale_label",
        "btn_cancel", "btn_insert_formula", "loading_text"
    ]

    missing_html_keys = [k for k in required_html_keys if f'data-i18n="{k}"' not in html]
    checks.append(("All required data-i18n attributes present in annotator.html", len(missing_html_keys) == 0, missing_html_keys))

    # 2. Check language toggle button in header
    has_toggle_btn = 'id="btn-language-toggle"' in html
    has_toggle_text = 'id="lang-toggle-text"' in html
    checks.append(("Language toggle button and text element present in header", has_toggle_btn and has_toggle_text, None))

    # 3. Check translations JSON object in app.js
    has_translations = "const translations = {" in js or "const translations={" in js
    checks.append(("translations JSON dictionary defined in app.js", has_translations, None))

    # 4. Check translations contains en and ar
    has_en = "en: {" in js
    has_ar = "ar: {" in js
    checks.append(("translations contains 'en' and 'ar' dictionaries", has_en and has_ar, None))

    # 5. Check toggle logic in app.js
    has_current_lang = "let currentLang" in js
    has_toggle_func = "function toggleLanguage" in js
    has_set_lang_func = "function setLanguage" in js
    has_rtl_dir_switch = "document.documentElement.dir = isArabic ? 'rtl' : 'ltr'" in js or "document.documentElement.dir =" in js
    has_font_update = "'Segoe UI Arabic'" in js
    checks.append(("Toggle logic, direction switching, and font switching in app.js", 
                   has_current_lang and has_toggle_func and has_set_lang_func and has_rtl_dir_switch and has_font_update, None))

    # 6. CRITICAL - Canvas Protection
    has_protect_func = "function protectCanvasLTR" in js
    has_canvas_dir_attr = 'dir="ltr"' in html and 'id="canvas-stage-wrapper" dir="ltr"' in html
    has_css_canvas_protection = ".canvas-stage-wrapper" in css and "direction: ltr !important" in css
    checks.append(("Canvas Protection (HTML dir='ltr', CSS !important LTR, JS protectCanvasLTR)",
                   has_protect_func and has_canvas_dir_attr and has_css_canvas_protection, None))

    # 7. CSS RTL font support
    has_css_arabic_font = '[dir="rtl"]' in css and 'Segoe UI Arabic' in css
    checks.append(("CSS [dir='rtl'] styling and Arabic font typography configured", has_css_arabic_font, None))

    # Report results
    all_ok = True
    for name, passed, extra in checks:
        status = "[PASS]" if passed else "[FAIL]"
        print(f"{status} {name}")
        if not passed:
            all_ok = False
            if extra:
                print(f"       Details: {extra}")

    print("-" * 60)
    if all_ok:
        print("ALL I18N AND CANVAS PROTECTION VERIFICATION CHECKS PASSED!\n")
    else:
        print("SOME VERIFICATION CHECKS FAILED!\n")
    return all_ok

if __name__ == "__main__":
    import sys
    ok = verify_i18n_implementation()
    sys.exit(0 if ok else 1)
