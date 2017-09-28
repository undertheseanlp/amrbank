function encode(text) {
    return window.btoa(encodeURIComponent(text));
}

function decode(s) {
    return decodeURIComponent(atob(s))
}

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
            var amr = data[1];
            $("#text").text(text);
            $("#amr").text(amr);
            var amr = $("#amr").val();
            amr = parseNode(amr);
            makeAMRListView(amr);
            draw(amr);
        }
    } catch (e) {
        console.log(e);
    }
});
