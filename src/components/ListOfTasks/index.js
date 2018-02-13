import React, { Component } from "react";
import { Table, Checkbox } from "semantic-ui-react";
import * as moment from "moment";

export default class ListOfTasks extends Component {
  state = {
    sortField: false,
    sortDirection: "ascending"
  };

  render() {
    const { items } = this.props;

    if (this.state.sortField !== false) {
      let direction = this.state.sortDirection === "ascending" ? 1 : -1;

      items.sort((a, b) => {
        let prop = this.state.sortField;

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
          {items.map(item => (
            <Table.Row key={item.id}>
              <Table.Cell>
                {item.done ? <Checkbox checked /> : <Checkbox />}
              </Table.Cell>
              <Table.Cell>{item.text}</Table.Cell>
              <Table.Cell>{item.priority}</Table.Cell>
              <Table.Cell>
                {moment(item.date).format("DD.MM.YYYY HH:mm:ss")}
              </Table.Cell>
            </Table.Row>
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
