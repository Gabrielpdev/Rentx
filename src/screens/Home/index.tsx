import React, { ReactNode } from 'react';

import Header from '../../components/Header';
import Car from '../../components/Car';

import { Container, CarList } from './styles';

interface HomeProps {
  children: ReactNode;
}

export function Home() {
  const carData = {
    brand: 'Ford',
    name: 'Fiesta',
    rent: {
      period: 'Ao dia',
      price: 10.000,
    },
    thumbnail: 'https://www.kindpng.com/picc/m/579-5791907_-t-audi-png-transparent-png.png'
  }

  return (
    <Container>
      <Header title="Total de 7 carros" />

      <CarList 
        data={[1,2,3,4,5,6]}
        keyExtractor={(item) => String(item)}
        renderItem={() => <Car data={carData} />}
      />
    </Container>
  );
};