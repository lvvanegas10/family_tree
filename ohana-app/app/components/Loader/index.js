/**
 *
 * Loader
 *
 */

import React from 'react';
import { Loader as SemanticLoader, Image } from 'semantic-ui-react';
import Logo from 'images/main-icon.png';
import styled from 'styled-components';

const BrandLogo = styled.div`
  width: 260px;
`;

const Container = styled.div`
  position: fixed !important;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  background-color: #fff;
`;

const LoaderIndicator = styled(SemanticLoader)`
  display: block !important;
  position: relative !important;
  top: auto !important;
  left: auto !important;
  right: auto !important;
  bottom: auto !important;
  transform: none !important;
  margin: 40px !important;
`;

const Loader = () => (
  <Container>
    <BrandLogo>
      <Image src={Logo} alt="Main Logo" />
    </BrandLogo>
    <LoaderIndicator size="big" />
  </Container>
);

export default Loader;
