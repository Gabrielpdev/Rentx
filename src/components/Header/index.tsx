import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';


import Logo from '../../assets/logo.svg';

import { Container, Content, Title } from './styles';

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <Container>
      <Content>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <Logo 
          width={RFValue(108)}
          height={RFValue(12)}
        />
        <Title>{title}</Title>
      </Content>
    </Container>
  );
};

export default Header;
