
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if(request.message == "getScreenshot"){
            
            let post = document.body.getElementsByClassName('_5pcr userContentWrapper')[0];

            post = clearPost(post);
            getScreenshot(post);
            setTimeout(()=>window.close(),20000);
        }
        
    }
)

function clearPost(post){
    let link;
    if(post.getElementsByClassName('clearfix r_cq-ddoytd')[0].getElementsByClassName('fwb fcg')[0]){
        if(post.getElementsByClassName('clearfix r_cq-ddoytd')[0].getElementsByClassName('fwb fcg')[0].children[0]){
            link = post.getElementsByClassName('clearfix r_cq-ddoytd')[0].getElementsByClassName('fwb fcg')[0].children[0].href;
        }
       
    }else if(post.getElementsByClassName('profileLink')[0]){
        link = post.getElementsByClassName('profileLink')[0].href;
    }
     
    //if(post.getElementsByClassName('_3vuz')[0].childNodes.length===3)
    if(link[link.indexOf('?')-1] =="/"){
        return clearPagePost(post);
    }else{
        return clearUserPost(post);
    }
}

function clearPagePost(post){
    post.children[1].remove();
    return post;
}

function clearUserPost(post){
    post.getElementsByClassName('_1dnh')[0].remove();
    post.getElementsByClassName('_3w53')[0].remove();
    return post;
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
    
    if(postId.slice(-1)=='/'){
        postId = postId.slice(0,-1);
    }

    postId = postId.substr(postId.lastIndexOf('/')+1);
    if(postId.indexOf('?')!==-1){
        postId = postId.substr(0,postId.indexOf('?'));
    }
    
    return `${formatDate(date)}_${username}_${postId}.png`
}
function getScreenshot(picture){
    
    let a = document.createElement('a');
    a.setAttribute("download",getName(picture));
    console.log(picture.getElementsByClassName('mbs _6m6 _2cnj _5s6c')[0].children[0].innerHTML);
    
    window.scrollTo(0,0);
    html2canvas(picture,{
        allowTaint:true,
        useCORS:true,        
        width:picture.offsetWidth,
        height: picture.offsetHeight,
        
    })
    .then(canvas => {       
        a.href = canvas.toDataURL("image/png");
        document.body.appendChild(a);
        a.click();      
    })
}

