exports.config = {
    runner: 'local',

    specs: ['./test/specs/**/*.js'],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Redmi_Note_8',
        'appium:automationName': 'UIAutomator2',
        "appium:app": "C:\\\\Users\\\\Shaik\\\\Downloads\\\\ApiDemos-debug.apk",
        'appium:autoGrantPermissions': true,
        'appium:ensureWebviewsHavePages': true,
        'appium:nativeWebScreenshot': true,
        'appium:newCommandTimeout': 3600,
        'appium:connectHardwareKeyboard': true
    }],

    services: ['appium'],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};