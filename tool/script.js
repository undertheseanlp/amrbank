function encode(text) {
    return window.btoa(encodeURIComponent(text));
}

function decode(s) {
    return decodeURIComponent(atob(s))
}

function syncAMR(raw){
    window.amr = textToTree(raw);
    $("#amr").text(treeToText(window.amr, true));
    makeAMRListView(window.amr);
    draw(window.amr);
};

$("#updateText").click(function () {
    var text = $("#text").val() + "||||" + $("#amr").val();
    url = new URL(window.location.href);
    window.location.href = url.origin + url.pathname + "?id=" + encode(text);
});

$(document).ready(function () {
    try {
        var url_string = window.location.href;
        var url = new URL(url_string);
        id = url.searchParams.get("id");
        if (id) {
            var data = decode(id);
            data = data.split("||||");
            var text = data[0];
            var raw = data[1];
            $("#text").text(text);
            $("#amr").text(raw);
            try {
                syncAMR(raw);
            } catch(e){
                $("#SYNTAX_ERROR").show();
            }

        }
    } catch (e) {
        console.log(e);
    }
});
