/**
 * Created by Alex on 5/20/2015.
 */

function Graph() {
    this.nodes = [];
    this.edges = [];

    this.addNode = function (node) {
        if (!node.label) {
            return 0;
        }
        var index = _.findIndex(this.nodes, function (current) {
            return node.id == current.id;
        });
        if (index == -1) {
            this.nodes.push(node);
        } else {
            this.nodes[index]["label"] = node.label;
        }
    };

    this.addEdge = function (source, dist, label) {
        var isExist = !_.chain(this.edges)
            .filter(function (current) {
                return current.from == source.id && current.to == dist.id;
            })
            .isEmpty()
            .value();
        if (!isExist) {
            this.addNode(source);
            this.addNode(dist);
            var edge = {
                "from": source.id,
                "to": dist.id,
                "label": label
            };
            this.edges.push(edge);
        }
    };

    this.getData = function () {
        return {
            nodes: this.nodes,
            edges: this.edges
        }
    }
}

function addConcepts(graph, concepts) {
    for (var i = 0; i < concepts.length; i++) {
        concept = concepts[i];
        label = concept["concept"];
        graph.addEdge({
            "id": concept["top"]
        }, {
            "id": concept["node"]["variable"],
            "label": concept["node"]["type"]
        }, label)
        graph = addConcepts(graph, concept["node"]["concepts"]);
    }
    return graph;
}

function sentenceToGraph(tree) {
    console.log(tree);
    var graph = new Graph();
    var top = {
        "id": tree["variable"],
        "label": tree["type"]
    };
    graph.addEdge(top, top, "TOP");
    graph = addConcepts(graph, tree.concepts);
    return graph.getData();
}

function getData(nodeCount) {
    console.log(nodeCount);
    var nodes = [
        {"id": 0, label: "help-01"},
        {"id": 1, label: "version"}
    ];
    var edges = [
        {"from": 0, "to": 1, "label": "ARG0"}
    ];
    var graph = {
        nodes: nodes,
        edges: edges
    };
    return graph;
}

var network = null;

function destroy() {
    if (network !== null) {
        network.destroy();
        network = null;
    }
}

function draw(sentence) {
    destroy();
    // randomly create some nodes and edges

    // create a network
    var container = document.getElementById('mynetwork');
    var options = {
        layout: {
            hierarchical: {
                // direction: directionInput,
                sortMethod: 'directed'
            }
        },
        edges: {
            smooth: true,
            arrows: {to: true}
        }
    };
    var data = sentenceToGraph(sentence);
    // var data = getData();
    network = new vis.Network(container, data, options);

    // add event listeners
    network.on('select', function (params) {
        document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
    });
}

// draw();