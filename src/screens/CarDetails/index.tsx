import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

type CarDetailsScreenProp = NativeStackNavigationProp<StackParamList, 'Home'>;

import { 
  Container, 
  Header, 
  CarImages,
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
import { StackParamList } from '../../routes/stack.routes';
import { CarDTO } from '../../dots/CarsDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const theme = useTheme();
  const { params } = useRoute();
  const scrollY = useSharedValue(0);
  const navigation = useNavigation<CarDetailsScreenProp>();
  
  const { car } = params as Params;

  function handleConfirmRental(){
    navigation.navigate('Scheduling', { car });
  }
  
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle( () => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 80],
        Extrapolate.CLAMP
      )
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle( () => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          {
            backgroundColor: theme.colors.background_secondary
          }
        ]}
      >
        <Header>
          <BackButton onPress={() => navigation.goBack()} />
        </Header>

        <Animated.View
          style={sliderCarsStyleAnimation}
        >
          <CarImages>
            <ImageSlider 
              imagesUrl={car.photos}
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
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
            <Accessory 
              key={accessory.type} 
              name={accessory.name} 
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories> 
        
        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button title="Escolher periodo do aluguel" onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  }
})

