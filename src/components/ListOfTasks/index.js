import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import Task from "../Task";

export default class ListOfTasks extends Component {
  render() {
    const { todos } = this.props;

    if (this.props.sortField !== false) {
      let direction = this.props.sortDirection === "ascending" ? 1 : -1;
      todos.sort((a, b) => {
        let prop = this.props.sortField;

        if (typeof a[prop] === "string") {
          a[prop].toString();
          b[prop].toString();
        }

        if (a[prop] < b[prop]) {
          return -1 * direction;
        }
        if (a[prop] > b[prop]) {
          return 1 * direction;
        }

        return 0;
      });
    }

    return (
      <Table celled sortable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={
                this.props.sortField === "done"
                  ? this.props.sortDirection
                  : null
              }
              onClick={this.props.onSort.bind(null, "done")}
            >
              Done
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                this.props.sortField === "title"
                  ? this.props.sortDirection
                  : null
              }
              onClick={this.props.onSort.bind(null, "title")}
            >
              Title
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                this.props.sortField === "priority"
                  ? this.props.sortDirection
                  : null
              }
              onClick={this.props.onSort.bind(null, "priority")}
            >
              Priority
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                this.props.sortField === "date"
                  ? this.props.sortDirection
                  : null
              }
              onClick={this.props.onSort.bind(null, "date")}
            >
              Date
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {todos.map(todo => (
            <Task
              clicked={this.props.onDblClick.bind(null, todo)}
              key={todo.id}
              data={todo}
              setDone={this.props.setDone}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}
