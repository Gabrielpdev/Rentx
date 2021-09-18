import React, {useState} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { addDays, format } from 'date-fns';

import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarketDateProps } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';
import { StackParamList } from '../../routes/stack.routes';
import { CarDTO } from '../../dots/CarsDTO';

import { 
  Container, 
  PositionBackButton,
  Header, 
  Title, 
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

type SchedulingScreenProp = NativeStackNavigationProp<StackParamList, 'Home'>;
interface Params {
  car: CarDTO;
}

interface RentalPeriod {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
}

export function Scheduling() {
  const { params } = useRoute();
  const { car } = params as Params;
  
  const theme = useTheme();
  const navigation = useNavigation<SchedulingScreenProp>();

  const [ lastSelectedDate, setLastSelectedDate ] = useState<DayProps>({} as DayProps);
  const [ marketDate, setMarketDate ] = useState<MarketDateProps>({} as MarketDateProps);
  const [ rentalPeriod, setRentalPeriod ] = useState<RentalPeriod>({} as RentalPeriod);

  function handleConfirmRental(){
    if(!rentalPeriod.start || !rentalPeriod.end){
      Alert.alert('Aviso', 'Selecione um período para a locação');
    }else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(marketDate)
      });
    }
  }

  function handleDateChange(date: DayProps){
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp){
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarketDate(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: format(addDays(new Date(firstDate), 1), 'yyyy/MM/dd'),
      endFormatted: format(addDays(new Date(endDate), 1), 'yyyy/MM/dd'),
    })
  }

  return (
    <Container>
      <Header>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <PositionBackButton onPress={() => navigation.goBack()} color={theme.colors.shape} />

        <Title>
          Escolha uma {'\n'}
          data de inicio e {'\n'}
          fim do aluguel
        </Title>
      
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted} >
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={marketDate}
          onDayPress={handleDateChange}
        />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
};
