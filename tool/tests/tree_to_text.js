describe('treeToText', function () {
    it('Node', function () {
        var text = "(v2 / sunny :time (v1 / today))";
        var actual = treeToText(textToTree(text));
        expect(actual).be.equal(text);
    });

    it('Number', function () {
        var text = "(v2 / sunny :quant 5)";
        var actual = treeToText(textToTree(text));
        expect(actual).be.equal(text);
    });

    it('String', function () {
        var text = '(v2 / sunny :name "Ha_Noi")';
        var actual = treeToText(textToTree(text));
        expect(actual).be.equal(text);
    });

    it('Polarity', function () {
        var text = '(v2 / sunny :polarity -)';
        var actual = treeToText(textToTree(text));
        expect(actual).be.equal(text);
    });

    it('Variable', function () {
        var text = '(v1 / new :ARG0 v1)';
        var actual = treeToText(textToTree(text));
        expect(actual).be.equal(text);
    });

    it('Multiline', function () {
        var text = '(v1 / new :ARG0 v1)';
        var actual = treeToText(textToTree(text), true);
        var expected = '(v1 / new\n    :ARG0 v1)';
        expect(actual).be.equal(expected);
    });
});