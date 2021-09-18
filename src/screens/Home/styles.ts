import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { CarDTO } from '../../dots/CarsDTO';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;

  background-color: ${({theme}) => theme.colors.background_primary};
`;

export const CarList = styled(FlatList as new () => FlatList<CarDTO>).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})`
`;

export const MyCarsButton = styled(RectButton)`
  width: 60px;
  height: 60px;
  
  justify-content: center;
  align-items: center;

  background-color: ${({theme}) => theme.colors.main};

  border-radius: 30px;

  position: absolute;
  bottom: 15px;
  right: 22px;
`;
