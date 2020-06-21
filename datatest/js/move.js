var test_1 = 'im in?';
var article = document.querySelector('.article');
var xhr = new XMLHttpRequest();
var target= "./data/data.json";

xhr.open("GET", target);
xhr.send();

xhr.onreadystatechange= function(){
    if(xhr.readyState=== XMLHttpRequest.DONE){
        // if(xhr.status== 200){
        //     var loadedJSON= JSON.parse(xhr.responseText);
        //     article.innerHTML = loadedJSON.resultCode+"<br>";
        // }else{
        //     alert("fail to load");
        // }
        // var data_strF=JSON.stringify(target);
        for(img_url in send){
            console.log(img_url +' / '+send[img_url]);
        }
    }
}

function test(){
    article.innerHTML=test_1;
};
test();
console.log(article);