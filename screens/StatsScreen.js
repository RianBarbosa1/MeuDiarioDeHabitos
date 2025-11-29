// screens/StatsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useHabits } from '../hooks/useHabits';
import { Ionicons } from '@expo/vector-icons';

// Componente para exibir o card de estatística
const StatCard = ({ title, value, unit, icon, color }) => (
  <View style={styles.statCard}>
    <Ionicons name={icon} size={30} color={color} />
    <Text style={styles.statValue}>{value}{unit}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

const StatsScreen = () => {
  const { habits } = useHabits();

  // 1. Cálculo de Estatísticas Globais
  const totalHabits = habits.length;
  
  const calculateTotalCompletions = () => {
    let total = 0;
    habits.forEach(h => {
        // O número de chaves no log é o número de vezes que foi concluído
        total += Object.keys(h.log).length;
    });
    return total;
  };
  
  const totalCompletions = calculateTotalCompletions();

  // 2. Pré-processamento das Estatísticas por Hábito
  const habitStats = habits.map(h => {
    const completionCount = Object.keys(h.log).length;
    const daysSinceCreation = Math.ceil((Date.now() - h.id) / (1000 * 60 * 60 * 24)) || 1; // Dias desde a criação
    
    // Cálculo de taxa de sucesso (Requisito: Estatísticas de acompanhamento)
    const successRate = Math.round((completionCount / daysSinceCreation) * 100);

    return {
      id: h.id,
      title: h.title,
      completionCount,
      successRate: isNaN(successRate) ? 0 : successRate,
      daysSinceCreation,
    };
  });
  
  // Renderiza o card de estatística de cada hábito
  const renderHabitStat = ({ item }) => (
    <View style={styles.habitStatItem}>
      <Text style={styles.habitTitle}>{item.title}</Text>
      <View style={styles.statRow}>
        <Text style={styles.statText}>Concluído: </Text>
        <Text style={styles.statResult}>{item.completionCount} vezes</Text>
      </View>
      <View style={styles.statRow}>
        <Text style={styles.statText}>Taxa de Sucesso: </Text>
        <Text style={[styles.statResult, { color: item.successRate > 70 ? '#2ecc71' : '#f39c12' }]}>
          {item.successRate}%
        </Text>
      </View>
    </View>
  );


  if (totalHabits === 0) {
    return (
        <View style={styles.loadingContainer}>
            <Text style={styles.emptyText}>Crie hábitos para ver suas estatísticas aqui!</Text>
        </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>Resumo Geral</Text>
      
      <View style={styles.globalStatsContainer}>
        <StatCard 
          title="Total de Hábitos" 
          value={totalHabits} 
          unit="" 
          icon="list" 
          color="#3498db" 
        />
        <StatCard 
          title="Total de Conclusões" 
          value={totalCompletions} 
          unit="" 
          icon="checkmark-done-circle" 
          color="#2ecc71" 
        />
      </View>

      <Text style={styles.sectionHeader}>Estatísticas por Hábito</Text>
      
      {/* ScrollView/FlatList para exibir estatísticas por hábito */}
      <FlatList
        data={habitStats}
        renderItem={renderHabitStat}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false} // Desabilita o scroll interno para o scroll do ScrollView pai funcionar
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      
    </ScrollView>
  );
};
export default StatsScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f4f4f4', padding: 10 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#7f8c8d' },
    
    // Estilos para o resumo global
    sectionHeader: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginTop: 15, 
        marginBottom: 10,
        marginLeft: 5,
        color: '#2c3e50',
    },
    globalStatsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    statCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '48%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#2c3e50',
    },
    statTitle: {
        fontSize: 14,
        color: '#7f8c8d',
        marginTop: 5,
    },
    
    // Estilos para estatísticas individuais
    habitStatItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    habitTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#34495e',
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 3,
    },
    statText: {
        fontSize: 15,
        color: '#7f8c8d',
    },
    statResult: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2c3e50',
    }
});