# Todo List

## Sobre o Projeto
Aplicação de lista de tarefas em React + TypeScript. Funcionalidades:
- Criar tarefa com título e categoria.
- Marcar como concluída.
- Alternar transparência do item.
- Remover tarefa.
- Suporte a tema escuro (shadcn/ui).

## Tecnologias Utilizadas
- React, TypeScript, Vite
- Tailwind CSS
- shadcn/ui (Radix UI)

## Estrutura de Componentes
- App: mantém o estado das tarefas e callbacks (adicionar, alternar concluído, alternar transparência, remover).
- Header: título/contador.
- TodoForm: formulário para criar nova tarefa.
- TodoList: renderiza a lista recebida via props.
- Todo (TodoItem): item individual com checkbox, título, badge de categoria, botão de transparência e botão de remover.

Fluxo: App guarda o estado e passa dados/handlers por props; TodoItem dispara eventos para o App.

## Gerenciamento de Estado (useState)
Estados principais (exemplo simplificado):
```tsx
const [todos, setTodos] = React.useState<Array<{ id: number; nome: string; categoria: string; concluido: boolean; transparente?: boolean }>>([]);
const [entrada, setEntrada] = React.useState("");
const [categoria, setCategoria] = React.useState<string>("General");
```

## Tipagem com TypeScript
Tipos/props utilizados pelo componente Todo e mapeamento de cores:
```ts
export interface TodoProps {
  id: number;
  nome: string;
  categoria: string;
  concluido: boolean;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

// "Enum" de cores por categoria (Tailwind)
const CORES_CATEGORIA: Record<string, string> = {
  Trabalho: "bg-blue-500 text-white",
  Estudo: "bg-fuchsia-500 text-white",
  Dev: "bg-orange-500 text-white",
  Saúde: "bg-red-500 text-white",
  Casa: "bg-emerald-500 text-white",
  default: "bg-gray-300 text-white",
};
```

## Efeitos Colaterais (useEffect)
Tema escuro (classe do shadcn)
```tsx
// Tema escuro
useEffect(() => {
  const raiz = document.documentElement;
  darkMode ? raiz.classList.add("dark") : raiz.classList.remove("dark");
}, [darkMode]);
```