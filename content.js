
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_getScreenshot" ) { 
        highlightPosts();
        window.addEventListener('scroll',highlightPosts)
        
      }
    }
);


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "removeHighlights" ) { 
        
        window.removeEventListener('scroll',highlightPosts);
        removeHighlights();
    
        
      }
    }
);


function highlightPosts(){
    let posts = Array.from(document.body.getElementsByClassName('_5pcr userContentWrapper'));
    
    posts.forEach(post =>{
        post.classList.add('highlight');  
        addScreenshotButton(post);
    })
    
}

function removeHighlights(){
    let posts = Array.from(document.body.getElementsByClassName('_5pcr userContentWrapper'));
    
    posts.forEach(post =>{
        post.classList.remove('highlight');
        post.removeAttribute('haveButton');
    })
    let buttons = Array.from(document.body.getElementsByClassName("getScreenshot"));
    buttons.forEach(btn=>{
        btn.remove();
    })
}

function addScreenshotButton(post){
    if(!post.hasAttribute('haveButton')){
        let button = document.createElement('button');
        button.innerHTML = 'Сделать скриншот';
        button.classList.add('getScreenshot');
        post.after(button);
        
        button.addEventListener('click',()=>{
            getScreenshot(post);
        })
        post.setAttribute('haveButton',true);
    }
    
}

function getScreenshot(post){
    let url;
    
    if(post.getElementsByClassName('h_cq-ddq58z o_cq-ddq59g')[0]){
        const mouseoverEvent = new Event('mouseover');
        post.getElementsByClassName('h_cq-ddq58z o_cq-ddq59g')[0].dispatchEvent(mouseoverEvent);
        url = post.getElementsByClassName('h_cq-ddq58z o_cq-ddq59g')[0].href;
    }
    else if(post.querySelector('a[rel="theater"]')){
        url = post.querySelector('a[rel="theater"]').href;
    }else if(post.getElementsByClassName('_5pcq')[0]){
        url = post.getElementsByClassName('_5pcq')[0].href;
    }
    if(url){
        chrome.runtime.sendMessage({getScreenshot:url},(response)=>{
            console.log(response);
            
        })
    }else{
        console.log("Wrong url");
        
    }
    
}