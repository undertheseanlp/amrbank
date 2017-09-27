/**
 * Created by Alex on 5/20/2015.
 */

function getScaleFreeNetwork(nodeCount) {
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

function draw() {
    destroy();
    // randomly create some nodes and edges
    var nodeCount = document.getElementById('nodeCount').value;
    var data = getScaleFreeNetwork(nodeCount);

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
    network = new vis.Network(container, data, options);

    // add event listeners
    network.on('select', function (params) {
        document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
    });
}