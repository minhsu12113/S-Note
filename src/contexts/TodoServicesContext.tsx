import { createContext } from "react";
import { Todo } from "../models/Todo"; 
import { TodoLocalStorageService } from "../services/repository/TodoLocalStorageServices";

export interface TodoService {
  loadTodos: () => Todo[]
  addTodo: (todoItem: Todo) => void
  updateTodo: (todoItem: Todo) => void
  deleteTodo: (todoItem: Todo) => void
}

const initLocalStorageService = TodoLocalStorageService
export const TodoServiceContext = createContext<TodoService>(initLocalStorageService)