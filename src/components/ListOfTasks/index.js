import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import Task from "../Task";

export default class ListOfTasks extends Component {
  render() {
    const { todos } = this.props;

    return (
      <Table celled sortable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Done</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Priority</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {todos.map(todo => (
            <Task key={todo.id} data={todo} setDone={this.props.setDone} />
          ))}
        </Table.Body>
      </Table>
    );
  }
}
