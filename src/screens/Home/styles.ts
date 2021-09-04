import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  background-color: ${({theme}) => theme.colors.background_primary};
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: 30px;
`;