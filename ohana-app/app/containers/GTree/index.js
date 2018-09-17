import React, { Component } from 'react';
import PropTypes from 'prop-types';
import go from 'gojs';
const goObj = go.GraphObject.make;

const nodeDataArray = [
  {
    key: 0,
    n: 'Aaron',
    s: 'M',
    m: -10,
    f: -11,
    ux: 1,
    a: ['J'],
    date: 'sdasd',
  },
  { key: 1, n: 'Alice', s: 'F', m: -12, f: -13, a: ['H'], date: 'sdasd' },
  { key: 2, n: 'Bob', s: 'M', m: 1, f: 0, ux: 3, a: ['A'], date: 'sdasd' },
  { key: 3, n: 'Barbara', s: 'F', a: ['C'] },
  { key: 4, n: 'Bill', s: 'M', m: 1, f: 0, ux: 5, a: ['E'] },
  { key: 5, n: 'Brooke', s: 'F', a: ['B'] },
  { key: 6, n: 'Claire', s: 'F', m: 1, f: 0, a: ['D'] },
];

export default class GTree extends Component {
  constructor(props) {
    super(props);

    this.renderCanvas = this.renderCanvas.bind(this);
    this.handleSelectedNode = this.handleSelectedNode.bind(this);
    this.state = {
      data: nodeDataArray,
      myModel: null,
      myDiagram: null,
    };
  }

