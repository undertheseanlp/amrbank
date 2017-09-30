var AMRListViewConfiguration = {
    "tabSize": 2
};



function makeAMRNode(node) {
    var content = sprintf('<li class="list-group-item">%1$s / <a href="">%2$s</a></li></ul>', node.variable, node.type);
    $(amrDom).append(content);
    makeAMRRelations(node.relations, 1);
}

function createNodeDom(role, node){
    var dom;
    if(role == ":wiki"){
        dom = sprintf('vi:<a style="text-decoration: underline; color: #000080;" href="https://vi.wikipedia.org/wiki/%2$s">%2$s</a>', node.variable, node.type);
        return dom;
    }
    if(role == ":name"){
        dom = _.map(node.relations, function(relation){
            return sprintf('<span class="role">%1$s</span> %2$s', relation.role, relation.node.type )
        }).join(" ");
        return dom;
    }
    if(_.contains(["string", "polarity", "number"], node.class)){
        dom = node.type;
        return dom;
    }
    if(node.class == "node_id"){
        dom = sprintf('<i>%1$s</i>', node.variable);
        return dom;
    }
    else {
        dom = sprintf('(%1$s / <a href="">%2$s</a>)', node.variable, node.type);
        return dom;
    }
};


function makeAMRRelations(relations, level) {
    var content;
    _.each(relations, function (relation) {
        var tab = "&nbsp;".repeat(level * AMRListViewConfiguration["tabSize"]);
        var actionMenu = '<span style="display: none" class="actionMenu pull-right">' +
            '<button type="button" class="btn btn-xs btn-danger actionDelete">' +
                '<i class="fa fa-minus" aria-hidden="true"></i>' +
            '</button>\n' +
            '</span>';
        var template = '<li id="%5$s" class="list-group-item">%1$s<span class="role">%2$s</span> %3$s %4$s</li>';
        var nodeDom = createNodeDom(relation.role, relation.node);
        content = sprintf(template, tab, relation.role, nodeDom, actionMenu, relation.id);
        $(amrDom).append(content);
        if(!_.contains([":name"], relation.role)){
            makeAMRRelations(relation.node.relations, level + 1);
        }
    });
}
window.amr = null;

function makeAMRRaw(tree){
    console.log(tree);
}
function makeAMRListView(tree) {
    window.amr = tree;
    window.amrDom = "#amr_listview";
    $(window.amrDom).html("");
    var content = '<ul class="list-group"></ul>';
    $(amrDom).append(content);
    window.armDom = '#amr_listview ul';
    makeAMRNode(tree);

    // toggle
    $("#amr_listview li").click(function(){
        $("#amr_listview li").removeClass("relation-focus");
        $("#amr_listview li .actionMenu").hide();

        $(this).addClass("relation-focus");
        $(this).find(".actionMenu").show();
    });

    $("#amr_listview .actionDelete").click(function(){
        var id = $(this).parent().parent().attr("id");
        window.amr = removeRelation(window.amr, id);
        syncAMR(treeToText(window.amr));
        // $(this).parent().parent().hide();
    });
}