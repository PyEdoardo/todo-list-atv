import { useEffect, useState } from "react";

import "@/App.css";

import { Todo, type TodoProps } from "@/components/ui/Todo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "./components/ui/switch";

import {
  FaSun as Sun,
  FaMoon as Moon,
  FaTrash as Trash,
} from "react-icons/fa";

function App() {
  const categorias = ["Trabalho", "Estudo", "Casa", "Saúde", "Dev"];

  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [idAtual, setIdAtual] = useState(0);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [mostrarCampoCustom, setMostrarCampoCustom] = useState(false);
  const [categoriaCustom, setCategoriaCustom] = useState("");
  const [nomeTask, setNomeTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const adicionarTodo = ({ nome, categoria }: TodoProps): void => {
    if (!nome || !categoria) return;

    const novoTodo: TodoProps = {
      id: idAtual,
      nome,
      categoria,
      concluido: false,
      onToggle: () => toggleTodo(idAtual),
      onRemove: () => removerTodo(idAtual),
    };

    setTodos((anteriores) => [...anteriores, novoTodo]);
    setIdAtual((prev) => prev + 1);
    setNomeTask("");
    setCategoriaSelecionada("");
    setCategoriaCustom("");
    setMostrarCampoCustom(false);
  };

  const removerTodo = (id: number): void => {
    setTodos((anteriores) => anteriores.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number): void => {
    setTodos((anteriores) =>
      anteriores.map((todo) =>
        todo.id === id ? { ...todo, concluido: !todo.concluido } : todo
      )
    );
  };

  //só pra deixar em modo escuro, o shad tem a classe dark que deixa com um tema bonitão
  useEffect(() => {
    const raiz = window.document.documentElement;
    if (darkMode) {
      raiz.classList.add("dark");
    } else {
      raiz.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="container max-w-md mx-auto mt-10">
      <div className="flex items-center gap-2 mb-4">
        {!darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-yellow-500"/>}
        <Switch
          checked={darkMode}
          onCheckedChange={setDarkMode}
          id="dark-mode-switch"
        />
      </div>
      <div className="flex flex-col gap-4 bg-card p-6 rounded-lg shadow-md border">
        <div>
          <label className="block text-sm font-medium mb-1">
            Nome da tarefa
          </label>
          <Input
            type="text"
            placeholder="Digite o nome da tarefa"
            value={nomeTask}
            onChange={(e) => setNomeTask(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Categoria</label>
          <Select
            value={mostrarCampoCustom ? "custom" : categoriaSelecionada}
            onValueChange={(value) => {
              if (value === "custom") {
                setMostrarCampoCustom(true);
                setCategoriaSelecionada("");
              } else {
                setMostrarCampoCustom(false);
                setCategoriaSelecionada(value);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categorias.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
              <SelectItem value="custom">Nenhuma dessas...</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {mostrarCampoCustom && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Digite a categoria
            </label>
            <Input
              type="text"
              placeholder="Categoria personalizada"
              value={categoriaCustom}
              onChange={(e) => setCategoriaCustom(e.target.value)}
            />
          </div>
        )}
        <Button
          className="mt-2 w-full"
          onClick={() =>
            adicionarTodo({
              id: idAtual,
              nome: nomeTask,
              categoria: mostrarCampoCustom
                ? categoriaCustom
                : categoriaSelecionada,
              concluido: false,
              onToggle: () => {},
              onRemove: () => {},
            })
          }
        >
          Adicionar tarefa
        </Button>
        <div className="flex gap-2 justify-center">
          <Button size="sm" className="px-2 min-w-0" onClick={() => setTodos(todos => todos.filter(todo => !todo.concluido))}>
            <Trash />
          </Button>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3 justify-items-center">
        {todos.map((valor: TodoProps) => (
          <Todo
            id={valor.id}
            nome={valor.nome}
            categoria={valor.categoria}
            concluido={valor.concluido}
            onToggle={() => toggleTodo(valor.id)}
            onRemove={() => removerTodo(valor.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
