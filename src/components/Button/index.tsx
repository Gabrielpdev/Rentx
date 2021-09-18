import React from 'react';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface ButtonProps {
  title: string;
  color?: string;
  onPress: () => void;
  enabled?: boolean;
}

export function Button({ title, color, onPress, enabled = true, ...rest }: ButtonProps) {
  const theme = useTheme();
  return (
    <Container 
      color={color ? color : theme.colors.main} 
      onPress={onPress}
      enabled={enabled}
      style={{ opacity: enabled ? 1 : 0.5 }}
      {...rest}
      >
      <Title>{title}</Title>
    </Container>
  );
};
