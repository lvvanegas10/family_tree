/**
 *
 * HomePage
 *
 */

import React from 'react';
import { Image } from 'semantic-ui-react';

import mainImage from 'images/mainImage.jpg';
import GTreePanel from '../GTreePanel/index'

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      < div >
        <Image src={mainImage} fluid />
        <GTreePanel />
      </div >
    );
  }


}

export default HomePage;
