import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons'

import { Button } from '../../components/Button';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import speedSVG from '../../assets/speed.svg'
import accelerationSVG from '../../assets/acceleration.svg'
import forceSVG from '../../assets/force.svg'
import gasolineSVG from '../../assets/gasoline.svg'
import exchangeSVG from '../../assets/exchange.svg'
import peopleSVG from '../../assets/people.svg'

import { StackParamList } from '../../routes/stack.routes';

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
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateTitle,
  DateInfo,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';

type SchedulingDetailsScreenProp = NativeStackNavigationProp<StackParamList, 'Home'>;


export function SchedulingDetails() {
  const theme = useTheme();
  const navigation = useNavigation<SchedulingDetailsScreenProp>();

  function handleConfirmRental(){
    navigation.navigate('SchedulingComplete');
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
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
      
        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>10/10/2020</DateValue>
          </DateInfo>

          <Feather 
              name="chevron-right"
              size={RFValue(10)}
              color={theme.colors.text}
            />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>10/10/2020</DateValue>
          </DateInfo>
        </RentalPeriod>
        
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button title="Alugar agora" color={theme.colors.success} onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
};

