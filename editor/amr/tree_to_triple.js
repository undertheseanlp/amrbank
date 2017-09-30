function _nodeToTriple(node, root){
    var node_ = {
        "type": node["type"],
        "variable": node["variable"],
        "root": root,
        "class": node["class"]
    };
    var output = {
        "nodes": [node_],
        "relations": []
    };
    for (var i = 0; i < node.relations.length; i++) {
        var relation = node.relations[i];
        var relation_ = {
            "id": relation["id"],
            "role": relation["role"],
            "from": relation["top"],
            "to": relation["node"]["variable"]
        };
        output.relations.push(relation_);
        var child = _nodeToTriple(relation["node"], false);
        output.relations = _.union(output.relations, child["relations"]);
        output.nodes = _.union(output.nodes, child["nodes"]);
    }
    return output;
}

function treeToTriple(tree) {
    return _nodeToTriple(tree, true);
}






