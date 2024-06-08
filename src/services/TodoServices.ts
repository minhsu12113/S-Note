import { Todo } from "../models/Todo";  
import { loadTodoFromLocalStorage } from "./data_sources/TodoLocal";

export const loadTodos = (): Todo[] => loadTodoFromLocalStorage()

export const addTodo = (todoItem: Todo) => {
  if (todoItem) {
    const todoItems = loadTodos()
    if(todoItems){
      todoItems.push(todoItem)
      localStorage.setItem('todos', JSON.stringify(todoItems))
    }else{
      localStorage.setItem('todos', JSON.stringify([todoItem]))
    }
  }
}

export const updateTodo = (todo: Todo) => {
  const todoItems = loadTodos() 
  if(todoItems){
    const itemUpdate = todoItems.find(e => e.id === todo.id)
    if(itemUpdate){
      itemUpdate.completed = todo.completed
      localStorage.setItem('todos', JSON.stringify(todoItems))
    }			
  }
}

export const deleteTodo = (todo: Todo) => {
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