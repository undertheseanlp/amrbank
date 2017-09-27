//TODO: add parameter to url

function normalize(text) {
    var text = $.trim(text);
    text = text.replace(/(?:\r\n|\r|\n)/g, " ");
    text = text.replace(/  +/g, ' ');
    return text;
}

function addParameterToURL(param){
    _url = location.href;
    _url += (_url.split('?')[1] ? '&':'?') + param;
    return _url;
}

addParameterToURL("hihi");

$("#updateText").click(function () {
    var text = normalize($("textarea").val());
    console.log(text);
    var result = parseNode(text);
    draw(result);
});

// $(document).ready(function(){
//     try {
//         var url_string = window.location.href;
//         var url = new URL(url_string);
//         encodedText = url.searchParams.get("text");
//         text = atob(encodedText);
//         $("textarea").text(text);
//         console.log(text);
//     } catch(e){
//         console.log(e);
//     }
//
// });
