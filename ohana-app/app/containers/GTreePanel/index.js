/**
 *
 * GTreePanel
 *
 */

import React, { Component } from 'react';
import GTree from 'containers/GTree';
import axios from 'axios';
import PropTypes from 'prop-types';

// Style
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import 'antd/lib/message/style/index.less';
import 'antd/lib/form/style/index.less';
import 'antd/lib/input/style/index.less';
import 'antd/lib/button/style/index.less';
import 'antd/lib/spin/style/index.less';

// Semantic
import { Grid } from 'semantic-ui-react';

import DiagramButtons from '../GTree/DiagramButtons';
import NodeDetail from '../GTree/NodeDetail';

const nodeDataArray = [
  {
    key: 0,
    n: 'You',
    s: 'M',
    a: ['#f44336', '#00bcd4', '#ffeb3b', '#8bc34a'],
    date: 'Thu Sep 28 2018 04:17:36 GMT-0500',
  },
];

/* eslint-disable react/prefer-stateless-function */
class GTreePanel extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataT: nodeDataArray,
      selectedNode: 0,
      imgData: null,
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
    this.getImageData = this.getImageData.bind(this);
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
    const { token } = this.props;
    axios
      .put(
        'https://back-p2.herokuapp.com/tree',
        { tree: this.state.dataT },
        {
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            token,
          },
        },
      )
      .then(response => message.info('Tree save'));
  }

  loadTree() {
    const { token } = this.props;
    axios
      .get('https://back-p2.herokuapp.com/tree', {
        headers: {
          token,
        },
      })
      .then(response => {
        if (response.data.trees[0].tree.length > 0) {
          console.log('dfgdfgd');

          this.setState({ dataT: response.data.trees[0].tree });
        } else {
          console.log('new Tree');
          this.setState({ dataT: nodeDataArray });
        }
      })
      .catch(err => {
        console.log(err);
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

  getImageData(data) {
    this.setState({ imgData: data });
  }

  render() {
    return (
      <Grid stackable columns="equal" stretched>
        <Grid.Row>
          <Grid.Column width={4}>
            <Button type="primary">
              <a download="myTree.png" href={this.state.imgData}>
                Download
              </a>
            </Button>
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
            <DiagramButtons
              key="diagramButtons"
              addParents={this.addParents.bind(this)}
              addHusband={this.addHusband.bind(this)}
              addWife={this.addWife.bind(this)}
              addChildren={this.addChildren.bind(this)}
              saveTree={this.saveTree.bind(this)}
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <GTree
              data={this.state.dataT}
              exportTo={this.getImageData}
              selectedNode={this.handleSelectedNode}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default GTreePanel;
