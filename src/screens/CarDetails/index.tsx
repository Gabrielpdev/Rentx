import React, { ReactNode } from 'react';
import { StatusBar } from 'react-native';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import speedSVG from '../../assets/speed.svg'
import accelerationSVG from '../../assets/acceleration.svg'
import forceSVG from '../../assets/force.svg'
import gasolineSVG from '../../assets/gasoline.svg'
import exchangeSVG from '../../assets/exchange.svg'
import peopleSVG from '../../assets/people.svg'

import { 
  Container, 
  Header, 
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer,
} from './styles';
import { Button } from '../../components/Button';

interface CarDetailsProps {
  children: ReactNode;
}

export function CarDetails() {
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={['https://www.kindpng.com/picc/m/579-5791907_-t-audi-png-transparent-png.png']}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborgini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380Km/h" icon={speedSVG} />
          <Accessory name="3.2s" icon={accelerationSVG} />
          <Accessory name="800 HP" icon={forceSVG} />
          <Accessory name="Gasolina" icon={gasolineSVG} />
          <Accessory name="Auto" icon={exchangeSVG} />
          <Accessory name="2 Pessoas" icon={peopleSVG} />
        </Accessories> 


        <About>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec euismod, nisi vel consectetur euismod, nisi nisi
          fermentum nisi, euismod euismod nisi nisi euismod.
        </About>
      </Content>

      <Footer>
        <Button title="Confirmar" />
      </Footer>
    </Container>
  );
};

