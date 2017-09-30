function _triplesToRelations(triples, top){
    var relations = _.chain(triples.relations).filter(function(r){
        return r.from == top.variable;
    }).map(function(r){
        return {
            "role": r["role"],
            "id": r["id"],
            "top": top["variable"],
            "node": _triplesToNode(triples, r["to"], false)
        }
    }).value();
    return relations;
}

function _triplesToNode(triples, nodeId, isRoot){
    var node;
    if(isRoot){
        node = _.find(triples.nodes, function(n){
            return n.root;
        });
    } else {
        node = _.find(triples.nodes, function(n){
            return n.variable == nodeId;
        });
    }
    node["relations"] = _triplesToRelations(triples, node);
    return node;
}

function tripleToTree(triples) {
    return _triplesToNode(triples, null, true)
}