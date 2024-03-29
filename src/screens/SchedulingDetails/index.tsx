import React, { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Alert, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { addDays, format } from 'date-fns';

import { Button } from '../../components/Button';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { StackParamList } from '../../routes/stack.routes';
import { CarDTO } from '../../dots/CarsDTO';

import { api } from '../../service/api';

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

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const { params } = useRoute();
  const { car, dates } = params as Params;
  
  const theme = useTheme();
  const navigation = useNavigation<SchedulingDetailsScreenProp>();

  const [ rentalPeriod, setRentalPeriod ] = useState<RentalPeriod>({} as RentalPeriod);
  const [ isLoading, setIsLoading ] = useState(false);

  const rentTotal = Number(dates.length * car.rent.price);

  async function handleConfirmRental(){
    setIsLoading(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ]

    try{
      await api.post('schedules_byuser', {
        user_id: 1,
        car,
        startDate: format(addDays(new Date(dates[0]), 1), 'yyyy/MM/dd'),
        endDate: format(addDays(new Date(dates[dates.length - 1]), 1), 'yyyy/MM/dd'),
      })

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates
      })
  
      navigation.navigate('SchedulingComplete');
    }catch(error){
      console.log(error);
      setIsLoading(false);
      Alert.alert('Erro ao agendar', 'Ocorreu um erro ao agendar o carro, tente novamente.');
    }
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(addDays(new Date(dates[0]), 1), 'yyyy/MM/dd'),
      end: format(addDays(new Date(dates[dates.length - 1]), 1), 'yyyy/MM/dd'),
    })
  },[])

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={car.photos}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{`R$ ${car.rent.price}`}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory key={accessory.name} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
          ))}
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
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather 
              name="chevron-right"
              size={RFValue(10)}
              color={theme.colors.text}
            />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>
        
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>{`R$ ${rentTotal}`}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          isLoading={isLoading}
          enabled={!isLoading}
          title="Alugar agora" 
          color={theme.colors.success} 
          onPress={handleConfirmRental} 
        />
      </Footer>
    </Container>
  );
};

