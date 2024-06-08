import { useEffect, useReducer } from "react";
import { Todo } from "../models/Todo";
import { addTodo, deleteTodo, loadTodos, updateTodo } from "../services/TodoServices";
import { Guid } from "guid-typescript";

interface State {
  todos: Todo[];
  loading: boolean;
  error: Error | null; 
}

type Action = { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: Todo[] }
  | { type: 'ADD_NEW'; payload: Todo[] }
  | { type: 'FETCH_FAILURE'; payload: Error };

export const todosReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, todos: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_NEW':
      return { ...state, loading: false, todos: action.payload };
    default:
      throw new Error();
  }
};

interface UseTodosViewModelProp {
  handleAddTodo: (title: string) => void
  handleUpdateTodo: (todo: Todo) => void
  handleDeleteTodo: (todo: Todo) => void
  state: State
}

export const useTodosViewModel = (): UseTodosViewModelProp => {
  const [state, dispatch] = useReducer(todosReducer, { todos: [], loading: true, error: null });

  useEffect(() => { loadTask() }, []);

  const loadTask = () => {
    dispatch({ type: 'FETCH_INIT' });
    try { 
      dispatch({ type: 'FETCH_SUCCESS', payload: loadTodos() })
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE', payload: error as Error });
    }
  }

  const handleAddTodo = (title: string) => {
    addTodo({ completed: false, todo: title, id: Guid.create().toString() })
    loadTask()
  }

  const handleUpdateTodo = (todo: Todo) =>  updateTodo(todo)
  const handleDeleteTodo = (todo: Todo) =>  { deleteTodo(todo); loadTask()} 

  return {state, handleAddTodo, handleUpdateTodo, handleDeleteTodo};
};