import { Todo } from "../../models/Todo";


export const loadTodoFromAPI = () : Promise<Todo[]>  => {
  return fetch('https://dummyjson.com/todos?limit=15').then(res => {
    return JSON.parse(res as never)
  }).catch(error => console.log(error))
}  