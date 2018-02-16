import React, { Component } from "react";
import AddTask from "../AddTask";
import Filter from "../Filter";
import ListOfTasks from "../ListOfTasks";
import { Container, Header } from "semantic-ui-react";
import "react-datepicker/dist/react-datepicker.css";
import Api from "../../utils/api";
import moment from "moment";

export default class App extends Component {
  api = new Api();

  state = {
    todos: this.api.getTodos(),
    sortField: false,
    sortDirection: "ascending",
    showCompleted: false,
    dateFrom: moment().subtract(1, "day"),
    dateTo: moment(),
    description: ""
  };

  render() {
    return (
      <Container>
        <Header as="h1" textAlign="center">
          <Header.Content>React ToDo App</Header.Content>
        </Header>
        <AddTask onAddClick={this.handleAdd} />
        <Filter
          showCompleted={this.state.showCompleted}
          dateFrom={this.state.dateFrom}
          dateTo={this.state.dateTo}
          onFilter={this.handleFilter}
        />
        <ListOfTasks
          sortField={this.state.sortField}
          sortDirection={this.state.sortDirection}
          onSort={this.handleSort}
          todos={this.getTodos()}
          setDone={this.handleDone}
        />
      </Container>
    );
  }

  handleAdd = data => {
    this.api.addTodo(data);
    this.updateData();
  };

  handleDone = (id, value) => {
    this.api.setDone(id, value);
    this.updateData();
  };

  updateData = () => {
    this.setState({
      todos: this.api.getTodos()
    });
  };

  handleSort = fieldNumber => {
    if (this.state.sortField === fieldNumber) {
      this.setState({
        sortDirection:
          this.state.sortDirection === "ascending" ? "descending" : "ascending"
      });
    } else {
      this.setState({
        sortField: fieldNumber
      });
    }
  };

  handleFilter = (field, value) => {
    if (field === "showCompleted") {
      this.setState({
        [field]: !this.state.showCompleted
      });
    } else {
      this.setState({
        [field]: value
      });
    }
  };

  getTodos = () => {
    let todos = this.state.todos;

    if (this.state.showCompleted) {
      let query = this.state.description.toLowerCase();

      todos = todos.filter(item => {
        if (
          (item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)) &&
          (moment(item.date, "DD.MM.YYYY").isAfter(this.state.dateFrom) &&
            moment(item.date, "DD.MM.YYYY").isBefore(this.state.dateTo))
        ) {
          return true;
        }

        return false;
      });
    }

    return todos;
  };
}
