/**
 *
 * HomePage
 *
 */

import React from 'react';
import { Image } from 'semantic-ui-react';

import GTree from 'containers/GTree';

import mainImage from 'images/mainImage.jpg';

//============================================================================
// TREE 
//============================================================================
import DiagramButtons from '../GTree/DiagramButtons';
import NodeDetail from '../GTree/NodeDetail';
import { throws } from 'assert';

var nodeDataArray = [
  { key: 0, n: "You", s: "F", a: ["J"], date: "Thu Sep 28 2018 04:17:36 GMT-0500" }
]

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      dataT: nodeDataArray,
      selectedNode: 0,
    }


    //============================================================================
    // TREE 
    //============================================================================

    this.addParents = this.addParents.bind(this);
    this.addHusband = this.addHusband.bind(this);
    this.addWife = this.addWife.bind(this);
    this.addChildren = this.addChildren.bind(this);
    this.saveTree = this.saveTree.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSexChange = this.handleSexChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSelectedNode = this.handleSelectedNode.bind(this);

  }


  //============================================================================
  // TREE 
  //============================================================================

  addParents() {
    let index = nodeDataArray.findIndex((obj => obj.key == this.state.selectedNode));
    let keyNew = nodeDataArray[nodeDataArray.length - 1].key + 100
    nodeDataArray.push({ key: keyNew, n: "Father", s: "M", ux: keyNew + 1 });
    nodeDataArray.push({ key: keyNew + 1, n: "Mother", s: "F" });
    nodeDataArray[index].f = keyNew;
    nodeDataArray[index].m = keyNew + 1;
    this.setState({ dataT: Array.from(nodeDataArray) });
  }

  addHusband() {
    let index = nodeDataArray.findIndex((obj => obj.key == this.state.selectedNode));
    let keyNew = nodeDataArray[nodeDataArray.length - 1].key + 100
    nodeDataArray.push({ key: keyNew, n: "Husband", s: "M", ux: nodeDataArray[index].key });
    nodeDataArray[index].vir = keyNew;
    this.setState({ dataT: Array.from(nodeDataArray) });
  }
  addWife() {
    let index = nodeDataArray.findIndex((obj => obj.key == this.state.selectedNode));
    let keyNew = nodeDataArray[nodeDataArray.length - 1].key + 100
    nodeDataArray.push({ key: keyNew, n: "Wife", s: "F", vir: nodeDataArray[index].key });
    nodeDataArray[index].ux = keyNew;
    this.setState({ dataT: Array.from(nodeDataArray) });
  }

  addChildren() {
    let index = nodeDataArray.findIndex((obj => obj.key == this.state.selectedNode));
    let keyNew = nodeDataArray[nodeDataArray.length - 1].key + 100

    console.log(nodeDataArray[index].ux + 'ooooo');
    console.log(nodeDataArray[index].vir + 'oooo');

    if (nodeDataArray[index].ux !== undefined)
      nodeDataArray.push({ key: keyNew, n: "Child", s: "F", f: nodeDataArray[index].key, m: nodeDataArray[index].ux });
    else if (nodeDataArray[index].vir !== undefined)
      nodeDataArray.push({ key: keyNew, n: "Child", s: "F", m: nodeDataArray[index].key, f: nodeDataArray[index].vir });

    this.setState({ dataT: Array.from(nodeDataArray) });
  }

  saveTree() {

  }

  getSelectedNode() {
    let index = nodeDataArray.findIndex((obj => obj.key == this.state.selectedNode));
    return nodeDataArray[index];
  }

  handleNameChange(name) {
    let index = nodeDataArray.findIndex((obj => obj.key == this.state.selectedNode));
    nodeDataArray[index].n = name;
    this.setState({ dataT: Array.from(nodeDataArray) });
  }

  handleSexChange(sex) {
    let index = nodeDataArray.findIndex((obj => obj.key == this.state.selectedNode));
    nodeDataArray[index].s = sex;
    this.setState({ dataT: Array.from(nodeDataArray) });
  }

  handleDateChange(date) {
    let index = nodeDataArray.findIndex((obj => obj.key == this.state.selectedNode));
    nodeDataArray[index].date = date;
    this.setState({ dataT: Array.from(nodeDataArray) });
  }

  handleSelectedNode(node) {
    this.setState({ selectedNode: node });
  }
  //============================================================================

  render() {

    return (
      < div >
        <Image src={mainImage} fluid />

        <DiagramButtons
          key="diagramButtons"
          addParents={this.addParents.bind(this)}
          addHusband={this.addHusband.bind(this)}
          addWife={this.addWife.bind(this)}
          addChildren={this.addChildren.bind(this)}
          saveTree={this.saveTree.bind(this)}
        />,
        <NodeDetail
          actualNode={nodeDataArray[nodeDataArray.findIndex((obj => obj.key == this.state.selectedNode))]}
          onNameChange={this.handleNameChange}
          onSexChange={this.handleSexChange}
          onDateChange={this.handleDateChange}
        />
        <GTree data={this.state.dataT} selectedNode={this.handleSelectedNode} />
      </div >
    );
  }


}

export default HomePage;
