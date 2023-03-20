const onClick = (info, tab) => {
  console.log("item " + info.menuItemId + " was clicked");

  //Add all you functional Logic here
  chrome.tabs.query({
      "active": true,
      "currentWindow": true
  }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
          "functiontoInvoke": "createMem"
      });
  });
}

chrome.contextMenus.create({
  "id": "createMem",
  "title": "Create Mem",
  "contexts": ["all"],
});

chrome.contextMenus.onClicked.addListener(onClick)
