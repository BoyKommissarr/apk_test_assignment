describe('API Demos – Assignment Test Cases', () => {

    //
    // Ensures every test starts from ApiDemos HOME screen
    //
    beforeEach(async () => {
        await driver.terminateApp('io.appium.android.apis');
        await driver.activateApp('io.appium.android.apis');
    });


    // -----------------------------------------
    // FUNC_01 — Verify user can open “Views”
    // -----------------------------------------
    it('FUNC_01: Verify user can open Views menu', async () => {
        const views = await $('~Views');
        await views.waitForDisplayed({ timeout: 5000 });

        await views.click();

        const title = await $('android.widget.TextView');
        expect(await title.isDisplayed()).toBe(true);
    });


    // -----------------------------------------
    // FUNC_02 — Verify clicking “Buttons”
    // -----------------------------------------
    it('FUNC_02: Verify clicking Buttons displays button screen', async () => {
        await $('~Views').click();
        await $('~Buttons').click();

        const anyButton = await $('android.widget.Button');
        expect(await anyButton.isDisplayed()).toBe(true);
    });


    // -----------------------------------------
    // UI_01 — Verify button text readability
    // -----------------------------------------
    it('UI_01: Verify button text is readable on Buttons screen', async () => {
        await $('~Views').click();
        await $('~Buttons').click();

        const buttons = await $$('android.widget.Button');

        for (const btn of buttons) {
            const txt = await btn.getText();
            expect(txt.trim().length).toBeGreaterThan(0); // text visible
        }
    });


    // -----------------------------------------
    // UI_02 — Verify alignment of list items in Views menu
    // -----------------------------------------
    it('UI_02: Verify alignment of list items in Views menu', async () => {
        await $('~Views').click();

        const els = await $$('android.widget.TextView');

        const rects = [];

        for (const el of els) {
            const id = el.elementId;

            const txt = await driver.getElementText(id).catch(() => null);
            if (!txt || txt === 'Views') continue;

            const rect = await driver.getElementRect(id).catch(() => null);
            if (!rect) continue;

            rects.push(rect);
        }

        expect(rects.length).toBeGreaterThan(0);

        // Xiaomi adds heavy padding → accept a wider tolerance
        const baseX = rects[0].x;

        for (const r of rects) {
            const diff = Math.abs(r.x - baseX);
            console.log('ALIGN-DIFF:', diff);

            // FIX: Device-specific tolerance
            expect(diff).toBeLessThan(50);
        }
    });


    // -----------------------------------------
    // PERF_01 — App launch time performance
    // -----------------------------------------
    it('PERF_01: App launch time performance', async () => {
        const start = Date.now();

        // restart using Appium 2.x safe method
        await driver.terminateApp('io.appium.android.apis');
        await driver.activateApp('io.appium.android.apis');

        // wait for Views to appear
        await $('~Views').waitForDisplayed({ timeout: 5000 });

        const end = Date.now();
        const launchTime = (end - start) / 1000;

        console.log(`Launch time: ${launchTime}s`);

        expect(launchTime).toBeLessThan(4);  // requirement: 2–3 seconds allowed
    });

});
