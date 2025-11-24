# 🧪 WebdriverIO + Appium Mobile Test Setup (Android + Real Device)

This guide will help you set up WebdriverIO and Appium to run JavaScript-based mobile automation tests on a real Android device.

---

## 1. Install Required Tools

### **Node.js**
Download & install:
https://nodejs.org/en/

---

### **Android Studio (Required for SDK + Platform Tools)**  
Download:
https://developer.android.com/studio

After installation, open **SDK Manager** → install:
- Android SDK Platform
- SDK Platform Tools  
- USB Drivers (if available)

---

### **Appium (Install Globally)**
```bash
npm install --location=global appium
```
### **UIAutomator2 Driver (Required for Android automation)**
```bash
appium driver install uiautomator2
```
---

## 2. Prepare Your Android Device
### Enable Developer Options
1. Open *Settings*
2. Go to *About Phone*
3. Tap *Build Number* 7 times to unlock developer mode

---

### Enable USB Debugging
1. Open Developer Options
2. Enable USB Debugging
---

### Allow USB Connection

Connect your phone → select *File Transfer (MTP)* or *USB Debugging (ADB)* mode.

---

## 3. Install ADB & Verify Device Connection
Verify *ADB* is Working

```bash
adb devices
```
Expected output:

```arduino
List of devices attached
<device-id>    device
``` 
If the device shows *unauthorized*, check your phone for a popup asking to allow USB debugging.

---

## 4. Install WebdriverIO in Your Project
### Inside your project folder run:
```bash
npm init -y
npm install --save-dev @wdio/cli
npx wdio config
```

Choose:

- Runner: local
- Framework: mocha
- Service: appium
- Reporter: spec
- Specs: (default)

This generates `wdio.conf.js`.

---

## 5. Configure `wdio.conf.js` for Android Real Device
Inside `capabilities`, add:

```js
capabilities: [
  {
    platformName: 'Android',
    'appium:deviceName': 'Android',
    'appium:udid': '<your-device-id>',
    'appium:platformVersion': '<your-android-version>',
    'appium:automationName': 'UIAutomator2',
    'appium:app': '<absolute-path-to-apk>',
    'appium:autoGrantPermissions': true
  }
]
```
### Find device ID
```bash
adb devices
```

Example:

```bash
a1b2c3d4    device
```
#### Find Android version

Phone → Settings → About → Android Version.

---

## 6. Start Appium Server
Run:

```bash
appium
```
Keep this terminal open.

---

## 7. Run Tests
In a second terminal:

```bash
npx wdio
```

Your tests will now execute on your real mobile device using Appium + WebdriverIO.

---

## 8. Notes
- Keep your phone awake during execution.

- Ensure USB debugging stays enabled.

- Use **_absolute file paths_** for APKs.

🎉 You're ready to run automated mobile tests on your real Android device!

---