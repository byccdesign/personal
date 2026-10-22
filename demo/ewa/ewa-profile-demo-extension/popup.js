document.getElementById('populate').addEventListener('click', async () => {
  const status = document.getElementById('status');
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const result = await chrome.tabs.sendMessage(tab.id, { type: 'EWA_POPULATE_DEMO' });
    status.textContent = result?.ok ? 'Synthetic profile data filled.' : (result?.error || 'Open the EWA client-profile page first.');
  } catch {
    status.textContent = 'Open the EWA client-profile page first.';
  }
});
