# EWA Profile Demo Filler

This Manifest V3 extension fills the standalone `create-lead-profile.html` prototype with synthetic values for UI testing. It does not submit or save profile data.

## Load in Chrome

1. Open `chrome://extensions` and enable Developer mode.
2. Choose **Load unpacked** and select this folder.
3. Open the EWA demo on `http://localhost` or `http://127.0.0.1`, open `create-lead-profile.html`, then choose **Populate test profile** from the extension button.

For a page opened directly from disk, enable **Allow access to file URLs** on the extension's details page. The synthetic email uses the reserved `.test` domain.
