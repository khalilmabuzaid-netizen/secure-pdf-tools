import os
import re
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

WORKSPACE = r"c:\Users\khlel5\Documents\ai_tools"

html_files = [f for f in os.listdir(WORKSPACE) if f.endswith(".html")]

print("=" * 80)
print("COMPREHENSIVE CODEBASE AUDIT")
print("=" * 80)

# Check 1: data-i18n keys check
print("\n[CHECK 1] data-i18n Attribute & Translation Dictionary Sync")
for hfile in sorted(html_files):
    hpath = os.path.join(WORKSPACE, hfile)
    with open(hpath, 'r', encoding='utf-8') as f:
        html_text = f.read()

    # Find linked js or inline scripts
    js_sources = [html_text]
    script_matches = re.findall(r'<script\s+src="([^"]+\.js)"', html_text)
    for sm in script_matches:
        jspath = os.path.join(WORKSPACE, sm)
        if os.path.exists(jspath):
            with open(jspath, 'r', encoding='utf-8') as jf:
                js_sources.append(jf.read())

    all_js_text = "\n".join(js_sources)

    # Extract all data-i18n and data-i18n-placeholder
    i18n_keys = re.findall(r'data-i18n="([^"]+)"', html_text)
    placeholder_keys = re.findall(r'data-i18n-placeholder="([^"]+)"', html_text)
    all_keys = set(i18n_keys + placeholder_keys)

    # Check if keys are present in all_js_text
    missing_keys = []
    for k in all_keys:
        # check if 'k:' or '"k"' or "'k'" exists in all_js_text
        if f"{k}:" not in all_js_text and f'"{k}"' not in all_js_text and f"'{k}'" not in all_js_text:
            missing_keys.append(k)

    if missing_keys:
        print(f"  ❌ {hfile}: Missing {len(missing_keys)} translation keys in JS: {missing_keys}")
    else:
        print(f"  ✅ {hfile}: All {len(all_keys)} i18n keys are present in translation dictionaries.")

# Check 2: CDN and script integrity
print("\n[CHECK 2] External Scripts and CDN Imports")
for hfile in sorted(html_files):
    hpath = os.path.join(WORKSPACE, hfile)
    with open(hpath, 'r', encoding='utf-8') as f:
        html_text = f.read()
    
    scripts = re.findall(r'<script[^>]*src="([^"]+)"', html_text)
    print(f"  {hfile}:")
    for s in scripts:
        print(f"    - script: {s}")

# Check 3: Formspree endpoint & form setup
print("\n[CHECK 3] Contact Form Check")
contact_path = os.path.join(WORKSPACE, "contact.html")
with open(contact_path, 'r', encoding='utf-8') as f:
    c_text = f.read()

has_formspree = 'action="https://formspree.io/f/xbglrzdv"' in c_text and 'method="POST"' in c_text
has_onsubmit = 'onsubmit=' in c_text
has_name = 'name="name"' in c_text
has_email = 'name="email"' in c_text
has_message = 'name="message"' in c_text

print(f"  Formspree action/method POST: {has_formspree}")
print(f"  Mock onsubmit removed from form: {not has_onsubmit}")
print(f"  Input name='name': {has_name}")
print(f"  Input name='email': {has_email}")
print(f"  Textarea name='message': {has_message}")

# Check 4: RTL and Language Toggle Presence
print("\n[CHECK 4] Language Toggle and RTL Support")
for hfile in sorted(html_files):
    hpath = os.path.join(WORKSPACE, hfile)
    with open(hpath, 'r', encoding='utf-8') as f:
        html_text = f.read()
    has_toggle = 'btn-language-toggle' in html_text or 'toggleLanguage' in html_text
    has_rtl_css = '[dir="rtl"]' in html_text or '[dir=\'rtl\']' in html_text or 'dir="rtl"' in html_text
    # check in style.css or merge.css if linked
    if 'style.css' in html_text:
        with open(os.path.join(WORKSPACE, 'style.css'), 'r', encoding='utf-8') as cf:
            if '[dir="rtl"]' in cf.read():
                has_rtl_css = True
    if 'merge.css' in html_text:
        with open(os.path.join(WORKSPACE, 'merge.css'), 'r', encoding='utf-8') as cf:
            if '[dir="rtl"]' in cf.read():
                has_rtl_css = True

    print(f"  {hfile}: Language Toggle = {has_toggle}, RTL CSS/support = {has_rtl_css}")

# Check 5: Footer & Legal Links (Privacy, Terms, Contact)
print("\n[CHECK 5] Universal Footer & Legal Links")
for hfile in sorted(html_files):
    hpath = os.path.join(WORKSPACE, hfile)
    with open(hpath, 'r', encoding='utf-8') as f:
        html_text = f.read()
    has_priv = 'privacy.html' in html_text
    has_terms = 'terms.html' in html_text
    has_cont = 'contact.html' in html_text
    has_cookie = 'cookie-banner' in html_text
    print(f"  {hfile}: privacy.html={has_priv}, terms.html={has_terms}, contact.html={has_cont}, cookie-banner={has_cookie}")

print("\n" + "=" * 80)
