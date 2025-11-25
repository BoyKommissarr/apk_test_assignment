const logger = require('../../utils/logger');

describe('API Demos – Assignment Test Cases', () => {

    //
    // Ensures every test starts from ApiDemos HOME screen
    //
    beforeEach(async () => {
        logger.info('--- Starting new test, restarting app ---');
        await driver.terminateApp('io.appium.android.apis');
        await driver.activateApp('io.appium.android.apis');
        logger.info('App restarted successfully');
    });
    
    afterEach(async function () {
        const fs = require('fs');
        const path = require('path');

        const passed = this.currentTest.state === 'passed';
        const title = this.currentTest?.title ?? 'unknown_test';

        logger.info(`Test completed: ${title} | Status: ${passed ? 'PASS' : 'FAIL'}`);

        // Extract test ID like FUNC_01
        const idMatch = title.match(/^([A-Z]+_\d+)/);
        const idPart = idMatch ? idMatch[1] : title.split(':')[0].replace(/\s+/g, '_').slice(0, 50);

        const statusFolder = `${passed ? 'PASS_' : 'FAIL_'}${idPart}`;

        const filenameRaw = `${statusFolder}_${title}`;
        const sanitized = filenameRaw
            .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
            .replace(/\s+/g, '_')
            .slice(0, 200);

        const screenshotsDir = path.join(process.cwd(), 'screenshots', statusFolder);
        fs.mkdirSync(screenshotsDir, { recursive: true });

        const fullPath = path.join(screenshotsDir, `${sanitized}.png`);
        logger.info(`Saving screenshot: ${fullPath}`);

        await driver.saveScreenshot(fullPath);

        logger.info('Screenshot saved');
    });


    // -----------------------------------------
    // FUNC_01 — Verify user can open “Views”
    // -----------------------------------------
    it('FUNC_01: Verify user can open Views menu', async () => {
        logger.info('FUNC_01: Locating Views menu');

        const views = await $('~Views');
        await views.waitForDisplayed({ timeout: 5000 });
        logger.info('Views menu is displayed');

        await views.click();
        logger.info('Clicked Views');

        const title = await $('android.widget.TextView');
        const visible = await title.isDisplayed();

        logger.info(`Views screen visibility: ${visible}`);

        expect(visible).toBe(true);
    });


    // -----------------------------------------
    // FUNC_02 — Verify clicking “Buttons”
    // -----------------------------------------
    it('FUNC_02: Verify clicking Buttons displays button screen', async () => {
        logger.info('FUNC_02: Navigating to Buttons screen');

        await $('~Views').click();
        logger.info('Clicked Views');

        await $('~Buttons').click();
        logger.info('Clicked Buttons');

        const anyButton = await $('android.widget.Button');
        const visible = await anyButton.isDisplayed();

        logger.info(`Any button displayed: ${visible}`);

        expect(visible).toBe(true);
    });


    // -----------------------------------------
    // UI_01 — Verify button text readability
    // -----------------------------------------
    it('UI_01: Verify button text is readable on Buttons screen', async () => {
        logger.info('UI_01: Opening Buttons screen');

        await $('~Views').click();
        await $('~Buttons').click();

        const buttons = await $$('android.widget.Button');
        logger.info(`Found ${buttons.length} buttons to validate text`);

        for (const btn of buttons) {
            const txt = await btn.getText();
            logger.info(`Button text: "${txt}"`);
            expect(txt.trim().length).toBeGreaterThan(0);
        }
    });


    // -----------------------------------------
    // UI_02 — Verify alignment of list items in Views menu
    // -----------------------------------------
    it('UI_02: Verify alignment of list items in Views menu', async () => {
        logger.info('UI_02: Checking alignment of Views list items');

        await $('~Views').click();

        const els = await $$('android.widget.TextView');
        logger.info(`Found ${els.length} list items`);

        const rects = [];

        for (const el of els) {
            const id = el.elementId;

            const txt = await driver.getElementText(id).catch(() => null);
            if (!txt || txt === 'Views') continue;

            const rect = await driver.getElementRect(id).catch(() => null);
            if (!rect) continue;

            rects.push(rect);
            logger.info(`Item "${txt}" x-position: ${rect.x}`);
        }

        expect(rects.length).toBeGreaterThan(0);

        const baseX = rects[0].x;
        logger.info(`Base alignment X: ${baseX}`);

        for (const r of rects) {
            const diff = Math.abs(r.x - baseX);
            logger.info(`Alignment diff: ${diff}`);

            expect(diff).toBeLessThan(50);
        }
    });


    // -----------------------------------------
    // PERF_01 — App launch time performance
    // -----------------------------------------
    it('PERF_01: App launch time performance', async () => {
        logger.info('PERF_01: Measuring app launch time');

        const start = Date.now();

        await driver.terminateApp('io.appium.android.apis');
        await driver.activateApp('io.appium.android.apis');
        logger.info('App restarted, waiting for UI');

        await $('~Views').waitForDisplayed({ timeout: 5000 });

        const end = Date.now();
        const launchTime = (end - start) / 1000;

        logger.info(`Launch time: ${launchTime}s`);

        expect(launchTime).toBeLessThan(4);
    });

});
