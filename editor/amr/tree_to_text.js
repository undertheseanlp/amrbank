function _relationToText(relation, multiline, level) {
    var role = relation.role;
    var node = "";
    var tab = "";
    if(multiline){
        tab = " ".repeat(level * AMRRawTextConfiguration["tabSize"]);
    }
    if(_.contains(["number", "polarity"], relation.node.class)){
        node = relation.node.type;
    }
    else if(relation.node.class == "string"){
        node = sprintf('"%1$s"', relation.node.type);
    }
    else if(relation.node.class == "node_id"){
        node = sprintf('%1$s', relation.node.variable);
    }
    else
    {
        node = _nodeToText(relation.node, multiline, level + 1);
    }
    return sprintf("%1$s %2$s", relation.role, node);
}

function _nodeToText(tree, multiline, level) {
    var node = sprintf("%1$s / %2$s", tree.variable, tree.type);
    var relations = "";
    if (tree.relations.length > 0) {
        if(multiline){
            relations = _.map(tree.relations, function (relation) {
                return ' '.repeat(level * AMRRawTextConfiguration["tabSize"]) + _relationToText(relation, multiline, level);
            }).join("\n");
            relations = "\n" + relations;
        } else {
            relations = _.map(tree.relations, function (relation) {
                return _relationToText(relation, multiline, level);
            }).join(" ");
            relations = " " + relations;
        }
    }
    var content = sprintf("(%1$s%2$s)", node, relations);
    return content;
}

function treeToText(tree, multiline){
    return _nodeToText(tree, multiline, 1);
}