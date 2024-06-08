import { Todo } from "../../models/Todo";

const KEY_NAME = 'todos'
export const loadTodoFromLocalStorage = () : Todo[] =>  {
  const rawData = localStorage.getItem(KEY_NAME)
  if (rawData) return JSON.parse(rawData)
  return []
}