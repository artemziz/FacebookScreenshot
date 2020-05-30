let scroll;
function getScreenshot(post){
    scroll = {
        x:window.pageXOffset,
        y:window.pageYOffset
    }
  
    if(post.getElementsByClassName('_3vuz')[0].childNodes.length===3){
        return getPageScreenshot(post);
    }else{
        return getUserScreenshot(post);
        
    }
}

function formatDate(unix_timestamp){
    let date = new Date(unix_timestamp * 1000);
    let year = date.getFullYear();
    var month = '0' + (+date.getMonth()+1);
    var day = '0' + date.getDate();
  
    return day.substr(-2) + month.substr(-2) + year;
}
function getName(picture){
    let username = document.body.getElementsByClassName('_2s25 _606w')[0].href.replace('https://www.facebook.com/','');
    let date = picture.getElementsByTagName('abbr')[0].dataset.utime;
    let postId = picture.getElementsByClassName('_5pcq')[0].href;
    postId = postId.substr(postId.lastIndexOf('/')+1);
    return `${formatDate(date)}_${username}_${postId}`
}
function getUserScreenshot(picture){
    
    
    let a = document.createElement('a');
    a.setAttribute("download",getName(picture));
    
    window.scrollTo(0,0);
    
    
    html2canvas(picture,{
        allowTaint:true,
        useCORS:true,
        
        width:picture.offsetWidth,
        height: picture.offsetHeight,
        
        ignoreElements: (element)=>{
            if(
                element === picture.getElementsByClassName('_1dnh')[0] ||
                element === picture.getElementsByClassName('_3w53')[0]
            ){
                return true
            }else{
                return false
            }
        }
    })
    .then(canvas => {
        
        a.href = canvas.toDataURL("image/png");
        document.body.appendChild(a);
        a.click();
        
    }).then(()=>{
        window.scrollTo(scroll.x,scroll.y);
        document.body.removeChild(a);
        
    })
}

function getPageScreenshot(picture){
    let a = document.createElement('a');
    a.setAttribute("download",getName(picture));
    
    
    
    window.scrollTo(0,0);
    html2canvas(picture,{
        allowTaint:true,
        useCORS:true,
        
        width:picture.offsetWidth,
        height: picture.offsetHeight, 
        ignoreElements: (element)=>{
            if(element === picture.children[1] ){
                return true
            }else{
                return false
            }
        }
    })
    .then(canvas => {
        
        a.href = canvas.toDataURL("image/png");
        document.body.appendChild(a);
        a.click();
        
        
         
        
        
    }).then(()=>{
        window.scrollTo(scroll.x,scroll.y);
        document.body.removeChild(a);
        
    })
}
