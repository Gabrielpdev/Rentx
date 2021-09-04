import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 113px;
  background-color: ${({theme}) => theme.colors.header};
  
  justify-content: flex-end;
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 32px 24px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.text};

  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
`;
