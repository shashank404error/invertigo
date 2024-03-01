// Watch for changes to the user's options & apply them

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.options?.newValue) {
      const debugMode = Boolean(changes.options.newValue.debug);
      console.log('enable debug mode?', debugMode);
      if (debugMode){
          chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            var tabId = tabs[0].id;
            chrome.scripting.executeScript({
                target: {tabId: tabId},
                files: ['content.js']
            });
          });
      }else{
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          if (tabs && tabs.length > 0) {
              chrome.tabs.reload(tabs[0].id);
          }
      });
      }
    }
  });
  
  // Where we will expose all the data we retrieve from storage.sync.
  const storageCache = { count: 0 };
  // Asynchronously retrieve data from storage.sync, then cache it.
  const initStorageCache = chrome.storage.sync.get().then((items) => {
    // Copy the data retrieved from storage into storageCache.
    Object.assign(storageCache, items);
  });
  
  chrome.action.onClicked.addListener(async (tab) => {
    try {
      await initStorageCache;
    } catch (e) {
      // Handle error that occurred during storage initialization.
    }
  
    // Normal action handler logic.
    storageCache.count++;
    storageCache.lastTabId = tab.id;
    chrome.storage.sync.set(storageCache);
  });