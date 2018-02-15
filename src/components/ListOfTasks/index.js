import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import Task from "../Task";

export default class ListOfTasks extends Component {
  state = {
    sortField: false,
    sortDirection: "ascending"
  };

  render() {
    const { todos } = this.props;

    return (
      <Table celled sortable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={
                this.state.sortField === "done"
                  ? this.state.sortDirection
                  : null
              }
              onClick={this.sortBy.bind(null, "done")}
            >
              Done
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                this.state.sortField === "text"
                  ? this.state.sortDirection
                  : null
              }
              onClick={this.sortBy.bind(null, "text")}
            >
              Title
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                this.state.sortField === "priority"
                  ? this.state.sortDirection
                  : null
              }
              onClick={this.sortBy.bind(null, "priority")}
            >
              Priority
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                this.state.sortField === "date"
                  ? this.state.sortDirection
                  : null
              }
              onClick={this.sortBy.bind(null, "date")}
            >
              Date
            </Table.HeaderCell>
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

  sortBy = fieldNumber => {
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
}
