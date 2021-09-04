import React, { ReactNode } from 'react';

import { Text } from 'react-native';

import { 
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CatImage,
 } from './styles';

import GasolineSVG from '../../assets/gasoline.svg';

interface CarData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
}

interface CarProps {
  data: CarData;
}

function Car({ data }: CarProps) {
  return (
    <Container>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSVG />
          </Type>
        </About>
      </Details>

      <CatImage source={{ uri: data.thumbnail}} resizeMode="contain" />
    </Container>
  );
};

export default Car;
