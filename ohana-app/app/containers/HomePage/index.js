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


var nodeDataArray = [
  { key: 0, n: "Aaron", s: "M", m: -10, f: -11, ux: 1, a: ["J"], date: "sdasd" },
  { key: 1, n: "Alice", s: "F", m: -12, f: -13, a: ["H"], date: "sdasd" },
  { key: 2, n: "Bob", s: "M", m: 1, f: 0, ux: 3, a: ["A"], date: "sdasd" },
  { key: 3, n: "Barbara", s: "F", a: ["C"] },
  { key: 4, n: "Bill", s: "M", m: 1, f: 0, ux: 5, a: ["E"] },
  { key: 5, n: "Brooke", s: "F", a: ["B"] },
  { key: 6, n: "Claire", s: "F", m: 1, a: ["D"] },
]

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      dataT: nodeDataArray,
      selectedNode: 0
    }


    //============================================================================
    // TREE 
    //============================================================================
    this.addFather = this.addFather.bind(this);
    this.addMother = this.addMother.bind(this);
    this.handleSelectedNode = this.handleSelectedNode.bind(this);


  }


  //============================================================================
  // TREE 
  //============================================================================

  addFather() {
    let index = nodeDataArray.findIndex((obj => obj.key == this.state.selectedNode));
    console.log(nodeDataArray[index].name)
    nodeDataArray[index].f = 0;
    this.setState({ dataT: Array.from(nodeDataArray) });
  }
  addMother() {
    nodeDataArray.push({ key: 8, n: "Chloe", s: "F", m: 2, f: 3, a: ["E"] });
    this.setState({ dataT: Array.from(nodeDataArray) });
  }
  addH() {
    nodeDataArray.push({ key: 8, n: "Chloe", s: "F", m: 1, f: 0, vir: 9, a: ["E"] });
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
          onInit={this.addFather.bind(this)}
          onUpdateColor={this.addMother.bind(this)}
          onAddNode={this.addH.bind(this)}
        />,
        <GTree data={this.state.dataT} selectedNode={this.handleSelectedNode} />
      </div >
    );
  }


}

export default HomePage;
