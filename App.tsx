import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,  
  Archivo_600SemiBold,  
} from '@expo-google-fonts/archivo';

import {
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter';

import { Home } from './src/screens/Home';
import { CarDetails } from './src/screens/CarDetails';

import theme from './src/styles/theme';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,  
    Archivo_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
  })

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme} >
      <CarDetails />
    </ThemeProvider>
  );
}
