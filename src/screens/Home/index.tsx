import React, { useEffect, useState }  from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StackParamList } from '../../routes/stack.routes';

import Header from '../../components/Header';
import Car from '../../components/Car';

import { Container, CarList } from './styles';
import { api } from '../../service/api';

import { CarDTO } from '../../dots/CarsDTO';
import { Loading } from '../../components/Loading';

type homeScreenProp = NativeStackNavigationProp<StackParamList, 'Home'>;

export function Home() {
  const navigation = useNavigation<homeScreenProp>();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(false);

  function handleCarDetails() {
    navigation.navigate('CarDetails');
  }

  useEffect(() => {
    async function loadCars(){
      setLoading(true);
      try{
        const { data } = await api.get('/cars')
        setCars(data);
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false);
      }
    }

    loadCars();
  },[])

  return (
    <Container>
      <Header title="Total de 7 carros" />

      {loading ? (
        <Loading />
      ) : (
        <CarList 
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Car data={item} onPress={handleCarDetails} />}
        />
      )}
    </Container>
  );
};