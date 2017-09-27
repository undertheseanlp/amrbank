var expect = chai.expect;
var should = chai.should();


describe('Basic Node', function() {
    it('Simple Node', function() {
        var text = "(v1 / new)";
        var result = parseNode(text);
        expect(result).to.include({"variable": "v1"});
    });

    it('Simple Concept', function() {
        var text = "(v2 / version :mod (v1 / new))";
        var result = parseNode(text);
        var concept = result["concepts"][0];
        var node = result["concepts"][0]["node"];
        expect(result).to.include({"variable": "v2"});
        expect(concept).to.include({"concept": ":mod"});
        expect(node).to.include({"variable": "v1"});
    });

    it('Multiple Concepts', function() {
        var text = "(v2 / version :mod (v1 / new) :mod (v4 / bill :mod (v3 / health-care)))";
        var result = parseNode(text);
        var concept1 = result["concepts"][0];
        var concept2 = result["concepts"][1];
        expect(result).to.include({"variable": "v2"});
        expect(concept1).to.include({"concept": ":mod"});
        expect(concept2).to.include({"concept": ":mod"});
    });
});

describe('Concepts', function(){
    it('String', function() {
        var text = "(v1 / new :name \"Hanoi\")";
        var result = parseNode(text);
        expect(result).to.include({"variable": "v1"});
        var concept1 = result["concepts"][0];
        expect(concept1).to.include({"concept": ":name"});
        var node1 = result["concepts"][0]["node"];
        expect(node1).to.include({"type": "Hanoi"});
    });

    it('Mixed Strings', function() {
        var text = "(v1 / new :name \"Hanoi\" :name2 \"Vietnam\")";
        var result = parseNode(text);
        expect(result).to.include({"variable": "v1"});
        var concept1 = result["concepts"][0];
        var concept2 = result["concepts"][1];
        expect(concept1).to.include({"concept": ":name"});
        expect(concept2).to.include({"concept": ":name2"});
        var node1 = result["concepts"][0]["node"];
        var node2 = result["concepts"][1]["node"];
        expect(node1).to.include({"type": "Hanoi"});
        expect(node2).to.include({"type": "Vietnam"});
    });

    it('Variable', function() {
        var text = "(v1 / new :ARG0 v1)";
        var result = parseNode(text);
        expect(result).to.include({"variable": "v1"});
        var concept1 = result["concepts"][0];
        expect(concept1).to.include({"concept": ":ARG0"});
        var node1 = result["concepts"][0]["node"];
        expect(node1).to.include({"variable": "v1"});
    });

    it('Mixed Variables', function() {
        var text = "(v1 / new :ARG0 v1 :name v2)";
        var result = parseNode(text);
        expect(result).to.include({"variable": "v1"});
        var concept1 = result["concepts"][0];
        expect(concept1).to.include({"concept": ":ARG0"});
        var node1 = result["concepts"][0]["node"];
        expect(node1).to.include({"variable": "v1"});
    });

    it('Number', function() {
        var text = "(v1 / new :quant 5)";
        var result = parseNode(text);
        expect(result).to.include({"variable": "v1"});
        var concept1 = result["concepts"][0];
        expect(concept1).to.include({"concept": ":quant"});
        var node1 = result["concepts"][0]["node"];
        expect(node1).to.include({"type": 5});
    });

    it('Mixed Numbers', function() {
        var text = "(v1 / new :quant 5 :quant2 10)";
        var result = parseNode(text);
        expect(result).to.include({"variable": "v1"});
        var concept1 = result["concepts"][0];
        var concept2 = result["concepts"][1];
        expect(concept1).to.include({"concept": ":quant"});
        expect(concept2).to.include({"concept": ":quant2"});
        expect(concept1["node"]).to.include({"type": 5});
        expect(concept2["node"]).to.include({"type": 10});
    });

    it('Node', function() {
        var text = "(v1 / new :mod (v2 / new))";
        var result = parseNode(text);
        expect(result).to.include({"variable": "v1"});
        var concept1 = result["concepts"][0];
        expect(concept1["node"]).to.include({"variable": "v2"});
    });
});

describe("Handle Exception", function(){
    it('Parentheses Missing', function() {
        var text = "(v1 / new :mod (v2 / new)";
        expect(function(){
            parseNode(text)
        }).to.throw("Syntax Exception");
    });
});