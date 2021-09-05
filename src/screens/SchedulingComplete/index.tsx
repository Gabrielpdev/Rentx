import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, useWindowDimensions } from 'react-native';

import { ConfirmButton } from '../../components/ConfirmButton';
import { StackParamList } from '../../routes/stack.routes';

import { 
  Container,
  Content,
  Title,
  Message,
  Footer,
} from './styles';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

type SchedulingCompleteScreenProp = NativeStackNavigationProp<StackParamList, 'Home'>;

export function SchedulingComplete() {
  const navigation = useNavigation<SchedulingCompleteScreenProp>();
  const { width } = useWindowDimensions();

  function handleConfirmRental(){
    navigation.navigate('Home');
  }


  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LogoSvg 
        width={width}
      />

      <Content>
        <DoneSvg 
          width={80}
          height={80}
        />

        <Title>Carro alugado !</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </Message>

      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
};