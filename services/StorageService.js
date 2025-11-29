// services/StorageService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const HABITS_KEY = '@MeuDiarioDeHabitos:habits';

// Função para carregar todos os hábitos
export const getHabits = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(HABITS_KEY);
    // Retorna a lista de hábitos ou um array vazio se não houver nada
    return jsonValue != null ? JSON.parse(jsonValue) : []; 
  } catch (e) {
    console.error("Erro ao ler hábitos:", e);
    return [];
  }
};

// Função para salvar a lista completa de hábitos
export const saveHabits = async (habits) => {
  try {
    const jsonValue = JSON.stringify(habits);
    await AsyncStorage.setItem(HABITS_KEY, jsonValue);
  } catch (e) {
    console.error("Erro ao salvar hábitos:", e);
  }
};