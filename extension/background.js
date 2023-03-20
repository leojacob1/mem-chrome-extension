const onClick = (info, tab) => {
  chrome.tabs.query({
      "active": true,
      "currentWindow": true
  }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
          "functiontoInvoke": "createMem",
          "title": tabs[0].title,
          "url": tabs[0].url,
      });
  });
}

chrome.contextMenus.create({
  "id": "createMem",
  "title": "Create Mem",
  "contexts": ["all"],
});

chrome.contextMenus.onClicked.addListener(onClick)
