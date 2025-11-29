// screens/HabitFormScreen.js
import React, { useState, useLayoutEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Switch,
  Alert 
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Componente obrigatório
import { useHabits } from '../hooks/useHabits';

const HabitFormScreen = ({ navigation, route }) => {
  // Pega o ID do hábito a ser editado (se houver)
  const habitId = route.params?.habitId;

  // 1. Usa o hook e extrai funções de CRUD e a lista de hábitos
  const { habits, addHabit, editHabit } = useHabits();
  
  // Encontra o hábito original para edição, se o ID foi passado
  const existingHabit = habitId ? habits.find(h => h.id === habitId) : null;

  // 2. Estados para o Formulário
  const [title, setTitle] = useState(existingHabit?.title || '');
  const [frequency, setFrequency] = useState(existingHabit?.frequency || 'Diário');
  const [isStrict, setIsStrict] = useState(existingHabit?.isStrict || false);

  // 3. Configura o cabeçalho (Título da tela e botão de Salvar)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: habitId ? 'Editar Hábito' : 'Novo Hábito',
      headerRight: () => (
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, title, frequency, isStrict, habitId]); // Atualiza quando os estados mudam

  // 4. Lógica de Salvar / Criar / Editar
  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'O título do hábito não pode ser vazio.');
      return;
    }

    const habitData = {
      title,
      frequency,
      isStrict,
    };

    if (habitId) {
      // É EDIÇÃO: Passa o objeto completo e o ID
      const updatedHabit = { ...existingHabit, ...habitData, id: habitId };
      editHabit(updatedHabit);
    } else {
      // É CRIAÇÃO: Adiciona um novo
      addHabit(habitData);
    }

    // Volta para a tela inicial
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título do Hábito:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Beber 2L de água"
        value={title}
        onChangeText={setTitle}
      />

      {/* Seção Frequência (usando Picker - Requisito) */}
      <Text style={styles.label}>Frequência:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={frequency}
          onValueChange={(itemValue) => setFrequency(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Diário" value="Diário" />
          <Picker.Item label="Semanal" value="Semanal" />
          <Picker.Item label="Mensal" value="Mensal" />
        </Picker>
      </View>

      {/* Seção Hábito Rígido (usando Switch - Requisito) */}
      <View style={styles.switchContainer}>
        <Text style={styles.labelSwitch}>Hábito Rígido (Não permite falhas)</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#3498db" }}
          thumbColor={isStrict ? "#2980b9" : "#f4f3f4"}
          onValueChange={setIsStrict}
          value={isStrict}
        />
      </View>
      
      {/* Exibir o botão de Deletar apenas em modo Edição */}
      {habitId && (
        <TouchableOpacity 
            style={styles.deleteButton} 
            // O botão de deletar deve estar na Home, mas é útil aqui
            onPress={() => {
                Alert.alert(
                    "Excluir Hábito",
                    "Tem certeza que deseja excluir este hábito?",
                    [
                        { text: "Cancelar", style: "cancel" },
                        { 
                            text: "Sim, Excluir", 
                            style: "destructive", 
                            onPress: () => {
                                // Redireciona para Home e executa o delete
                                navigation.goBack();
                                // IMPORTANTE: O deleteHabit precisa ser executado na Home,
                                // mas como a função não é passada via prop, vamos assumir que o usuário
                                // fará isso na tela anterior. Para simplificar e manter o requisito
                                // do CRUD, faremos o delete embutido aqui.
                                // Se tivéssemos implementado o contexto, seria mais fácil.
                                // Para fazer o delete sem contexto, precisaríamos importar o deleteHabit
                                // e executá-lo.
                                
                                // Sim, vamos importar e usar para a funcionalidade completa:
                                const { deleteHabit } = useHabits();
                                deleteHabit(habitId);
                            }
                        }
                    ]
                );
            }}
        >
            <Text style={styles.deleteButtonText}>Excluir Hábito</Text>
        </TouchableOpacity>
      )}

    </View>
  );
};
export default HabitFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
    color: '#34495e',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  labelSwitch: {
    fontSize: 16,
    fontWeight: '500',
    color: '#34495e',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: 30,
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});