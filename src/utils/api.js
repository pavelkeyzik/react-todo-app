export default class Api {
  constructor() {
    this._todos = this._getData();
  }

  getTodos() {
    return this._todos;
  }

  addTodo(todo) {
    todo.id = new Date().getTime().toString();
    this._todos.push(todo);
    this._saveData();
  }

  setDone(id, value) {
    let index = this._todos.findIndex(data => data.id === id);
    this._todos[index].done = value;
    this._saveData();
  }

  _getData() {
    return JSON.parse(localStorage.getItem("todos")) || [];
  }

  _saveData() {
    localStorage.setItem("todos", JSON.stringify(this._todos));
  }
}
