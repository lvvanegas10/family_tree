/**
 *
 * GTreePanel
 *
 */

import React, { Component } from 'react';
import GTree from 'containers/GTree';
import axios from 'axios';
import DiagramButtons from '../GTree/DiagramButtons';
import NodeDetail from '../GTree/NodeDetail';

const nodeDataArray = [
  {
    key: 0,
    n: 'You',
    s: 'F',
    a: ['#f44336', '#00bcd4', '#ffeb3b', '#8bc34a'],
    date: 'Thu Sep 28 2018 04:17:36 GMT-0500',
  },
];

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJVU0VSX1JPTEUiLCJzdGF0ZSI6dHJ1ZSwiZ29vZ2xlIjpmYWxzZSwiX2lkIjoiNWI5ZWJlZWYxY2MxOWIzMTg4NWE3MjRjIiwibmFtZSI6IkxhdXJhIiwiZW1haWwiOiJ2YUBjbyIsIl9fdiI6MH0sImlhdCI6MTUzNzEzMDIzMSwiZXhwIjoxNTM3MTMyODIzfQ.laAUJGOvzP7pUOOb-4cNThDFtuNg33jvDcc2pFwT3xY';

/* eslint-disable react/prefer-stateless-function */
class GTreePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataT: nodeDataArray,
      selectedNode: 0,
    };

    this.addParents = this.addParents.bind(this);
    this.addHusband = this.addHusband.bind(this);
    this.addWife = this.addWife.bind(this);
    this.addChildren = this.addChildren.bind(this);
    this.saveTree = this.saveTree.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSexChange = this.handleSexChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSelectedNode = this.handleSelectedNode.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.loadTree = this.loadTree.bind(this);
  }

  componentDidMount() {
    this.loadTree();
  }

  addParents() {
    const index = nodeDataArray.findIndex(
      obj => obj.key === this.state.selectedNode,
    );
    const keyNew = nodeDataArray[nodeDataArray.length - 1].key + 100;
    nodeDataArray.push({
      key: keyNew,
      n: 'Father',
      s: 'M',
      ux: keyNew + 1,
      date: 'Thu Sep 28 2018 04:17:36 GMT-0500',
    });
    nodeDataArray.push({
      key: keyNew + 1,
      n: 'Mother',
      s: 'F',
      date: 'Thu Sep 28 2018 04:17:36 GMT-0500',
    });
    nodeDataArray[index].f = keyNew;
    nodeDataArray[index].m = keyNew + 1;
    this.setState({ dataT: Array.from(nodeDataArray) });
  }

  addHusband() {
    const index = nodeDataArray.findIndex(
      obj => obj.key === this.state.selectedNode,
    );
    const keyNew = nodeDataArray[nodeDataArray.length - 1].key + 100;
    nodeDataArray.push({
      key: keyNew,
      n: 'Husband',
      s: 'M',
      ux: nodeDataArray[index].key,
      date: 'Thu Sep 28 2018 04:17:36 GMT-0500',
    });
    nodeDataArray[index].vir = keyNew;
    this.setState({ dataT: Array.from(nodeDataArray) });
  }
  addWife() {
    const index = nodeDataArray.findIndex(
      obj => obj.key === this.state.selectedNode,
    );
    const keyNew = nodeDataArray[nodeDataArray.length - 1].key + 100;
    nodeDataArray.push({
      key: keyNew,
      n: 'Wife',
      s: 'F',
      vir: nodeDataArray[index].key,
      date: 'Thu Sep 28 2018 04:17:36 GMT-0500',
    });
    nodeDataArray[index].ux = keyNew;
    this.setState({ dataT: Array.from(nodeDataArray) });
  }

  addChildren() {
    const index = nodeDataArray.findIndex(
      obj => obj.key === this.state.selectedNode,
    );
    const keyNew = nodeDataArray[nodeDataArray.length - 1].key + 100;

    console.log(`${nodeDataArray[index].ux}ooooo`);
    console.log(`${nodeDataArray[index].vir}oooo`);

    if (nodeDataArray[index].ux !== undefined)
      nodeDataArray.push({
        key: keyNew,
        n: 'Child',
        s: 'F',
        f: nodeDataArray[index].key,
        m: nodeDataArray[index].ux,
        date: 'Thu Sep 28 2018 04:17:36 GMT-0500',
      });
    else if (nodeDataArray[index].vir !== undefined)
      nodeDataArray.push({
        key: keyNew,
        n: 'Child',
        s: 'F',
        m: nodeDataArray[index].key,
        f: nodeDataArray[index].vir,
        date: 'Thu Sep 28 2018 04:17:36 GMT-0500',
      });

    this.setState({ dataT: Array.from(nodeDataArray) });
  }

  saveTree() {
    console.log('Saving...');
    axios
      .put(
        'http://localhost:3001/tree',
        { tree: this.state.dataT },
        {
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            token,
          },
        },
      )
      .then(response => console.log(response));
  }

  loadTree() {
    axios
      .get('http://localhost:3001/tree', {
        headers: {
          token,
        },
      })
      .then(response => {
        console.log(response.data.trees[0].tree);
        if (response.data.trees[0].tree.length > 0) {
          console.log('You have already a Tree');
          this.setState({ dataT: response.data.trees[0].tree });
        } else {
          console.log('new Tree');

          this.setState({ dataT: nodeDataArray });
        }
      });
  }

  getSelectedNode() {
    const index = nodeDataArray.findIndex(
      obj => obj.key === this.state.selectedNode,
    );
    return nodeDataArray[index];
  }

  handleNameChange(name) {
    const index = nodeDataArray.findIndex(
      obj => obj.key === this.state.selectedNode,
    );
    nodeDataArray[index].n = name;
    this.setState({ dataT: Array.from(nodeDataArray) });
  }

  handleSexChange(sex) {
    const index = nodeDataArray.findIndex(
      obj => obj.key === this.state.selectedNode,
    );
    nodeDataArray[index].s = sex;
    this.setState({ dataT: Array.from(nodeDataArray) });
  }

  handleDateChange(date) {
    const index = nodeDataArray.findIndex(
      obj => obj.key === this.state.selectedNode,
    );
    nodeDataArray[index].date = date;
    this.setState({ dataT: Array.from(nodeDataArray) });
  }

  handleColorChange(color) {
    const index = nodeDataArray.findIndex(
      obj => obj.key === this.state.selectedNode,
    );
    nodeDataArray[index].a = [color];
    this.setState({ dataT: Array.from(nodeDataArray) });
  }

  handleSelectedNode(node) {
    this.setState({ selectedNode: node });
  }

  render() {
    return (
      <div>
        <DiagramButtons
          key="diagramButtons"
          addParents={this.addParents.bind(this)}
          addHusband={this.addHusband.bind(this)}
          addWife={this.addWife.bind(this)}
          addChildren={this.addChildren.bind(this)}
          saveTree={this.saveTree.bind(this)}
        />
        <NodeDetail
          actualNode={
            nodeDataArray[
              nodeDataArray.findIndex(
                obj => obj.key === this.state.selectedNode,
              )
            ]
          }
          onNameChange={this.handleNameChange}
          onSexChange={this.handleSexChange}
          onDateChange={this.handleDateChange}
          onColorChange={this.handleColorChange}
        />
        <GTree data={this.state.dataT} selectedNode={this.handleSelectedNode} />
      </div>
    );
  }
}

export default GTreePanel;
