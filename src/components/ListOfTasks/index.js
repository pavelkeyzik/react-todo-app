import React, { Component } from "react";
import { Table, Checkbox } from "semantic-ui-react";

export default class ListOfTasks extends Component {
  render() {
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
          <Table.Row>
            <Table.Cell>
              <Checkbox />
            </Table.Cell>
            <Table.Cell>Create TodoApp</Table.Cell>
            <Table.Cell>High</Table.Cell>
            <Table.Cell>12.12.2017</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Checkbox />
            </Table.Cell>
            <Table.Cell>Sleed</Table.Cell>
            <Table.Cell>Low</Table.Cell>
            <Table.Cell>23.12.2017</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Checkbox />
            </Table.Cell>
            <Table.Cell>Have a rest</Table.Cell>
            <Table.Cell>Medium</Table.Cell>
            <Table.Cell>14.12.2017</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Checkbox checked />
            </Table.Cell>
            <Table.Cell>Visit lesson</Table.Cell>
            <Table.Cell>High</Table.Cell>
            <Table.Cell>09.12.2017</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}
