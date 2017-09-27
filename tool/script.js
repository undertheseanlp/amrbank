function encode(text){
    return window.btoa(encodeURIComponent(text));
}

function decode(s){
    return decodeURIComponent(atob(s))
}

$("#updateText").click(function () {
    var text = $("textarea").val();
    url = new URL(window.location.href);
    window.location.href = url.origin + url.pathname + "?id=" + encode(text);
});

$(document).ready(function(){
    try {
        var url_string = window.location.href;
        var url = new URL(url_string);
        id = url.searchParams.get("id");
        if(id){
            text = decode(id);
            $("textarea").text(text);
            var amr = parseNode(text);
            draw(amr);
        }
    } catch(e){
        console.log(e);
    }

});
