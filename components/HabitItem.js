// components/HabitItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// Certifique-se de ter os ícones instalados: expo install @expo/vector-icons
import { Ionicons } from '@expo/vector-icons'; 

const HabitItem = ({ habit, isCompleted, onToggle, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      {/* Botão de Check/Toggle */}
      <TouchableOpacity onPress={onToggle} style={styles.checkButton}>
        <Ionicons 
          name={isCompleted ? "checkbox-outline" : "square-outline"} 
          size={30} 
          color={isCompleted ? "#2ecc71" : "#7f8c8d"} 
        />
      </TouchableOpacity>
      
      {/* Título do Hábito */}
      <Text style={[styles.title, isCompleted && styles.completedTitle]}>
        {habit.title}
      </Text>

      {/* Ações (Editar e Apagar) */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(habit.id)} style={styles.actionButton}>
          <Ionicons name="create-outline" size={24} color="#3498db" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(habit.id)} style={styles.actionButton}>
          <Ionicons name="trash-outline" size={24} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    checkButton: {
        marginRight: 15,
    },
    title: {
        flex: 1,
        fontSize: 18,
    },
    completedTitle: {
        textDecorationLine: 'line-through',
        color: '#7f8c8d',
    },
    actions: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: 15,
    }
});
export default HabitItem;