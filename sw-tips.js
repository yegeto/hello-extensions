console.log("sw-tips.js");

// Fetch tip & save in storage
const updateTip = async () => {
  const response = await fetch("https://chrome.dev/f/extension_tips");
  const tips = await response.json();
  const randomIndex = Math.floor(Math.random() * tips.length);
  return chrome.storage.local.set({ tip: tips[randomIndex] });
};

// Send tip to content script via messaging
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.greeting === "tip") {
    chrome.storage.local.get("tip").then(sendResponse);
    return true;
  }
});
