import { Todo } from "../../models/Todo";  
import { loadTodoFromLocalStorage } from "../data_sources/TodoLocal";

const loadTodos = (): Todo[] => loadTodoFromLocalStorage()

const addTodo = (todoItem: Todo) => {
  if (todoItem) {
    const todoItems = loadTodos()

    const isDuplicateTodo = todoItems.find(e => e.todo.toLowerCase() === todoItem.todo.toLowerCase())
    if(isDuplicateTodo) return

    if(todoItems){
      todoItems.push(todoItem)
      localStorage.setItem('todos', JSON.stringify(todoItems))
    }else{
      localStorage.setItem('todos', JSON.stringify([todoItem]))
    }
  }
}

const updateTodo = (todo: Todo) => {
  const todoItems = loadTodos() 
  if(todoItems){
    const itemUpdate = todoItems.find(e => e.id === todo.id)
    if(itemUpdate){
      itemUpdate.completed = todo.completed
      localStorage.setItem('todos', JSON.stringify(todoItems))
    }			
  }
}

const deleteTodo = (todo: Todo) => {
  const todoItems = loadTodos() 
  if(todoItems){
    const itemDelete = todoItems.find(e => e.id === todo.id)
    if(itemDelete){
      const indexItem = todoItems.indexOf(itemDelete)
      if (indexItem > -1){
        todoItems.splice(indexItem, 1)
        if(todoItems.length > 0)
          localStorage.setItem('todos', JSON.stringify(todoItems))
        else{
          localStorage.removeItem('todos')
        }
      }
    }			
  }
}

export const TodoLocalStorageService = { loadTodos, addTodo, updateTodo, deleteTodo }