import asyncio
import sys
from playwright.async_api import async_playwright

async def run_test():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        errors = []
        page.on("pageerror", lambda err: errors.append(str(err)))
        page.on("console", lambda msg: print(f"[CONSOLE {msg.type}]: {msg.text}") if msg.type in ["error", "warn"] else None)

        print("Navigating to http://localhost:8080/index.html...")
        await page.goto("http://localhost:8080/index.html")
        await page.wait_for_timeout(2000)

        # 1. Verify PDFLib and PDFLib.PDFDocument are defined
        pdflib_check = await page.evaluate("() => typeof window.PDFLib !== 'undefined' && typeof window.PDFLib.PDFDocument !== 'undefined'")
        print(f"1. PDFLib and PDFDocument defined: {pdflib_check}")

        # 2. Click 'Try Sample' button
        print("Clicking #btn-sample-pdf...")
        await page.click("#btn-sample-pdf")
        await page.wait_for_timeout(3000)

        # 3. Verify currentPdfBytes is populated
        bytes_len = await page.evaluate("() => window.currentPdfBytes ? window.currentPdfBytes.length : 0")
        print(f"2. currentPdfBytes length: {bytes_len} bytes")

        # 4. Check stage visibility
        stage_visible = await page.evaluate("() => !document.getElementById('canvas-stage-wrapper').classList.contains('hidden')")
        print(f"3. Canvas stage wrapper visible: {stage_visible}")

        # 5. Check total pages
        total_pages = await page.evaluate("() => document.getElementById('total-pages-count').textContent")
        print(f"4. Total pages rendered: {total_pages}")

        # 6. Test exportPDF execution
        export_result = await page.evaluate("""async () => {
            try {
                if (typeof window.exportPDF === 'function') {
                    return { success: true };
                }
                return { success: false, reason: 'exportPDF is not a function' };
            } catch (e) {
                return { success: false, reason: e.message };
            }
        }""")
        print(f"5. exportPDF function availability: {export_result}")

        print(f"Console/Page errors encountered: {errors}")
        await browser.close()

        success = pdflib_check and bytes_len > 0 and stage_visible and len(errors) == 0
        if success:
            print("\nAll browser verification tests passed with 0 errors!")
        else:
            print("\nVerification tests failed!")
        return success

if __name__ == "__main__":
    ok = asyncio.run(run_test())
    sys.exit(0 if ok else 1)
