const button = document.getElementById('getScreenshot');
const removeHighlights = document.getElementById('removeHighlights');
const link = document.getElementById('link');
button.addEventListener('click',function(tabs){
  
  if(link.value && link.value.indexOf('https://www.facebook.com')===0){
    chrome.tabs.create({"url":link.value,"selected":false},tab=>{
      chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
        if (info.status === 'complete' && tabId === tab.id) {
            chrome.tabs.onUpdated.removeListener(listener);
            chrome.tabs.sendMessage(tab.id,{message: "getScreenshot"});
        }
    });
      
    })
  }else{
    button.style.display = 'none';
    link.style.display = 'none';
    removeHighlights.style.display = 'block';
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_getScreenshot"});
    });
  }
 
})
removeHighlights.addEventListener('click',function(tabs){
  removeHighlights.style.display = 'none';
  link.style.display = 'block';
  button.style.display = 'block';
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "removeHighlights"});
  });
})
