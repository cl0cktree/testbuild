var test_1 = 'im in?';
var article = document.querySelector('.article');
var xhr = new XMLHttpRequest();
var target= './data/data.json';

xhr.open("GET", target);

xhr.onreadystatechange= function(){
    if(xhr.readyState=== XMLHttpRequest.DONE){
        // if(xhr.status== 200){
        //     var loadedJSON= JSON.parse(xhr.responseText);
        //     var xhr_spl = xhr.responseText;
        //     var loadedJSON_split = xhr_spl.split(',');
        //     var spl_int = '';
        //     for(var i=0;i<xhr_spl.length;i++){
        //         spl_int+=xhr_spl+"!!<br>";
        //     }
        //     spl_int=xhr_spl+"!!<br>";
        //     article.innerHTML = spl_int;
        // }else{
        //     // alert("fail to load");
        //     var loadedJSON= JSON.parse(xhr.responseText);
        //     var xhr_spl = xhr.responseText;
        //     var loadedJSON_split = xhr_spl.split(',');
        //     var spl_int = '';
        //     for(var i=0;i<xhr_spl.length;i++){
        //         spl_int+=xhr_spl+"<br>";
        //     }
        //     spl_int=xhr_spl+"<br>";
        //     article.innerHTML = spl_int;
        // }
        // var data_strF=JSON.stringify(target);
        // for(img_url in data){
        //     console.log(img_url +' / '+send[img_url]);
        // }
        var loadedJSON= JSON.parse(xhr.responseText);
        var xhr_spl = xhr.responseText;
        var loadedJSON_split = xhr_spl.split(',');
        var spl_int = '';
        for(var i=0;i<xhr_spl.length;i++){
            spl_int+=xhr_spl+"<br>";
        }
        spl_int=xhr_spl+"<br>";
        article.innerHTML = spl_int;
    }
}
xhr.send();

function test(){
    article.innerHTML=test_1;
};
test();
console.log(article);