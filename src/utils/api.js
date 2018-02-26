import moment from "moment";

export default class Api {
  constructor() {
    this._todos = this._getData();
    this._filterData = this._getFilterData();
  }

  getTodos() {
    return this._todos;
  }

  addTodo(todo) {
    todo.id = new Date().getTime().toString();
    todo.done = false;
    if (!todo.description) todo.description = "";
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

  _getFilterData() {
    let data = JSON.parse(localStorage.getItem("filterData"));

    if (data) {
      if (data.dateFrom) {
        data.dateFrom = moment(data.dateFrom);
      }
      if (data.dateTo) {
        data.dateTo = moment(data.dateTo);
      }
      return data;
    }

    return {
      sortField: false,
      sortDirection: "ascending",
      showCompleted: true,
      dateFrom: undefined,
      dateTo: undefined,
      description: ""
    };
  }

  _saveFilterData() {
    localStorage.setItem("filterData", JSON.stringify(this._filterData));
  }

  setFilterData(field, value) {
    this._filterData[field] = value;
    this._saveFilterData();
  }

  getFilterData() {
    return this._filterData;
  }

  saveEditedData(id, data) {
    let index = this._todos.map(element => element.id).indexOf(id);

    for (let x in data) {
      if (moment.isMoment(data[x])) {
        this._todos[index][x] = moment(data[x]).format("DD.MM.YYYY");
        break;
      }
      this._todos[index][x] = data[x];
    }
    this._saveData();
  }

  removeTask(id) {
    let index = this._todos.map(element => element.id).indexOf(id);

    this._todos.splice(index, 1);
    this._saveData();
  }
}
