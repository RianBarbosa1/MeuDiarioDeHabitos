// screens/HomeScreen.js
import React from 'react';
import { 
  View, 
  Text, 
  FlatList, // Componente obrigatório para listas longas
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';
import { useHabits } from '../hooks/useHabits';
import HabitItem from '../components/HabitItem';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  // 1. Usa o hook para ter acesso aos dados e funções CRUD
  const { habits, isLoading, toggleCompletion, deleteHabit } = useHabits();
  
  // Data de hoje no formato YYYY-MM-DD para marcar a conclusão
  const today = new Date().toISOString().slice(0, 10);

  // Função que renderiza cada item na FlatList
  const renderItem = ({ item }) => {
    // Verifica se o hábito está marcado como concluído hoje
    const isCompleted = item.log[today] || false;
    
    return (
      <HabitItem
        habit={item}
        isCompleted={isCompleted}
        onToggle={() => toggleCompletion(item.id)} // Marca/Desmarca
        onEdit={() => navigation.navigate('Form', { habitId: item.id })} // Navega para editar
        onDelete={() => deleteHabit(item.id)} // Deleta (Melhoria: Adicionar Modal de Confirmação depois)
      />
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Carregando Hábitos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 2. FlatList para exibir a lista de hábitos */}
      {habits.length === 0 ? (
        <Text style={styles.emptyText}>👋 Crie seu primeiro hábito diário!</Text>
      ) : (
        <FlatList
          data={habits}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      {/* 3. Floating Action Button (FAB) para Criar Novo Hábito */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('Form', { habitId: null })} 
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
      
      {/* 4. Botão temporário de navegação para Stats (para teste) */}
       <TouchableOpacity 
        style={styles.statsButton} 
        onPress={() => navigation.navigate('Stats')} 
      >
        <Ionicons name="stats-chart" size={24} color="#fff" />
      </TouchableOpacity>
      
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f4f4f4' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    flatListContent: { paddingVertical: 10 },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#7f8c8d' },
    fab: { // Floating Action Button (Adicionar)
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: '#2ecc71',
        borderRadius: 30,
        elevation: 8,
    },
    statsButton: { // Floating Action Button (Estatísticas)
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 100, // Posição acima do FAB de Adicionar
        backgroundColor: '#f39c12',
        borderRadius: 30,
        elevation: 8,
    },
});