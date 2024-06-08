import { Todo } from "../models/Todo";

export function loadTodos(): Promise<Todo[]> {
  const localDataRawData = loadTodoFromLocalStore()
  return new Promise((resolve, reject) => {
    loadTodoFromLocalAPI()
      .then((res) => res.json())
      .then((res) => {
        const localData = JSON.parse(localDataRawData as never) 
        if(localData)
          resolve(res.todos.concat(localData))
        else
          resolve(res.todos)
      }).catch(() => reject(JSON.parse(localDataRawData as never)));
  })
}

export function addTodo(todoItem: Todo) {
  if (todoItem) {
    const todoList = JSON.parse(localStorage.getItem('todos') as never)
    if(todoList){
      todoList.push(todoItem)
      localStorage.setItem('todos', JSON.stringify(todoList))
    }else{
      localStorage.setItem('todos', JSON.stringify([todoItem]))
    }
  }
}


const loadTodoFromLocalStore = () => localStorage.getItem('todos')
const loadTodoFromLocalAPI = () => fetch('https://dummyjson.com/todos?limit=15')  