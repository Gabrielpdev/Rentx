import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface ButtonProps {
  title: string;
  color?: string;
  onPress: () => void;
  enabled?: boolean;
  isLoading?: boolean;
}

export function Button({ title, color, onPress, enabled = true, isLoading = false, ...rest }: ButtonProps) {
  const theme = useTheme();
  return (
    <Container 
      color={color ? color : theme.colors.main} 
      onPress={onPress}
      enabled={enabled}
      style={{ opacity: (!enabled || isLoading) ? 0.5 : 1 }}
      {...rest}
      >
      {isLoading ? <ActivityIndicator color={theme.colors.shape} /> : <Title>{title}</Title>}
    </Container>
  );
};
