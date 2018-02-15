import React, { Component } from "react";
import AddTask from "../AddTask";
import Filter from "../Filter";
import ListOfTasks from "../ListOfTasks";
import { Container, Header } from "semantic-ui-react";
import Api from "../../utils/api";

export default class App extends Component {
  api = new Api();

  state = {
    todos: this.api.getTodos()
  };

  render() {
    return (
      <Container>
        <Header as="h1" textAlign="center">
          <Header.Content>React ToDo App</Header.Content>
        </Header>
        <AddTask onAddClick={this.handleAdd} />
        <Filter />
        <ListOfTasks todos={this.state.todos} setDone={this.handleDone} />
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
}
