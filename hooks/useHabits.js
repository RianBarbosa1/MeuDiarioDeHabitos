// hooks/useHabits.js
import { useState, useEffect } from 'react';
import { getHabits, saveHabits } from '../services/StorageService'; 

export const useHabits = () => {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Efeito 1: Carrega dados na montagem
  useEffect(() => {
    const loadData = async () => {
      const storedHabits = await getHabits();
      setHabits(storedHabits);
      setIsLoading(false);
    };
    loadData();
  }, []); 

  // Efeito 2: Salva dados quando 'habits' muda (Persistência Automática)
  useEffect(() => {
    if (!isLoading) {
      saveHabits(habits);
    }
  }, [habits, isLoading]); 

  // --- Funções CRUD e Acompanhamento ---
  const addHabit = (newHabitData) => {
    const newHabit = {
      id: Date.now(), 
      title: newHabitData.title,
      frequency: newHabitData.frequency || 'Diário',
      isStrict: newHabitData.isStrict || false,
      log: {}, 
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const deleteHabit = (id) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };
  
  const editHabit = (updatedHabit) => {
    setHabits(prev => prev.map(h => 
        h.id === updatedHabit.id ? updatedHabit : h
    ));
  };
  
  const toggleCompletion = (id) => {
    const today = new Date().toISOString().slice(0, 10); 

    setHabits(prev => prev.map(h => {
        if (h.id === id) {
            const isCompleted = h.log[today];
            const newLog = { ...h.log };
            if (isCompleted) {
                delete newLog[today]; 
            } else {
                newLog[today] = true; 
            }
            return { ...h, log: newLog };
        }
        return h;
    }));
  };

  const getCompletionCount = (id) => {
      const habit = habits.find(h => h.id === id);
      if (!habit) return 0;
      return Object.keys(habit.log).length;
  }

  return { 
    habits, 
    isLoading, 
    addHabit, 
    editHabit, 
    deleteHabit, 
    toggleCompletion, 
    getCompletionCount 
  };
};