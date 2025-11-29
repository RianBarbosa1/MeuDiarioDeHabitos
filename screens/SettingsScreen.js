// screens/SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useHabits } from '../hooks/useHabits'; // Importamos para forçar um recarregamento se necessário

const SettingsScreen = ({ navigation }) => {
    // Usamos o hook, mas principalmente para a função de recarregar
    const { habits } = useHabits(); 

    const handleClearData = async () => {
        Alert.alert(
            "Limpar Todos os Dados?",
            "Esta ação é irreversível e apagará todos os seus hábitos e registros.",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Limpar Dados", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            // Limpa o AsyncStorage
                            await AsyncStorage.clear();
                            
                            // Força a navegação para Home para recarregar o estado
                            navigation.popToTop(); // Volta para o topo da stack
                            
                            // Exibe a mensagem de sucesso
                            Alert.alert("Sucesso", "Todos os dados foram limpos.");
                        } catch (e) {
                            Alert.alert("Erro", "Falha ao limpar os dados.");
                            console.error("Erro ao limpar dados:", e);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Opções do Aplicativo</Text>
            
            {/* Opção 1: Limpar Dados (Útil para testes e robustez) */}
            <TouchableOpacity 
                style={styles.settingItem} 
                onPress={handleClearData}
            >
                <View style={styles.itemContent}>
                    <Ionicons name="trash-outline" size={24} color="#e74c3c" />
                    <Text style={styles.settingText}>Limpar Todos os Hábitos</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
            </TouchableOpacity>
            
            {/* Opção 2: Sobre */}
            <TouchableOpacity 
                style={styles.settingItem} 
                onPress={() => Alert.alert("Sobre", "Meu Diário de Hábitos v1.0\nDesenvolvido com React Native e Expo.")}
            >
                <View style={styles.itemContent}>
                    <Ionicons name="information-circle-outline" size={24} color="#3498db" />
                    <Text style={styles.settingText}>Sobre o Aplicativo</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
            </TouchableOpacity>

            <Text style={styles.versionText}>Versão: 1.0.0</Text>
        </View>
    );
};
export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f4f4f4',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        color: '#2c3e50',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ecf0f1',
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingText: {
        fontSize: 16,
        marginLeft: 15,
        color: '#34495e',
    },
    versionText: {
        textAlign: 'center',
        marginTop: 40,
        color: '#bdc3c7',
        fontSize: 12,
    }
});