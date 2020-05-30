const button = document.getElementById('getScreenshot');
const removeHighlights = document.getElementById('removeHighlights');
button.addEventListener('click',function(tabs){
    // Отправить сообщение на активную вкладку
  button.style.display = 'none';
  removeHighlights.style.display = 'block';
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_getScreenshot"});
  });
})
removeHighlights.addEventListener('click',function(tabs){
  removeHighlights.style.display = 'none';
  button.style.display = 'block';
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "removeHighlights"});
  });
})