describe('tripleToTree', function () {
    it('One Relation', function () {
        var triples = {
            "nodes": [{
                "type": "dọa-01",
                "variable": "v2",
                "root": "true"
            },{"type": "thí_sinh", "variable": "v1"}, {
                "type": "tay",
                "variable": "v4"
            }],
            "relations": [{
                "id": "WesD3",
                "role": ":ARG1",
                "from": "v2",
                "to": "v4"
            }]
        };
        var tree = tripleToTree(triples);
        expect(tree).to.include({"variable": "v2"});
    });
});