import React, { ReactNode } from 'react';

import Header from '../../components/Header';

import { Container, Title } from './styles';

interface HomeProps {
  children: ReactNode;
}

export function Home() {
  return (
    <Container>
      <Header title="Total de 7 carros" />
    </Container>
  );
};