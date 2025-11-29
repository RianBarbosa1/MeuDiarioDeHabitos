// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa as telas que acabamos de criar
import HomeScreen from '../screens/HomeScreen';
import HabitFormScreen from '../screens/HabitFormScreen';
import StatsScreen from '../screens/StatsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    // O NavigationContainer é o componente raiz da navegação
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        // Estilos para o cabeçalho (melhora a UI/UX, 15% da nota)
        screenOptions={{ 
            headerStyle: { backgroundColor: '#3498db' }, // Cor primária
            headerTintColor: '#fff', // Cor do texto/ícones
            headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Meu Diário de Hábitos' }} />
        <Stack.Screen name="Form" component={HabitFormScreen} options={{ title: 'Gerenciar Hábito' }} />
        <Stack.Screen name="Stats" component={StatsScreen} options={{ title: 'Estatísticas de Acompanhamento' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configurações' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;