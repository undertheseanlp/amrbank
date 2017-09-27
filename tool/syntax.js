function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function parseConcept(text){
    var i = text.search(" ");
    var concept = text.slice(0, i);
    return concept;
}

function parseContent(text){
    var i = text.search(" ");
    var content = $.trim(text.slice(i));
    return content;
}

function parseConcepts(text, top) {
    /***
     * text
     *  :concept1 (content1) :concept2 content2 :concept3 content4
     */
    if (text.length == 0) {
        return [];
    }
    var concept = parseConcept(text);
    var next = parseContent(text);
    // 4 cases of next: node + concepts, string, digit, node
    // in case next is node
    if (next[0] == "(") {
        var finished = false;
        var stack = ["("];
        var i = 1;
        while (!finished) {
            if(i == next.length){
                throw("Syntax Exception");
            }
            var token = next[i];
            if (token == ")") {
                stack.pop();
                if (stack.length == 0) {
                    finished = true
                }
            } else if (token == "(") {
                stack.push(token);
            }
            i += 1;
        }
        var node = next.slice(0, i);
        var concepts = [{
            "concept": concept,
            "top": top,
            "node": parseNode(node)
        }];
    }
    // in case next is polarity
    else if (next[0] == "-") {
        var concepts = [{
            "concept": concept,
            "top": top,
            "node": {
                "type": "-",
                "variable": makeid(),
                "concepts": []
            }
        }];
        i = 1;
    }
    // in case next is string
    else if (next[0] == "\"") {
        var i = next.search(" ");
        if (i != -1) {
            var content = next.slice(1, i - 1);
            var concepts = [{
                "concept": concept,
                "top": top,
                "node": {
                    "type": content,
                    "variable": makeid(),
                    "concepts": []
                }
            }];
            next = $.trim(next.slice(i));
            concepts = concepts.concat(parseConcepts(next, top));
            return concepts;
        } else {
            var content = next.slice(1, -1);
            var concepts = [{
                "concept": concept,
                "top": top,
                "node": {
                    "type": content,
                    "variable": makeid(),
                    "concepts": []
                }
            }];
            return concepts;
        }
    }
    // in case next is node_id or number
    else {
        var i = next.search(" ");
        var variable, type, content;
        if(i != -1){
            content = next.slice(0, i);
        } else {
            content = next;
            i = next.length;
        }
        var isFloat = !isNaN(parseFloat(content));
        if(isFloat){
            // next is number
            type = parseFloat(content);
            variable = makeid();
        } else {
            // next is node_id
            type = "";
            variable = content;
        }
        var concepts = [{
            "concept": concept,
            "top": top,
            "node": {
                "type": type,
                "variable": variable,
                "concepts": []
            }
        }];
    }
    next = $.trim(next.slice(i));
    concepts = concepts.concat(parseConcepts(next, top));
    return concepts;
}

function parseNode(text) {
    var next = text.slice(1, -1);
    var i = text.search("/");
    var variable = $.trim(next.slice(0, i - 1));
    next = $.trim(next.slice(i));
    i = next.search(" ");
    if (i != -1) {
        var type = $.trim(next.slice(0, i));
        next = $.trim(next.slice(i));
        var concepts = next;
        node = {
            "type": type,
            "variable": variable,
            "concepts": parseConcepts(concepts, variable)
        }
    } else {
        var type = $.trim(next);
        node = {
            "type": type,
            "variable": variable,
            "concepts": []
        }
    }
    return node;
}



