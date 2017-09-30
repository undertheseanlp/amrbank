describe('textToTree: Node', function () {
    it('Simple Concept', function () {
        var text = "(v1 / new)";
        var result = textToTree(text);
        expect(result).to.include({"variable": "v1"});
    });

    it('Simple Relations', function () {
        var text = "(v2 / version :mod (v1 / new))";
        var result = textToTree(text);
        var relation = result["relations"][0];
        var node = result["relations"][0]["node"];
        expect(result).to.include({"variable": "v2"});
        expect(relation).to.include({"role": ":mod"});
        expect(node).to.include({"variable": "v1"});
    });

    it('Multiple Concepts', function () {
        var text = "(v2 / version :mod (v1 / new) :mod (v4 / bill :mod (v3 / health-care)))";
        var result = textToTree(text);
        var relation1 = result["relations"][0];
        var relation2 = result["relations"][1];
        expect(result).to.include({"variable": "v2"});
        expect(relation1).to.include({"role": ":mod"});
        expect(relation2).to.include({"role": ":mod"});
    });
});

describe('textToTree: Relations', function () {
    it('String', function () {
        var text = "(v1 / new :name \"Hanoi\")";
        var result = textToTree(text);
        expect(result).to.include({"variable": "v1"});
        var relation1 = result["relations"][0];
        expect(relation1).to.include({"role": ":name"});
        var node1 = result["relations"][0]["node"];
        expect(node1).to.include({"type": "Hanoi"});
    });

    it('Mixed Strings', function () {
        var text = "(v1 / new :name \"Hanoi\" :name2 \"Vietnam\")";
        var result = textToTree(text);
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
        var result = textToTree(text);
        expect(result).to.include({"variable": "v1"});
        var relation1 = result["relations"][0];
        expect(relation1).to.include({"role": ":ARG0"});
        var node1 = result["relations"][0]["node"];
        expect(node1).to.include({"variable": "v1"});
    });

    it('Mixed Variables', function () {
        var text = "(v1 / new :ARG0 v1 :name v2)";
        var result = textToTree(text);
        expect(result).to.include({"variable": "v1"});
        var relation1 = result["relations"][0];
        expect(relation1).to.include({"role": ":ARG0"});
        var node1 = result["relations"][0]["node"];
        expect(node1).to.include({"variable": "v1"});
    });

    it('Number', function () {
        var text = "(v1 / new :quant 5)";
        var result = textToTree(text);
        expect(result).to.include({"variable": "v1"});
        var relation1 = result["relations"][0];
        expect(relation1).to.include({"role": ":quant"});
        var node1 = result["relations"][0]["node"];
        expect(node1).to.include({"type": 5});
    });

    it('Mixed Numbers', function () {
        var text = "(v1 / new :quant 5 :quant2 10)";
        var result = textToTree(text);
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
        var result = textToTree(text);
        expect(result).to.include({"variable": "v1"});
        var relation1 = result["relations"][0];
        expect(relation1["node"]).to.include({"variable": "v2"});
    });
});

describe("textToTree: Handle Exception", function () {
    it('Parentheses Missing', function () {
        var text = "(v1 / new :mod (v2 / new)";
        expect(function () {
            textToTree(text)
        }).to.throw("Syntax Exception");
    });
});