import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons'

import Car from '../../components/Car';
import { CarDTO } from '../../dots/CarsDTO';
import { Loading } from '../../components/Loading';

import { api } from '../../service/api';

import { 
  Container,
  Header,
  Title,
  Subtitle,
  PositionBackButton,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
interface CarProps{
  car: CarDTO;
  id: string;
  user_id: number;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [ cars, setCars ] = useState<CarProps[]>([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    async function loadCars() {
      try{
        const {data} = await api.get(`/schedules_byuser`, {
          params: {
            user_id: 1
          }
        });
        setCars(data);
        setLoading(false);
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false);
      }
    }

    loadCars();
  },[]);

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

        <Subtitle>
          Conforto, segurança e praticidade
        </Subtitle>
      </Header>


      {loading ? (
        <Loading />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>Agendamentos feitos</AppointmentsQuantity>
          </Appointments>

          <FlatList 
            data={cars}
            keyExtractor={car => car.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign 
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      ) }
    </Container>
  );
};
