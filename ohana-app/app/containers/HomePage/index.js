/**
 *
 * HomePage
 *
 */

import React from 'react';
import { Image } from 'semantic-ui-react';

import GTree from 'containers/GTree';

import mainImage from 'images/mainImage.jpg';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <Image src={mainImage} fluid />
        <GTree />
      </div>
    );
  }
}

export default HomePage;
