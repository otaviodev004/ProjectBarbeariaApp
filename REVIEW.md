# Code Review — ProjectBarbeariaApp (React Native)

## Visão Geral
Aplicativo móvel de barbearia feito em React Native. O repositório inclui pastas `app/`, `assets/` e `src/`. A proposta aparenta ser agenda/portfólio/contato (inferido pela estrutura), ainda sem documentação de execução ou arquitetura detalhada.

## Pontos Fortes
- Base em **React Native** com **TypeScript**.
- Estrutura separando `assets` e código-fonte de aplicação.
- **ESLint** presente (`eslint.config.js`) — bom ponto de partida para padronização.

## Top 10 Recomendações (prioridade)
1. **Documentação de execução**: atualizar `README.md` com requisitos (Node/Expo/CLI), scripts, como rodar em Android/iOS/Web e variáveis de ambiente.
2. **Navegação**: adotar `@react-navigation/*` com estrutura de **stacks/tabs** e tipagem `ParamList`.
3. **Camada de serviços HTTP**: centralizar API (Axios/Fetch) com **interceptors** e tratamento unificado de erros.
4. **Gerência de estado**: para estados globais simples, usar **Zustand**; para cache de dados de servidor, **React Query**.
5. **Componentização/Design System**: criar `src/components` com botões, inputs, cards e **tokens de tema** (cores/spacing/tipografia).
6. **Acessibilidade (A11y)**: `accessibilityLabel`, `role`, `testID`, tamanho mínimo de toque, contraste e foco de navegação.
7. **Formulários**: `react-hook-form` + `zod` para validação tipada (ex.: agendamento/contato/login).
8. **Listas e performance**: usar `FlatList/SectionList` com `keyExtractor`, `getItemLayout`, `memo`, `useCallback` e `useMemo`.
9. **Env & Segurança**: `react-native-config` para chaves/URLs; nunca commitar segredos; incluir `.env.example`.
10. **Testes e CI**: **Jest + Testing Library**; **GitHub Actions** com lint + test + build e (opcional) deploy.

## Arquitetura sugerida
```
src/
  app/                # telas/fluxos (Home, Agenda, Serviços, Perfil)
  components/         # UI compartilhada (Button, Input, Card, Avatar)
  hooks/              # hooks customizados (useAuth, useTheme)
  services/
    api/              # cliente http (axios) + interceptors
    storage/          # AsyncStorage/Keychain
  state/              # Zustand stores (auth, agenda)
  styles/             # tema/tokens (colors, spacing, typography)
  utils/              # formatadores, máscaras, helpers
  navigation/         # stacks/tabs + tipos
  i18n/               # internacionalização (pt/en)
```

## Boas Práticas Específicas
- **Imagens**: otimizar tamanhos, usar `resizeMode`, evitar PNGs grandes; preferir **SVG** para ícones (`react-native-svg`).
- **Aparência nativa**: `StatusBar`, `SafeAreaView` e feedback tátil (`expo-haptics`) onde fizer sentido.
- **Erros globais**: **Error Boundary** com fallback amigável; **toasts** para feedback (`react-native-toast-message`).
- **Internacionalização**: `i18next` ou `expo-localization` + arquivos de tradução.
- **Qualidade de código**: regras do ESLint para imports/complexidade; Prettier para formatação consistente.
- **Acompanhamento**: criar **Issues** e **Projects** com cada melhoria como tarefa.

## Testes (sugestão mínima)
- **Unitários**: 1 componente (ex.: `Button`), 1 hook (`useAuth`) e 1 serviço (`api`).
- **Integração/E2E leve**: fluxo de navegação básico (abrir tela, enviar formulário mockado).

## CI/CD
- **GitHub Actions**: workflow com `npm ci`, `npm run lint`, `npm test`, `npm run build`.
- **Dependabot** e **CodeQL** ativados (Security → code scanning).
- **Deploy** (opcional): Expo EAS, ou APK de preview via CI, ou publicação em lojas quando houver.

## Próximos Passos
- [ ] Atualizar `README.md` com instruções de setup/execução e prints.
- [ ] Introduzir navegação e tipagem de rotas.
- [ ] Criar camada de serviços (API) e exemplo de fluxo (login/agendamento fictício).
- [ ] Adicionar testes (1 unit de componente + 1 de hook + 1 integração simples).
- [ ] Configurar CI no GitHub Actions e adicionar `.env.example`.
