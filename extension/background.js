chrome.runtime.onMessage.addListener(() => {
  console.log("message received!")
  chrome.contextMenus.create({
    "id": "createMem",
    "title": "Create Mem",
    "contexts": ["all"]
  });
})