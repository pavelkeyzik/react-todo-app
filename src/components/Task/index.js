import React, { Component } from "react";
import { Table, Checkbox } from "semantic-ui-react";

export default class Task extends Component {
  render() {
    const { data } = this.props;

    return (
      <Table.Row onDoubleClick={this.props.clicked}>
        <Table.Cell
          onClick={this.props.setDone.bind(null, data.id, !data.done)}
        >
          {data.done ? <Checkbox checked /> : <Checkbox />}
        </Table.Cell>
        <Table.Cell
          data-tooltip={data.description || "No description"}
          data-inverted
        >
          {data.title}
        </Table.Cell>
        <Table.Cell>{data.priority}</Table.Cell>
        <Table.Cell>{data.date}</Table.Cell>
      </Table.Row>
    );
  }
}
