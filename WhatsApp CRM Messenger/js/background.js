
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log("Close tab background");

	if (request.type === "closeTab") {
		// Use chrome.tabs.query to find the active tab before attempting to close it
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs[0]) {
				// Close the active tab
				chrome.tabs.remove(tabs[0].id, () => {
					if (chrome.runtime.lastError) {
						console.error("Failed to close tab:", chrome.runtime.lastError);
					} else {
						console.log("Tab closed successfully.");
					}
				});
			} else {
				console.error("No active tab found.");
			}
		});
	}

	// Always send a response back to acknowledge the message
	sendResponse({ status: "ok" });
	return true; // Required to keep the message channel open for sendResponse
});

/*chrome.runtime.onInstalled.addListener(() => {
	console.log("WhatsApp Extension Installed.");
});*/

// Example of using chrome.storage instead of localStorage
chrome.storage.local.set({ key: "value" }, () => {
	console.log("Value stored in chrome.storage.");
});


