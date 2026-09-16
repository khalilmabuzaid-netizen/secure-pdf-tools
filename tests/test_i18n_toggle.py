import asyncio
import os
import sys
import subprocess
import time
from playwright.async_api import async_playwright

async def run_i18n_tests():
    # 1. Start a local HTTP server
    port = 8089
    server_process = subprocess.Popen(
        [sys.executable, "-m", "http.server", str(port)],
        cwd=os.path.abspath(os.path.join(os.path.dirname(__file__), "..")),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    time.sleep(1)

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()

            errors = []
            page.on("pageerror", lambda err: errors.append(str(err)))
            page.on("console", lambda msg: print(f"[CONSOLE {msg.type}]: {msg.text}") if msg.type in ["error"] else None)

            url = f"http://localhost:{port}/annotator.html"
            print(f"Navigating to {url}...")
            await page.goto(url)
            await page.wait_for_timeout(1000)

            print("--- STEP 1: Verify Default English State ---")
            initial_dir = await page.evaluate("() => document.documentElement.dir")
            initial_lang = await page.evaluate("() => document.documentElement.lang")
            toggle_text = await page.evaluate("() => document.getElementById('lang-toggle-text')?.textContent.trim()")
            upload_text = await page.evaluate("() => document.querySelector('#btn-upload-trigger span')?.textContent.trim()")
            sample_text = await page.evaluate("() => document.querySelector('#btn-sample-pdf span')?.textContent.trim()")
            merge_text = await page.evaluate("() => document.querySelector('a[href=\"merge.html\"] span')?.textContent.trim()")
            export_text = await page.evaluate("() => document.querySelector('#btn-export-pdf span')?.textContent.trim()")
            dropzone_title = await page.evaluate("() => document.querySelector('.dropzone-title')?.textContent.trim()")

            print(f"Initial dir: {initial_dir}")
            print(f"Initial lang: {initial_lang}")
            print(f"Toggle button text: {toggle_text}")
            print(f"Upload text: {upload_text}")
            print(f"Sample text: {sample_text}")
            print(f"Merge text: {merge_text}")
            print(f"Export text: {export_text}")
            print(f"Dropzone title: {dropzone_title}")

            assert initial_dir == "ltr" or initial_dir == "", f"Expected LTR, got {initial_dir}"
            assert toggle_text == "العربية", f"Expected 'العربية', got {toggle_text}"
            assert upload_text == "Upload PDF", f"Expected 'Upload PDF', got {upload_text}"
            assert merge_text == "Merge PDF", f"Expected 'Merge PDF', got {merge_text}"

            print("\n--- STEP 2: Toggle to Arabic (RTL) ---")
            await page.click("#btn-language-toggle")
            await page.wait_for_timeout(500)

            ar_dir = await page.evaluate("() => document.documentElement.dir")
            ar_lang = await page.evaluate("() => document.documentElement.lang")
            ar_toggle_text = await page.evaluate("() => document.getElementById('lang-toggle-text')?.textContent.trim()")
            ar_upload_text = await page.evaluate("() => document.querySelector('#btn-upload-trigger span')?.textContent.trim()")
            ar_sample_text = await page.evaluate("() => document.querySelector('#btn-sample-pdf span')?.textContent.trim()")
            ar_merge_text = await page.evaluate("() => document.querySelector('a[href=\"merge.html\"] span')?.textContent.trim()")
            ar_export_text = await page.evaluate("() => document.querySelector('#btn-export-pdf span')?.textContent.trim()")
            ar_dropzone_title = await page.evaluate("() => document.querySelector('.dropzone-title')?.textContent.trim()")
            ar_font = await page.evaluate("() => window.getComputedStyle(document.body).fontFamily")

            print(f"Arabic dir: {ar_dir}")
            print(f"Arabic lang: {ar_lang}")
            print(f"Arabic toggle button text: {ar_toggle_text}")
            print(f"Arabic upload text: {ar_upload_text}")
            print(f"Arabic sample text: {ar_sample_text}")
            print(f"Arabic merge text: {ar_merge_text}")
            print(f"Arabic export text: {ar_export_text}")
            print(f"Arabic dropzone title: {ar_dropzone_title}")
            print(f"Arabic font family: {ar_font}")

            assert ar_dir == "rtl", f"Expected dir=rtl, got {ar_dir}"
            assert ar_toggle_text == "English", f"Expected 'English', got {ar_toggle_text}"
            assert "رفع" in ar_upload_text, f"Expected Arabic upload text, got {ar_upload_text}"
            assert "دمج" in ar_merge_text, f"Expected Arabic merge text, got {ar_merge_text}"
            assert "تحميل" in ar_export_text, f"Expected Arabic export text, got {ar_export_text}"

            print("\n--- STEP 3: Verify Canvas Protection (Strict LTR) ---")
            # Load sample PDF in Arabic mode
            await page.click("#btn-sample-pdf")
            await page.wait_for_timeout(2000)

            canvas_stage_dir = await page.evaluate("() => window.getComputedStyle(document.getElementById('canvas-stage-wrapper')).direction")
            canvas_shadow_dir = await page.evaluate("() => window.getComputedStyle(document.getElementById('canvas-shadow-container')).direction")
            pdf_canvas_dir = await page.evaluate("() => window.getComputedStyle(document.getElementById('pdf-canvas')).direction")
            fabric_container_dir = await page.evaluate("() => window.getComputedStyle(document.querySelector('.canvas-container')).direction")

            print(f"Canvas stage direction: {canvas_stage_dir}")
            print(f"Canvas shadow container direction: {canvas_shadow_dir}")
            print(f"PDF canvas layer direction: {pdf_canvas_dir}")
            print(f"Fabric.js container direction: {fabric_container_dir}")

            assert canvas_stage_dir == "ltr", f"Expected stage dir=ltr, got {canvas_stage_dir}"
            assert canvas_shadow_dir == "ltr", f"Expected shadow container dir=ltr, got {canvas_shadow_dir}"
            assert pdf_canvas_dir == "ltr", f"Expected PDF canvas dir=ltr, got {pdf_canvas_dir}"
            assert fabric_container_dir == "ltr", f"Expected Fabric container dir=ltr, got {fabric_container_dir}"

            print("\n--- STEP 4: Toggle Back to English (LTR) ---")
            await page.click("#btn-language-toggle")
            await page.wait_for_timeout(500)

            en_dir = await page.evaluate("() => document.documentElement.dir")
            en_toggle_text = await page.evaluate("() => document.getElementById('lang-toggle-text')?.textContent.trim()")
            en_upload_text = await page.evaluate("() => document.querySelector('#btn-upload-trigger span')?.textContent.trim()")
            en_export_text = await page.evaluate("() => document.querySelector('#btn-export-pdf span')?.textContent.trim()")

            print(f"Restored dir: {en_dir}")
            print(f"Restored toggle text: {en_toggle_text}")
            print(f"Restored upload text: {en_upload_text}")
            print(f"Restored export text: {en_export_text}")

            assert en_dir == "ltr", f"Expected dir=ltr, got {en_dir}"
            assert en_toggle_text == "العربية", f"Expected 'العربية', got {en_toggle_text}"
            assert en_upload_text == "Upload PDF", f"Expected 'Upload PDF', got {en_upload_text}"
            assert en_export_text == "Download PDF", f"Expected 'Download PDF', got {en_export_text}"

            print(f"\nTotal page errors encountered: {len(errors)}")
            assert len(errors) == 0, f"Encountered errors: {errors}"

            await browser.close()
            print("\nALL ENGLISH/ARABIC I18N AND CANVAS PROTECTION TESTS PASSED SUCCESSFULLY!")
            return True
    finally:
        server_process.terminate()

if __name__ == "__main__":
    success = asyncio.run(run_i18n_tests())
    sys.exit(0 if success else 1)
