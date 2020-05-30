
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

