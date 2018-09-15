/**
 *
 * HomePage
 *
 */

import React from 'react';
import { Image } from 'semantic-ui-react';

import GTree from 'containers/GTree';

import mainImage from 'images/mainImage.jpg';


var nodeDataArray = [
  { key: 0, n: "Aaron", s: "M", m: -10, f: -11, ux: 1, a: ["C", "F", "K"], date: "sdasd" },
  { key: 1, n: "Alice", s: "F", m: -12, f: -13, a: ["B", "H", "K"], date: "sdasd" },
  { key: 2, n: "Bob", s: "M", m: 1, f: 0, ux: 3, a: ["C", "H", "L"], date: "sdasd" },
  { key: 3, n: "Barbara", s: "F", a: ["C"] },
  { key: 4, n: "Bill", s: "M", m: 1, f: 0, ux: 5, a: ["E", "H"] },
  { key: 5, n: "Brooke", s: "F", a: ["B", "H", "L"] },
  { key: 6, n: "Claire", s: "F", m: 1, f: 0, a: ["C"] },
]

var nodeDataArray2 = [
  { key: 0, n: "Aaron", s: "M", m: -10, f: -11, ux: 1, a: ["C", "F", "K"], date: "sdasd" },
  { key: 1, n: "Alice", s: "F", m: -12, f: -13, a: ["B", "H", "K"], date: "sdasd" },
  { key: 2, n: "Bob", s: "M", m: 1, f: 0, ux: 3, a: ["C", "H", "L"], date: "sdasd" },
  { key: 3, n: "Barbara", s: "F", a: ["C"] },
  { key: 4, n: "Bill", s: "M", m: 1, f: 0, ux: 5, a: ["E", "H"] },
  { key: 5, n: "Brooke", s: "F", a: ["B", "H", "L"] }
]



/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { dataa: nodeDataArray2 }
  }


  componentDidMount() {
    setInterval(() => this.setState({ dataa: nodeDataArray }), 5000);
    setInterval(() => this.setState({ dataa: nodeDataArray }), 10000);

  }

  render() {

    return (
      < div >
        <Image src={mainImage} fluid />
        <GTree data={this.state.dataa} />
      </div >
    );
  }
}

export default HomePage;
