import React, { Component } from "react";
import AddTask from "../AddTask";
import Filter from "../Filter";
import ListOfTasks from "../ListOfTasks";
import { Container, Header } from "semantic-ui-react";
import items from '../../data/todos';

export default class App extends Component {
  render() {
    return (
      <Container>
        <Header as="h1" textAlign="center">
          <Header.Content>React ToDo App</Header.Content>
        </Header>
        <AddTask />
        <Filter />
        <ListOfTasks items={items} />
      </Container>
    );
  }
}
