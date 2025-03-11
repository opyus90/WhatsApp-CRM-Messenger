// Check if we are on WhatsApp Web send page
var regexSearchURL2 = new RegExp("web.whatsapp.com/send", "i");

// If on the send page, set flag to auto-send the message
if (regexSearchURL2.test(window.location.href)) {
    sessionStorage.setItem("auto_send_message", "1");
}

var regexSearchURL = new RegExp("web.whatsapp.com", "i");

if (regexSearchURL.test(window.location.href)) {
    checkWhatsappContacts();
}

function checkWhatsappContacts() {
    setTimeout(function () {
        var contactlist = document.getElementById("side");

        if (contactlist != null) {
            console.log("Found contact list, proceeding with actions like sending message.");
            checkWhatsappActions();
        } else {
            console.log("Contact list not found, retrying...");
            checkWhatsappContacts();  // Retry if contact list isn't found
        }
    }, 4 * 1000);  // Retry every 4 seconds
}

function checkWhatsappActions() {
    console.log("Auto Send: " + sessionStorage.getItem("auto_send_message"));
    if (sessionStorage.getItem("auto_send_message") == 1) {
        submitMessage("Your dynamic message here");
    }
}

function submitMessage(message) {
    const mainEl = document.querySelector('#main');
    const textareaEl = mainEl.querySelector('div[contenteditable="true"]');

    if (!textareaEl) {
        throw new Error('There is no opened conversation');
    }

    // Set the message content dynamically
    textareaEl.innerText = message;

    // Dispatch a change event to simulate user typing
    textareaEl.dispatchEvent(new Event('change', { bubbles: true }));

    setTimeout(() => {
        // Click the send button
        (mainEl.querySelector('[data-testid="send"]') || mainEl.querySelector('[data-icon="send"]')).click();
    }, 100); // Short delay before clicking send

    // Reset the flag and close the tab after 3 seconds
    sessionStorage.setItem("auto_send_message", "0");
    setTimeout(() => {
        chrome.runtime.sendMessage({ type: "closeTab" });
    }, 2000);
}

