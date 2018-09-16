/**
 *
 * GTree
 *
 */

import React from 'react';
import Tree from 'react-d3-tree';

/* eslint-disable react/prefer-stateless-function */

const myTreeData = [
  {
    name: 'Top Level',
    attributes: {
      keyA: 'val A',
      keyB: 'val B',
      keyC: 'val C',
    },
    children: [
      {
        name: 'Level 2: A',
        attributes: {
          keyA: 'val A',
          keyB: 'val B',
          keyC: 'val C',
        },
      },
      {
        name: 'Level 2: B',
      },
    ],
  },
];

class GTree extends React.Component {
  render() {
    return (
      /* <Tree /> will fill width/height of its container; in this case `#treeWrapper` */
      <div id="treeWrapper">
        <Tree data={myTreeData} orientation="vertical" />
      </div>
    );
  }
}

export default GTree;
