import { Checkbox } from './checkbox';
import { Button } from './button';
import React from 'react';
import { Card, CardContent } from './card';
import { Badge } from './badge';

//Eu iria usar enum, mas uma configuração do ts não deixou usar e tive que usar essa classe imutável
const CORES_CATEGORIA: Record<string, string> = {
  Trabalho: 'bg-blue-500 text-white',
  Estudo: 'bg-fuchsia-500 text-white',
  Dev: 'bg-orange-500 text-white',
  'Saúde': 'bg-red-500 text-white',
  Casa: 'bg-emerald-500 text-white',
  default: 'bg-gray-300 text-white',
};

export interface TodoProps {
  id: number;
  nome: string;
  categoria: string;
  concluido: boolean;
  dataCriacao: Date;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export function Todo({
  id,
  nome,
  categoria,
  concluido,
  onToggle,
  onRemove,
}: TodoProps): React.JSX.Element {
  const [transparente, setTransparente] = React.useState(false);
  return (
    <Card className={`w-full border bg-card transition-colors rounded-md ${transparente ? 'opacity-50' : ''}`}>
      <CardContent className="group flex items-center gap-3 py-2 px-3">
        <Checkbox
          checked={concluido}
          onCheckedChange={() => onToggle(id)}
          className="mr-2"
        />
        <div className="flex-1 min-w-0">
          <span
            className={`font-medium text-sm truncate ${concluido ? 'line-through text-muted-foreground' : ''}`}
            title={nome}
          >
            {nome}
          </span>
          <Badge variant='secondary' className={'ml-2 shrink-0'} title='Data de Criação'>
            {new Date().getDate()} | {new Date().getMonth() + 1} | {new Date().getFullYear()}
          </Badge>
        </div>
        <div className="ml-2 flex items-center gap-2">
          <Badge
            className={
              'rounded-full text-xs px-2 py-0.5 ' +
              (CORES_CATEGORIA[categoria] ?? CORES_CATEGORIA.default)
            }
            title={categoria}
          >
            {categoria}
          </Badge>
          <Button
            aria-label="Alternar transparência"
            variant="ghost"
            size="icon"
            onClick={() => setTransparente((v) => !v)}
            className="h-7 w-7"
            title={transparente ? 'Remover transparência' : 'Deixar transparente'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Button>
          <Button
            aria-label="Remover tarefa"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(id)}
            className="text-destructive hover:bg-destructive/10 h-7 w-7 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
