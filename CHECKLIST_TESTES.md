# ✅ CHECKLIST DE TESTES MANUAIS

Este documento registra a execução dos testes manuais essenciais para garantir que todas as funcionalidades do projeto "Meu Diário de Hábitos" estão operacionais, conforme os requisitos do trabalho.

| ID | Caso de Teste | Etapas | Resultado Esperado | Status |
| :---: | :--- | :--- | :--- | :---: |
| **01** | **Criação de Hábito (CRUD)** | Abrir o Formulário e criar um novo hábito preenchendo todos os campos. | O novo hábito deve aparecer na `HomeScreen` (`FlatList`) com o título correto. | OK |
| **02** | **Persistência de Dados** | Criar um hábito (ou marcar um existente). Fechar o aplicativo e reiniciar (`npx expo start`). | O hábito criado/marcado deve ser carregado e visível na `HomeScreen` após a reabertura. | OK |
| **03** | **Checklist Diário** | Na `HomeScreen`, clicar no ícone de checklist (quadrado) ao lado de um hábito. | O ícone deve mudar para "marcado" (checkbox) e o título do hábito deve ser riscado, refletindo a conclusão de hoje. | OK |
| **04** | **Edição de Hábito (CRUD)** | Clicar no ícone de lápis em um hábito e alterar o título e/ou a frequência. | As alterações devem ser salvas e refletidas imediatamente na `HomeScreen`. | OK |
| **05** | **Exclusão de Hábito (CRUD)** | Clicar no botão "Excluir Hábito" na `HabitFormScreen` (ou na lixeira na `HomeScreen`). | O hábito deve desaparecer da lista na `HomeScreen` e ser removido do armazenamento. | OK |
| **06** | **Estatísticas de Acompanhamento** | Marcar um ou mais hábitos algumas vezes. Navegar para a `StatsScreen`. | O Total de Conclusões e a Taxa de Sucesso por Hábito devem ser exibidos e calculados corretamente. | OK |
| **07** | **Componente Picker** | Na `HabitFormScreen`, alterar o valor do seletor de Frequência. | O novo valor deve ser salvo corretamente (Diário/Semanal/Mensal). | OK |
| **08** | **Componente Switch** | Na `HabitFormScreen`, ligar e desligar o Switch "Hábito Rígido". | O estado `isStrict` deve ser salvo corretamente como `true` ou `false`. | OK |
