# 📘 Meu Diário de Hábitos

**Projeto:** Aplicação Mobile desenvolvida para gerenciamento, acompanhamento e persistência de hábitos diários.

**Autor:** Rian Pablo Tavares Barbosa

**Prazo de Entrega:** 01/12/2025

---

## 🎯 Requisitos Funcionais e Técnicos

Este projeto foi construído em **React Native (Expo)** e atende a todos os critérios de avaliação:

### Funcionalidades Essenciais (40%)

| Funcionalidade | Implementação | Observações |
| :--- | :--- | :--- |
| **CRUD de Hábitos** | ✅ Completo | Criar, Visualizar (`FlatList`), Editar e Apagar. |
| **Checklist Diário** | ✅ Completo | Implementado via função `toggleCompletion` no `useHabits`. |
| **Persistência** | ✅ Completo | Utiliza `AsyncStorage` com `useEffect` para salvar e carregar automaticamente. |
| **Estatísticas** | ✅ Completo | Tela `StatsScreen` calcula taxa de sucesso e total de conclusões. |

### Componentes de UI e Técnicos (15%)

| Componente | Uso | Localização |
| :--- | :--- | :--- |
| **FlatList** | Lista os hábitos na `HomeScreen`. | `screens/HomeScreen.js` |
| **ScrollView** | Usado para garantir a rolagem na `StatsScreen` e `HabitFormScreen`. | `screens/StatsScreen.js` |
| **Picker** | Seleção da Frequência do Hábito. | `screens/HabitFormScreen.js` |
| **Switch** | Toggle para Hábito Rígido (`isStrict`). | `screens/HabitFormScreen.js` |
| **Modal** | Implementado via `Alert` nativo para confirmação de exclusão/limpeza de dados. | `screens/SettingsScreen.js` |

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* Node.js e NPM/Yarn.
* App **Expo Go** instalado no seu celular (ou emulador/simulador).

### Passos de Inicialização

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/RianBarbosa1/MeuDiarioDeHabitos
    cd MeuDiarioDeHabitos
    ```

2.  **Instalar dependências:**
    ```bash
    npm install
    ```

3.  **Iniciar o Servidor Expo:**
    ```bash
    npx expo start
    ```

4.  **Visualização:**
    * O comando abrirá o Metro Bundler no terminal.
    * Leia o **QR Code** exibido com o aplicativo **Expo Go** no seu celular para ver o app em tempo real.

---

## 📁 Estrutura do Código (Organização - 20%)

O código está dividido em módulos claros para facilitar a manutenção e o desenvolvimento: