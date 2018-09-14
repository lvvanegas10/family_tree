/**
 *
 * HomePage
 *
 */

import React from 'react';
import { Image } from 'semantic-ui-react';

import Tree from 'containers/Tree';

import mainImage from 'images/mainImage.jpg';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <Image src={mainImage} fluid />
        <Tree />
      </div>
    );
  }
}

export default HomePage;
