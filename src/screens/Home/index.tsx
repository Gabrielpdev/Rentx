import React, { useEffect, useState }  from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'

import { StackParamList } from '../../routes/stack.routes';

import Header from '../../components/Header';
import Car from '../../components/Car';

import { Container, CarList, MyCarsButton } from './styles';
import { api } from '../../service/api';

import { CarDTO } from '../../dots/CarsDTO';
import { Loading } from '../../components/Loading';
import theme from '../../styles/theme';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';
import { BackHandler, StyleSheet } from 'react-native';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

type homeScreenProp = NativeStackNavigationProp<StackParamList, 'Home'>;

export function Home() {
  const navigation = useNavigation<homeScreenProp>();
  
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  })
  const MyCarButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: positionX.value},
        {translateY: positionY.value}
      ]
    }
  })

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
  },[])

  return (
    <Container>
      <Header title={!loading && `Total de ${cars.length} carros`} />

      {loading ? (
        <Loading />
      ) : (
        <CarList 
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
        />
      )}

      <PanGestureHandler
        onGestureEvent={onGestureEvent}
      >
        <Animated.View
          style={[
            MyCarButtonAnimatedStyle,
            styles.button
          ]}
        >
          <ButtonAnimated 
            onPress={handleOpenMyCars}
          >
            <Ionicons 
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    
    justifyContent: 'center',
    alignItems: 'center',
  
    backgroundColor: theme.colors.main,
  
    borderRadius: 30,
  
    position: 'absolute',
    bottom: 15,
    right: 22,
  }
})