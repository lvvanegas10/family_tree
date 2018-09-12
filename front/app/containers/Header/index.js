/**
 *
 * Header
 *
 */

import React from 'react';
import {Grid, Image} from 'semantic-ui-react';
import mainIcon from 'images/main-icon.png';
/* eslint-disable react/prefer-stateless-function */
export class Header extends React.Component {
  render() {
    return (
      <div>
        <Grid className="header">
          <Grid.Column textAlign='center' floated='left' width={2}>
            <Image src={mainIcon} size='small'/>
          </Grid.Column>
          <Grid.Column textAlign='center' floated='right' width={5}>
            Sign In
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
/*
// <header className="d-flex flex-row">
//   <div className="p-2">
//     <h1 className="mainTitle"> Ohana </h1>
//   </div>
//   <div className="p-2">
//     <h1 className="mainTitle"> Ohana </h1>
//   </div>
// </header>
*/
export default Header;
