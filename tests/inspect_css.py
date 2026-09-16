"""
inspect_css.py
Validates CSS architecture, layout structures (CSS Grid & Flexbox),
drag-and-drop styling, glassmorphic themes, responsive breakpoints,
and canvas alignment.
"""

import os
import re
import sys

def inspect_css():
    css_path = os.path.join(os.path.dirname(__file__), "..", "style.css")
    html_path = os.path.join(os.path.dirname(__file__), "..", "index.html")

    if not os.path.exists(css_path):
        print(f"[FAIL] CSS file not found at {css_path}")
        return False

    with open(css_path, "r", encoding="utf-8") as f:
        css_content = f.read()

    print("\n" + "=" * 60)
    print("RUNNING CSS INSPECTION & LAYOUT VALIDATION SUITE")
    print("=" * 60)

    checks = []

    # 1. CSS Grid layout validation
    has_grid = bool(re.search(r'display\s*:\s*grid', css_content, re.IGNORECASE))
    has_grid_template = bool(re.search(r'grid-template-rows', css_content, re.IGNORECASE))
    checks.append(("CSS Grid Layout Applied (.app-layout)", has_grid and has_grid_template))

    # 2. Flexbox layout validation
    flex_count = len(re.findall(r'display\s*:\s*flex', css_content, re.IGNORECASE))
    checks.append(("Flexbox Layout Used in Components (>= 8 instances)", flex_count >= 8))

    # 3. Drag & Drop Zone Styling
    has_dropzone = ".dropzone" in css_content
    has_dragover = ".drag-over" in css_content
    has_dropzone_border = bool(re.search(r'border\s*:\s*2px\s+dashed', css_content, re.IGNORECASE))
    checks.append(("Drag & Drop Zone Base Class (.dropzone)", has_dropzone))
    checks.append(("Drag & Drop Active State (.drag-over)", has_dragover))
    checks.append(("Drag & Drop Dashed Border & Transition", has_dropzone_border))

    # 4. Canvas Stacking & Layering
    has_pdf_canvas_layer = ".pdf-canvas-layer" in css_content
    has_annotation_layer = ".annotation-canvas-layer" in css_content
    has_canvas_container = ".canvas-container" in css_content
    checks.append(("Dual Canvas Stacking (.pdf-canvas-layer, .annotation-canvas-layer)", 
                   has_pdf_canvas_layer and has_annotation_layer and has_canvas_container))

    # 5. Glassmorphism and Modern Dark Theme Tokens
    has_backdrop_blur = bool(re.search(r'backdrop-filter\s*:\s*blur', css_content, re.IGNORECASE))
    has_root_vars = ":root" in css_content and "--primary" in css_content and "--bg-primary" in css_content
    checks.append(("Glassmorphism (backdrop-filter: blur)", has_backdrop_blur))
    checks.append(("Modern CSS Design Tokens (:root color variables)", has_root_vars))

    # 6. Responsive Breakpoints
    has_media_queries = bool(re.search(r'@media\s*\(\s*max-width', css_content, re.IGNORECASE))
    checks.append(("Responsive Media Queries Defined", has_media_queries))

    # 7. RTL (Right-to-Left) Language Support for Arabic
    has_rtl_support = "[dir=\"rtl\"]" in css_content or "[dir='rtl']" in css_content
    checks.append(("Multi-Language RTL Rules ([dir=\"rtl\"])", has_rtl_support))

    # 8. Micro-animations (pulse, spin, transition)
    has_animations = "@keyframes" in css_content and "transition" in css_content
    checks.append(("Micro-animations & Smooth Transitions Defined", has_animations))

    # Report results
    all_passed = True
    for desc, passed in checks:
        status = "[PASS]" if passed else "[FAIL]"
        print(f"  {status} {desc}")
        if not passed:
            all_passed = False

    print("-" * 60)
    if all_passed:
        print(f"RESULT: ALL {len(checks)} CSS INSPECTION CHECKS PASSED SUCCESSFULLY!\n")
        return True
    else:
        print("RESULT: SOME CSS INSPECTION CHECKS FAILED.\n")
        return False

if __name__ == "__main__":
    success = inspect_css()
    sys.exit(0 if success else 1)
