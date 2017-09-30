function removeRelation(tree, relationId) {
    var triples = treeToTriple(tree);
    triples["relations"] = _.filter(triples.relations, function (relation) {
        return relation.id != relationId;
    });
    var tree = tripleToTree(triples);
    return tree;
}