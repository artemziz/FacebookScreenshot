
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.facebook.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(request);
    if(request.getScreenshot){
      
      chrome.tabs.create({"url":request.getScreenshot,"selected":false},tab=>{
        chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
          if (info.status === 'complete' && tabId === tab.id) {
              chrome.tabs.onUpdated.removeListener(listener);
              chrome.tabs.sendMessage(tab.id,{message: "getScreenshot"});
          }
      });
        
      })
      
    }
    
  }
)