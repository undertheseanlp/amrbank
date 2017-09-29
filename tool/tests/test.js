var expect = chai.expect;
var should = chai.should();


describe('Delete', function () {
    it('Delete simple relation', function () {
        // text: today it's sunny
        var tree = {
            "type": "sunny",
            "variable": "v2",
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
    })

     it('Delete an object has two relations', function () {
        var tree = {
            "type": "sunny",
            "variable": "v2",
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
    })
});

describe('Basic AMR', function () {
    it('Simple Concept', function () {
        var text = "(v1 / new)";
        var result = parseNode(text);
        expect(result).to.include({"variable": "v1"});
    });

    it('Simple Relations', function () {
        var text = "(v2 / version :mod (v1 / new))";
        var result = parseNode(text);
        var relation = result["relations"][0];
        var node = result["relations"][0]["node"];
        expect(result).to.include({"variable": "v2"});
        expect(relation).to.include({"role": ":mod"});
        expect(node).to.include({"variable": "v1"});
    });

    it('Multiple Concepts', function () {
        var text = "(v2 / version :mod (v1 / new) :mod (v4 / bill :mod (v3 / health-care)))";
        var result = parseNode(text);
        var relation1 = result["relations"][0];
        var relation2 = result["relations"][1];
        expect(result).to.include({"variable": "v2"});
        expect(relation1).to.include({"role": ":mod"});
        expect(relation2).to.include({"role": ":mod"});
    });
});

describe('Relations', function () {
    it('String', function () {
        var text = "(v1 / new :name \"Hanoi\")";
        var result = parseNode(text);
        expect(result).to.include({"variable": "v1"});
        var relation1 = result["relations"][0];
        expect(relation1).to.include({"role": ":name"});
        var node1 = result["relations"][0]["node"];
        expect(node1).to.include({"type": "Hanoi"});
    });

    it('Mixed Strings', function () {
        var text = "(v1 / new :name \"Hanoi\" :name2 \"Vietnam\")";
        var result = parseNode(text);
        console.log(result);
        expect(result).to.include({"variable": "v1"});
        var relation1 = result["relations"][0];
        var relation2 = result["relations"][1];
        expect(relation1).to.include({"role": ":name"});
        expect(relation2).to.include({"role": ":name2"});
        var node1 = result["relations"][0]["node"];
        var node2 = result["relations"][1]["node"];
        expect(node1).to.include({"type": "Hanoi"});
        expect(node2).to.include({"type": "Vietnam"});
    });

    it('Variable', function () {
        var text = "(v1 / new :ARG0 v1)";
        var result = parseNode(text);
        expect(result).to.include({"variable": "v1"});
        var relation1 = result["relations"][0];
        expect(relation1).to.include({"role": ":ARG0"});
        var node1 = result["relations"][0]["node"];
        expect(node1).to.include({"variable": "v1"});
    });

    it('Mixed Variables', function () {
        var text = "(v1 / new :ARG0 v1 :name v2)";
        var result = parseNode(text);
        expect(result).to.include({"variable": "v1"});
        var relation1 = result["relations"][0];
        expect(relation1).to.include({"role": ":ARG0"});
        var node1 = result["relations"][0]["node"];
        expect(node1).to.include({"variable": "v1"});
    });

    it('Number', function () {
        var text = "(v1 / new :quant 5)";
        var result = parseNode(text);
        expect(result).to.include({"variable": "v1"});
        var relation1 = result["relations"][0];
        expect(relation1).to.include({"role": ":quant"});
        var node1 = result["relations"][0]["node"];
        expect(node1).to.include({"type": 5});
    });

    it('Mixed Numbers', function () {
        var text = "(v1 / new :quant 5 :quant2 10)";
        var result = parseNode(text);
        expect(result).to.include({"variable": "v1"});
        var relation1 = result["relations"][0];
        var relation2 = result["relations"][1];
        expect(relation1).to.include({"role": ":quant"});
        expect(relation2).to.include({"role": ":quant2"});
        expect(relation1["node"]).to.include({"type": 5});
        expect(relation2["node"]).to.include({"type": 10});
    });

    it('Node', function () {
        var text = "(v1 / new :mod (v2 / new))";
        var result = parseNode(text);
        expect(result).to.include({"variable": "v1"});
        var relation1 = result["relations"][0];
        expect(relation1["node"]).to.include({"variable": "v2"});
    });
});

describe("Handle Exception", function () {
    it('Parentheses Missing', function () {
        var text = "(v1 / new :mod (v2 / new)";
        expect(function () {
            parseNode(text)
        }).to.throw("Syntax Exception");
    });
});