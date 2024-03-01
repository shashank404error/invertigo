// In-page cache of the user's options
const options = {};
const toggleSwitch = document.getElementById("toggleSwitch");

// Immediately persist options changes
toggleSwitch.addEventListener("change", (event) => {
  options.debug = event.target.checked;
  chrome.storage.sync.set({ options });
});

// // Initialize the form with the user's option settings
const data = chrome.storage.sync.get("options");
Object.assign(options, data.options);
toggleSwitch.checked = Boolean(options.debug);