  renderCanvas() {
    // A custom layout that shows the two families related to a person's parents
    function GenogramLayout() {
      go.LayeredDigraphLayout.call(this);
      this.initializeOption = go.LayeredDigraphLayout.InitDepthFirstIn;
      this.spouseSpacing = 30; // minimum space between spouses
    }

    go.Diagram.inherit(GenogramLayout, go.LayeredDigraphLayout);

    /** @override */
    GenogramLayout.prototype.makeNetwork = function(coll) {
      // generate LayoutEdges for each parent-child Link
      const net = this.createNetwork();
      if (coll instanceof go.Diagram) {
        this.add(net, coll.nodes, true);
        this.add(net, coll.links, true);
      } else if (coll instanceof go.Group) {
        this.add(net, coll.memberParts, false);
      } else if (coll.iterator) {
        this.add(net, coll.iterator, false);
      }
      return net;
    };

    // internal method for creating LayeredDigraphNetwork where husband/wife pairs are represented
    // by a single LayeredDigraphVertex corresponding to the label Node on the marriage Link
    GenogramLayout.prototype.add = function(net, coll, nonmemberonly) {
      const multiSpousePeople = new go.Set();
      // consider all Nodes in the given collection
      const it = coll.iterator;
      while (it.next()) {
        let node = it.value;
        if (!(node instanceof go.Node)) continue;
        if (!node.isLayoutPositioned || !node.isVisible()) continue;
        if (nonmemberonly && node.containingGroup !== null) continue;
        // if it's an unmarried Node, or if it's a Link Label Node, create a LayoutVertex for it
        if (node.isLinkLabel) {
          // get marriage Link
          let link = node.labeledLink;
          const spouseA = link.fromNode;
          const spouseB = link.toNode;
          // create vertex representing both husband and wife
          let vertex = net.addNode(node);
          // now define the vertex size to be big enough to hold both spouses
          vertex.width =
            spouseA.actualBounds.width +
            this.spouseSpacing +
            spouseB.actualBounds.width;
          vertex.height = Math.max(
            spouseA.actualBounds.height,
            spouseB.actualBounds.height,
          );
          vertex.focus = new go.Point(
            spouseA.actualBounds.width + this.spouseSpacing / 2,
            vertex.height / 2,
          );
        } else {
          // don't add a vertex for any married person!
          // instead, code above adds label node for marriage link
          // assume a marriage Link has a label Node
          let marriages = 0;
          node.linksConnected.each(l => {
            if (l.isLabeledLink) marriages++;
          });
          if (marriages === 0) {
            let vertex = net.addNode(node);
          } else if (marriages > 1) {
            multiSpousePeople.add(node);
          }
        }
      }
      // now do all Links
      it.reset();
      while (it.next()) {
        let link = it.value;
        if (!(link instanceof go.Link)) continue;
        if (!link.isLayoutPositioned || !link.isVisible()) continue;
        if (nonmemberonly && link.containingGroup !== null) continue;
        // if it's a parent-child link, add a LayoutEdge for it
        if (!link.isLabeledLink) {
          let parent = net.findVertex(link.fromNode); // should be a label node
          const child = net.findVertex(link.toNode);
          if (child !== null) {
            // an unmarried child
            net.linkVertexes(parent, child, link);
          } else {
            // a married child
            link.toNode.linksConnected.each(l => {
              if (!l.isLabeledLink) return; // if it has no label node, it's a parent-child link
              // found the Marriage Link, now get its label Node
              const mlab = l.labelNodes.first();
              // parent-child link should connect with the label node,
              // so the LayoutEdge should connect with the LayoutVertex representing the label node
              const mlabvert = net.findVertex(mlab);
              if (mlabvert !== null) {
                net.linkVertexes(parent, mlabvert, link);
              }
            });
          }
        }
      }

      while (multiSpousePeople.count > 0) {
        // find all collections of people that are indirectly married to each other
        let node = multiSpousePeople.first();
        const cohort = new go.Set();
        this.extendCohort(cohort, node);
        // then encourage them all to be the same generation by connecting them all with a common vertex
        let dummyvert = net.createVertex();
        net.addVertex(dummyvert);
        let marriages = new go.Set();
        cohort.each(n => {
          n.linksConnected.each(l => {
            marriages.add(l);
          });
        });
        marriages.each(link => {
          // find the vertex for the marriage link (i.e. for the label node)
          const mlab = link.labelNodes.first();
          const v = net.findVertex(mlab);
          if (v !== null) {
            net.linkVertexes(dummyvert, v, null);
          }
        });
        // done with these people, now see if there are any other multiple-married people
        multiSpousePeople.removeAll(cohort);
      }
    };

    // collect all of the people indirectly married with a person
    GenogramLayout.prototype.extendCohort = function(coll, node) {
      if (coll.contains(node)) return;
      coll.add(node);
      const lay = this;
      node.linksConnected.each(l => {
        if (l.isLabeledLink) {
          // if it's a marriage link, continue with both spouses
          lay.extendCohort(coll, l.fromNode);
          lay.extendCohort(coll, l.toNode);
        }
      });
    };

    /** @override */
    GenogramLayout.prototype.assignLayers = function() {
      go.LayeredDigraphLayout.prototype.assignLayers.call(this);
      const horiz = this.direction == 0.0 || this.direction == 180.0;
      // for every vertex, record the maximum vertex width or height for the vertex's layer
      const maxsizes = [];
      this.network.vertexes.each(v => {
        const lay = v.layer;
        let max = maxsizes[lay];
        if (max === undefined) max = 0;
        const sz = horiz ? v.width : v.height;
        if (sz > max) maxsizes[lay] = sz;
      });
      // now make sure every vertex has the maximum width or height according to which layer it is in,
      // and aligned on the left (if horizontal) or the top (if vertical)
      this.network.vertexes.each(v => {
        const lay = v.layer;
        const max = maxsizes[lay];
        if (horiz) {
          v.focus = new go.Point(0, v.height / 2);
          v.width = max;
        } else {
          v.focus = new go.Point(v.width / 2, 0);
          v.height = max;
        }
      });
      // from now on, the LayeredDigraphLayout will think that the Node is bigger than it really is
      // (other than the ones that are the widest or tallest in their respective layer).
    };

    /** @override */
    GenogramLayout.prototype.commitNodes = function() {
      go.LayeredDigraphLayout.prototype.commitNodes.call(this);
      // position regular nodes
      this.network.vertexes.each(v => {
        if (v.node !== null && !v.node.isLinkLabel) {
          v.node.position = new go.Point(v.x, v.y);
        }
      });
      // position the spouses of each marriage vertex
      const layout = this;
      this.network.vertexes.each(v => {
        if (v.node === null) return;
        if (!v.node.isLinkLabel) return;
        const labnode = v.node;
        const lablink = labnode.labeledLink;
        // In case the spouses are not actually moved, we need to have the marriage link
        // position the label node, because LayoutVertex.commit() was called above on these vertexes.
        // Alternatively we could override LayoutVetex.commit to be a no-op for label node vertexes.
        lablink.invalidateRoute();
        let spouseA = lablink.fromNode;
        let spouseB = lablink.toNode;
        // prefer fathers on the left, mothers on the right
        if (spouseA.data.s === 'F') {
          // sex is female
          let temp = spouseA;
          spouseA = spouseB;
          spouseB = temp;
        }
        // see if the parents are on the desired sides, to avoid a link crossing
        const aParentsNode = layout.findParentsMarriageLabelNode(spouseA);
        const bParentsNode = layout.findParentsMarriageLabelNode(spouseB);
        if (
          aParentsNode !== null &&
          bParentsNode !== null &&
          aParentsNode.position.x > bParentsNode.position.x
        ) {
          // swap the spouses
          let temp = spouseA;
          spouseA = spouseB;
          spouseB = temp;
        }
        spouseA.position = new go.Point(v.x, v.y);
        spouseB.position = new go.Point(
          v.x + spouseA.actualBounds.width + layout.spouseSpacing,
          v.y,
        );
        if (spouseA.opacity === 0) {
          let pos = new go.Point(
            v.centerX - spouseA.actualBounds.width / 2,
            v.y,
          );
          spouseA.position = pos;
          spouseB.position = pos;
        } else if (spouseB.opacity === 0) {
          let pos = new go.Point(
            v.centerX - spouseB.actualBounds.width / 2,
            v.y,
          );
          spouseA.position = pos;
          spouseB.position = pos;
        }
      });
      // position only-child nodes to be under the marriage label node
      this.network.vertexes.each(v => {
        if (v.node === null || v.node.linksConnected.count > 1) return;
        const mnode = layout.findParentsMarriageLabelNode(v.node);
        if (mnode !== null && mnode.linksConnected.count === 1) {
          // if only one child
          const mvert = layout.network.findVertex(mnode);
          const newbnds = v.node.actualBounds.copy();
          newbnds.x = mvert.centerX - v.node.actualBounds.width / 2;
          // see if there's any empty space at the horizontal mid-point in that layer
          const overlaps = layout.diagram.findObjectsIn(
            newbnds,
            x => x.part,
            p => p !== v.node,
            true,
          );
          if (overlaps.count === 0) {
            v.node.move(newbnds.position);
          }
        }
      });
    };

    GenogramLayout.prototype.findParentsMarriageLabelNode = function(node) {
      const it = node.findNodesInto();
      while (it.next()) {
        const n = it.value;
        if (n.isLinkLabel) return n;
      }
      return null;
    };
    // end GenogramLayout class

    const model = go.GraphObject.make(go.GraphLinksModel, {
      // declare support for link label nodes
      linkLabelKeysProperty: 'labelKeys',
      // this property determines which template is used
      nodeCategoryProperty: 's',
      // create all of the nodes for people
      nodeDataArray: this.props.data,
    });

    const diagram = goObj(go.Diagram, 'goJsDiv', {
      initialAutoScale: go.Diagram.Uniform,
      initialContentAlignment: go.Spot.Center,
      'animationManager.isEnabled': false,
      'animationManager.isInitial': false,
      'undoManager.isEnabled': true,
      // when a node is selected, draw a big yellow circle behind it
      nodeSelectionAdornmentTemplate: goObj(
        go.Adornment,
        'Auto',
        { layerName: 'Grid' }, // the predefined layer that is behind everything else
        goObj(go.Shape, 'Circle', { fill: 'cyan', stroke: null }),
        goObj(go.Placeholder),
      ),
      // use a custom layout, defined below
      layout: goObj(GenogramLayout, {
        direction: 90,
        layerSpacing: 30,
        columnSpacing: 10,
      }),
    });

    // determine the color for each attribute shape
    function attrFill(a) {
      switch (a) {
        case '#f44336':
          return '#f44336';
        case '#e91e63':
          return '#e91e63';
        case '#9c27b0':
          return '#9c27b0';
        case '#673ab7':
          return '#673ab7';
        case '#3f51b5':
          return '#3f51b5';
        case '#2196f3':
          return '#2196f3';
        case '#03a9f4':
          return '#03a9f4';
        case '#00bcd4':
          return '#00bcd4';
        case '#009688':
          return '#009688';
        case '#4caf50':
          return '#4caf50';
        case '#8bc34a':
          return '#8bc34a';
        case '#cddc39':
          return '#cddc39';
        case '#ffeb3b':
          return '#ffeb3b';
        case '#ffc107':
          return '#ffc107';
        case '#ff9800':
          return '#ff9800';
        case '#ff5722':
          return '#ff5722';
        case '#795548':
          return '#795548';
        case '#607d8b':
          return '#607d8b';
        default:
          return 'transparent';
      }
    }

    // determine the geometry for each attribute shape in a male;
    // except for the slash these are all squares at each of the four corners of the overall square
    const tlsq = go.Geometry.parse('F M1 1 l19 0 0 19 -19 0z');
    const trsq = go.Geometry.parse('F M20 1 l19 0 0 19 -19 0z');
    const brsq = go.Geometry.parse('F M20 20 l19 0 0 19 -19 0z');
    const blsq = go.Geometry.parse('F M1 20 l19 0 0 19 -19 0z');
    const slash = go.Geometry.parse('F M38 0 L40 0 40 2 2 40 0 40 0 38z');
    function maleGeometry(a) {
      switch (a) {
        case '#f44336':
          return tlsq;
        case '#e91e63':
          return tlsq;
        case '#9c27b0':
          return tlsq;
        case '#673ab7':
          return tlsq;
        case '#3f51b5':
          return trsq;
        case '#2196f3':
          return trsq;
        case '#03a9f4':
          return trsq;
        case '#00bcd4':
          return trsq;
        case '#009688':
          return brsq;
        case '#4caf50':
          return brsq;
        case '#8bc34a':
          return brsq;
        case '#cddc39':
          return brsq;
        case '#ffeb3b':
          return blsq;
        case '#ffc107':
          return blsq;
        case '#ff9800':
          return blsq;
        case '#ff5722':
          return blsq;
        case '#795548':
          return blsq;
        case '#607d8b':
          return blsq;
        default:
          return slash;
      }
    }

    // determine the geometry for each attribute shape in a female;
    // except for the slash these are all pie shapes at each of the four quadrants of the overall circle
    const tlarc = go.Geometry.parse('F M20 20 B 180 90 20 20 19 19 z');
    const trarc = go.Geometry.parse('F M20 20 B 270 90 20 20 19 19 z');
    const brarc = go.Geometry.parse('F M20 20 B 0 90 20 20 19 19 z');
    const blarc = go.Geometry.parse('F M20 20 B 90 90 20 20 19 19 z');
    function femaleGeometry(a) {
      switch (a) {
        case '#f44336':
          return tlarc;
        case '#e91e63':
          return tlarc;
        case '#9c27b0':
          return tlarc;
        case '#673ab7':
          return tlarc;
        case '#3f51b5':
          return trarc;
        case '#2196f3':
          return trarc;
        case '#03a9f4':
          return trarc;
        case '#00bcd4':
          return trarc;
        case '#009688':
          return brarc;
        case '#4caf50':
          return brarc;
        case '#8bc34a':
          return brarc;
        case '#cddc39':
          return brarc;
        case '#ffeb3b':
          return blarc;
        case '#ffc107':
          return blarc;
        case '#ff9800':
          return blarc;
        case '#ff5722':
          return blarc;
        case '#795548':
          return blarc;
        case '#607d8b':
          return blarc;
        default:
          return slash;
      }
    }

    // two different node templates, one for each sex,
    // named by the category value in the node data object
    diagram.nodeTemplateMap.add(
      'M', // male
      goObj(
        go.Node,
        'Vertical',
        {
          selectionChanged: node => this.handleSelectedNode(node.key),
        },
        { locationSpot: go.Spot.Center, locationObjectName: 'ICON' },
        goObj(
          go.Panel,
          { name: 'ICON' },
          goObj(go.Shape, 'Square', {
            width: 40,
            height: 40,
            strokeWidth: 1,
            fill: 'white',
            portId: '',
          }),
          goObj(
            go.Panel,
            {
              // for each attribute show a Shape at a particular place in the overall square
              itemTemplate: goObj(
                go.Panel,
                goObj(
                  go.Shape,
                  { stroke: null, strokeWidth: 0 },
                  new go.Binding('fill', '', attrFill),
                  new go.Binding('geometry', '', maleGeometry),
                ),
              ),
              margin: 1,
            },
            new go.Binding('itemArray', 'a'),
          ),
        ),
        goObj(
          go.TextBlock,
          { textAlign: 'center', maxSize: new go.Size(80, NaN) },
          new go.Binding('text', 'n'),
        ),
      ),
    );

    diagram.nodeTemplateMap.add(
      'F', // female
      goObj(
        go.Node,
        'Vertical',
        {
          selectionChanged: node => this.handleSelectedNode(node.key),
        },
        { locationSpot: go.Spot.Center, locationObjectName: 'ICON' },
        goObj(
          go.Panel,
          { name: 'ICON' },
          goObj(go.Shape, 'Circle', {
            width: 40,
            height: 40,
            strokeWidth: 1,
            fill: 'white',
            portId: '',
          }),
          goObj(
            go.Panel,
            {
              // for each attribute show a Shape at a particular place in the overall circle
              itemTemplate: goObj(
                go.Panel,
                goObj(
                  go.Shape,
                  { stroke: null, strokeWidth: 0 },
                  new go.Binding('fill', '', attrFill),
                  new go.Binding('geometry', '', femaleGeometry),
                ),
              ),
              margin: 1,
            },
            new go.Binding('itemArray', 'a'),
          ),
        ),
        goObj(
          go.TextBlock,
          { textAlign: 'center', maxSize: new go.Size(80, NaN) },
          new go.Binding('text', 'n'),
        ),
      ),
    );

    // the representation of each label node -- nothing shows on a Marriage Link
    diagram.nodeTemplateMap.add(
      'LinkLabel',
      goObj(go.Node, {
        selectable: false,
        width: 1,
        height: 1,
        fromEndSegmentLength: 20,
      }),
    );

    diagram.linkTemplate = goObj(
      // for parent-child relationships
      go.Link,
      {
        routing: go.Link.Orthogonal,
        curviness: 15,
        layerName: 'Background',
        selectable: false,
        fromSpot: go.Spot.Bottom,
        toSpot: go.Spot.Top,
      },
      goObj(go.Shape, { strokeWidth: 2 }),
    );

    diagram.linkTemplateMap.add(
      'Marriage', // for marriage relationships
      goObj(
        go.Link,
        { selectable: false },
        goObj(go.Shape, { strokeWidth: 2, stroke: 'gray' }),
      ),
    );

    this.setState({ myModel: model, myDiagram: diagram }, () => {
      diagram.model.nodeDataArray = this.props.data;
      this.setupDiagram(diagram, 4);
      model.nodeDataArray = this.props.data;
      this.setState({ myModel: model, myDiagram: diagram }); 
      this.props.exportTo(diagram.makeImageData({
        type: "image/png",
        background: "white"
      }));     
    });
  }

