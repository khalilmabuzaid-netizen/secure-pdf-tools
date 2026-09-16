import os
import re
from html.parser import HTMLParser

WORKSPACE = r"c:\Users\khlel5\Documents\ai_tools"
html_files = [f for f in os.listdir(WORKSPACE) if f.endswith(".html")]
js_files = [f for f in os.listdir(WORKSPACE) if f.endswith(".js")]
css_files = [f for f in os.listdir(WORKSPACE) if f.endswith(".css")]

print("=" * 70)
print("COMPREHENSIVE PRE-DEPLOYMENT QA AUDIT")
print(f"HTML Files ({len(html_files)}): {html_files}")
print(f"JS Files ({len(js_files)}): {js_files}")
print(f"CSS Files ({len(css_files)}): {css_files}")
print("=" * 70)

# 1. HTML VALIDATION & DUPLICATE ID CHECK
class QAHTMLParser(HTMLParser):
    def __init__(self, filename):
        super().__init__()
        self.filename = filename
        self.tags = []
        self.ids = set()
        self.duplicate_ids = []
        self.local_links = []
        self.i18n_keys = []
        self.i18n_placeholder_keys = []
        self.has_viewport = False
        self.has_charset = False
        self.has_title = False
        self.has_description = False
        self.has_h1 = False
        self.h1_count = 0
        self.has_footer = False
        self.has_cookie_banner = False
        self.scripts = []
        self.stylesheets = []
        self.unclosed_void_tags = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        
        # Check duplicate IDs
        if 'id' in attrs_dict:
            elem_id = attrs_dict['id']
            if elem_id in self.ids:
                self.duplicate_ids.append((elem_id, self.getpos()))
            else:
                self.ids.add(elem_id)
                
        # Check links
        if tag == 'a' and 'href' in attrs_dict:
            href = attrs_dict['href']
            if not href.startswith(('http://', 'https://', '#', 'mailto:', 'tel:', 'javascript:')):
                self.local_links.append(href.split('#')[0].split('?')[0])
                
        # Check data-i18n
        if 'data-i18n' in attrs_dict:
            self.i18n_keys.append(attrs_dict['data-i18n'])
        if 'data-i18n-placeholder' in attrs_dict:
            self.i18n_placeholder_keys.append(attrs_dict['data-i18n-placeholder'])
            
        # Check meta tags
        if tag == 'meta':
            if 'charset' in attrs_dict:
                self.has_charset = True
            if attrs_dict.get('name', '').lower() == 'viewport':
                self.has_viewport = True
            if attrs_dict.get('name', '').lower() == 'description':
                self.has_description = True
                
        if tag == 'title':
            self.has_title = True
        if tag == 'h1':
            self.has_h1 = True
            self.h1_count += 1
        if tag == 'footer' or 'site-footer' in attrs_dict.get('class', ''):
            self.has_footer = True
        if 'cookie-banner' in attrs_dict.get('class', '') or attrs_dict.get('id') == 'cookie-banner':
            self.has_cookie_banner = True
            
        if tag == 'script' and 'src' in attrs_dict:
            self.scripts.append(attrs_dict['src'])
        if tag == 'link' and attrs_dict.get('rel') == 'stylesheet' and 'href' in attrs_dict:
            self.stylesheets.append(attrs_dict['href'])

print("\n--- SECTION 1: HTML & SEO AUDIT ---")
for hfile in sorted(html_files):
    filepath = os.path.join(WORKSPACE, hfile)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    parser = QAHTMLParser(hfile)
    try:
        parser.feed(content)
        print(f"\n[HTML Check: {hfile}]")
        print(f"  - Title present: {parser.has_title}")
        print(f"  - Description present: {parser.has_description}")
        print(f"  - Viewport present: {parser.has_viewport}")
        print(f"  - Charset present: {parser.has_charset}")
        print(f"  - H1 count: {parser.h1_count}")
        print(f"  - Duplicate IDs: {parser.duplicate_ids or 'None'}")
        
        # Check local links
        broken = []
        for link in set(parser.local_links):
            if link and not os.path.exists(os.path.join(WORKSPACE, link)):
                broken.append(link)
        if broken:
            print(f"  - Broken Local Links: {broken}")
        else:
            print(f"  - Local Links Validated: OK ({len(set(parser.local_links))} links)")
            
    except Exception as e:
        print(f"  [ERROR parsing {hfile}]: {e}")

print("\n" + "=" * 70)
