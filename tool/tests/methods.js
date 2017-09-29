describe('methods: Delete', function () {
    it('Simple relation', function () {
        // text: today it's sunny
        // amr:
        // (v2 / sunny :time (v1 / today))
        var tree = {
            "type": "sunny",
            "variable": "v2",
            "root": true,
            "relations": [{
                "id": "e29mM",
                "role": ":time",
                "top": "v2",
                "node": {"type": "today", "variable": "v1", "relations": []}
            }]
        };
        var tree = removeRelation(tree, "e29mM");
        expect(tree["relations"]).to.be.empty;
        expect(tree).to.include({"variable": "v2", "type": "sunny"});
    });

    it('Two relations', function () {
        var tree = {
            "type": "t1",
            "variable": "v1",
            "root": true,
            "relations": [{
                "id": "O9dyS",
                "role": ":ARG0",
                "top": "v1",
                "node": {"type": "t2", "variable": "v2", "relations": []}
            }, {
                "id": "WesD3",
                "role": ":ARG1",
                "top": "v1",
                "node": {"type": "t3", "variable": "v3", "relations": []}
            }]
        };
        console.log(treeToText(tree));
        var tree = removeRelation(tree, "O9dyS");
        expect(tree["relations"].length).to.equal(1);
        expect(tree).to.include({"variable": "v1", "type": "t1"});
    });
});