  componentDidMount() {
    this.renderCanvas();
  }

  componentWillUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      console.log('Updating');
      console.log(this.state.myDiagram.model.nodeDataArray);

      const model = this.state.myModel;
      const diagram = this.state.myDiagram;

      this.setState({ myModel: model, myDiagram: diagram }, () => {
        diagram.model.nodeDataArray = this.props.data;
        this.setupDiagram(diagram, 4);
        model.nodeDataArray = this.props.data;
        this.setState({ myModel: model, myDiagram: diagram });
        this.props.exportTo(diagram.makeImageData({
          type: "image/png",
          background: "white"

        }));
      });
    }
  }

  setupDiagram(diagram, focusId) {
    diagram.model = go.GraphObject.make(go.GraphLinksModel, {
      // declare support for link label nodes
      linkLabelKeysProperty: 'labelKeys',
      // this property determines which template is used
      nodeCategoryProperty: 's',
      // create all of the nodes for people
      nodeDataArray: this.props.data,
    });

    this.setupMarriages(diagram);
    this.setupParents(diagram);

    const node = diagram.findNodeForKey(focusId);
    if (node !== null) {
      diagram.select(node);
      // remove any spouse for the person under focus:
      // node.linksConnected.each(function(l) {
      //  if (!l.isLabeledLink) return;
      //  l.opacity = 0;
      //  let spouse = l.getOtherNode(node);
      //  spouse.opacity = 0;
      //  spouse.pickable = false;
      // });
    }
  }

  findMarriage(diagram, a, b) {
    // A and B are node keys
    const nodeA = diagram.findNodeForKey(a);
    const nodeB = diagram.findNodeForKey(b);
    if (nodeA !== null && nodeB !== null) {
      const it = nodeA.findLinksBetween(nodeB); // in either direction
      while (it.next()) {
        const link = it.value;
        // Link.data.category === "Marriage" means it's a marriage relationship
        if (link.data !== null && link.data.category === 'Marriage')
          return link;
      }
    }
    return null;
  }

  // now process the node data to determine marriages
  setupMarriages(diagram) {
    const model = diagram.model;
    const nodeDataArray = model.nodeDataArray;
    for (let i = 0; i < nodeDataArray.length; i++) {
      const data = nodeDataArray[i];
      const key = data.key;
      let uxs = data.ux;
      if (uxs !== undefined) {
        if (typeof uxs === 'number') uxs = [uxs];
        for (let j = 0; j < uxs.length; j++) {
          const wife = uxs[j];
          if (key === wife) {
            // or warn no reflexive marriages
            continue;
          }
          let link = this.findMarriage(diagram, key, wife);
          if (link === null) {
            // add a label node for the marriage link
            let mlab = { s: 'LinkLabel' };
            model.addNodeData(mlab);
            // add the marriage link itself, also referring to the label node
            let mdata = {
              from: key,
              to: wife,
              labelKeys: [mlab.key],
              category: 'Marriage',
            };
            model.addLinkData(mdata);
          }
        }
      }
      let virs = data.vir;
      if (virs !== undefined) {
        if (typeof virs === 'number') virs = [virs];
        for (let j = 0; j < virs.length; j++) {
          const husband = virs[j];
          if (key === husband) {
            // or warn no reflexive marriages
            continue;
          }
          let link = this.findMarriage(diagram, key, husband);
          if (link === null) {
            // add a label node for the marriage link
            let mlab = { s: 'LinkLabel' };
            model.addNodeData(mlab);
            // add the marriage link itself, also referring to the label node
            let mdata = {
              from: key,
              to: husband,
              labelKeys: [mlab.key],
              category: 'Marriage',
            };
            model.addLinkData(mdata);
          }
        }
      }
    }
  }

  // process parent-child relationships once all marriages are known
  setupParents(diagram) {
    const model = diagram.model;
    const nodeDataArray = model.nodeDataArray;
    for (let i = 0; i < nodeDataArray.length; i++) {
      const data = nodeDataArray[i];
      const key = data.key;
      const mother = data.m;
      const father = data.f;
      if (mother !== undefined && father !== undefined) {
        const link = this.findMarriage(diagram, mother, father);
        if (link === null) {
          // or warn no known mother or no known father or no known marriage between them
          if (window.console)
            window.console.log(`unknown marriage: ${mother} & ${father}`);
          continue;
        }
        const mdata = link.data;
        const mlabkey = mdata.labelKeys[0];
        const cdata = { from: mlabkey, to: key };
        model.addLinkData(cdata);
      }
    }
  }

  handleSelectedNode(node) {
    this.props.selectedNode(node);
  }

  render() {
    return (
      <div
        id="goJsDiv"
        style={{ width: '100%', height: '600px', backgroundColor: 'white' }}
      />
    );
  }
}

GTree.propTypes = { data: PropTypes.string.isRequired };
GTree.defaultProps = { data: '[]' };
