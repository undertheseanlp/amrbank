function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function parseRole(text){
    var i = text.search(" ");
    var role = text.slice(0, i);
    return role;
}

function parseContent(text){
    var i = text.search(" ");
    var content = $.trim(text.slice(i));
    return content;
}

function parseRelations(text, top) {
    /***
     * text
     *  :role1 (content1) :role2 content2 :role3 content4
     */
    if (text.length == 0) {
        return [];
    }
    var role = parseRole(text);
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
        var relations = [{
            "id": makeid(),
            "role": role,
            "top": top,
            "node": parseNode(node)
        }];
    }
    // in case next is polarity
    else if (next[0] == "-") {
        var relations = [{
            "id": makeid(),
            "role": role,
            "top": top,
            "node": {
                "type": "-",
                "class": "polarity",
                "variable": makeid(),
                "relations": []
            }
        }];
        i = 1;
    }
    // in case next is string
    else if (next[0] == "\"") {
        var i = next.search(" ");
        if (i != -1) {
            var content = next.slice(1, i - 1);
            var relations = [{
                "id": makeid(),
                "role": role,
                "top": top,
                "node": {
                    "class": "string",
                    "type": content,
                    "variable": makeid(),
                    "relations": []
                }
            }];
            next = $.trim(next.slice(i));
            relations = relations.concat(parseRelations(next, top));
            return relations;
        } else {
            var content = next.slice(1, -1);
            var relations = [{
                "id": makeid(),
                "role": role,
                "top": top,
                "node": {
                    "class": "string",
                    "type": content,
                    "variable": makeid(),
                    "relations": []
                }
            }];
            return relations;
        }
    }
    // in case next is node_id or number
    else {
        var i = next.search(" ");
        var variable, type, content, class_;
        if(i != -1){
            content = next.slice(0, i);
        } else {
            content = next;
            i = next.length;
        }
        var isFloat = !isNaN(parseFloat(content));
        if(isFloat){
            // next is number
            class_ = "number";
            type = parseFloat(content);
            variable = makeid();
        } else {
            // next is node_id
            class_ = "node_id";
            type = "";
            variable = content;
        }
        var relations = [{
            "id": makeid(),
            "role": role,
            "top": top,
            "node": {
                "class": class_,
                "type": type,
                "variable": variable,
                "relations": []
            }
        }];
    }
    next = $.trim(next.slice(i));
    relations = relations.concat(parseRelations(next, top));
    return relations;
}

function normalize(text) {
    var text = $.trim(text);
    text = text.replace(/(?:\r\n|\r|\n)/g, " ");
    text = text.replace(/  +/g, ' ');
    return text;
}


function parseNode(text) {
    text = normalize(text);
    var next = text.slice(1, -1);
    var i = text.search("/");
    var variable = $.trim(next.slice(0, i - 1));
    next = $.trim(next.slice(i));
    i = next.search(" ");
    var amr;
    if (i != -1) {
        var type = $.trim(next.slice(0, i));
        next = $.trim(next.slice(i));
        amr = {
            "type": type,
            "variable": variable,
            "relations": parseRelations(next, variable)
        }
    } else {
        var type = $.trim(next);
        amr = {
            "type": type,
            "variable": variable,
            "relations": []
        }
    }
    return amr;
}

function convertToTriples(tree){
    var node = {
        "type": tree["type"],
        "variable": tree["variable"],
        "class": tree["class"]
    };
    var output = {
        "nodes": [node],
        "relations": []
    };
    for(var i = 0; i < tree.relations.length; i++){
        var relation = tree.relations[i];
        var relation_ = {
            "id": relation["id"],
            "role": relation["role"],
            "from": relation["top"],
            "to": relation["node"]["variable"]
        };
        output.relations.push(relation_);
        var child = convertToTriples(relation["node"]);
        output.relations = _.union(output.relations, child["relations"]);
        output.nodes = _.union(output.nodes, child["nodes"]);
    }
    return output;
}

function convertToTree(triples){
    var tree = triples["nodes"][0];
    tree["relations"] = [];
    return tree;
}
function removeRelation(tree, id){
    var output = {};
    var triples = convertToTriples(tree);
    triples["relations"] = _.filter(triples.relations, function(relation){ relation.id != id });
    var tree = convertToTree(triples);
    return tree;
}
