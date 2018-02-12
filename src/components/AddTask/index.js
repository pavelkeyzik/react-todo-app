import React, { Component } from "react";
import {
  Form,
  Button,
  TextArea,
  Input,
  Select
} from "semantic-ui-react";

export default class AddTask extends Component {
  render() {
    const options = [
      {
        text: "Low",
        value: "Low"
      },
      {
        text: "Medium",
        value: "Medium"
      },
      {
        text: "High",
        value: "High"
      }
    ];

    return (
      <div>
        <h3>Add Task</h3>
        <Form>
          <Form.Group widths="equal">
            <Form.Field control={Input} placeholder="Title" />
            <Form.Field
              control={Select}
              options={options}
              placeholder="Priority"
            />
            <Form.Field control={Select} options={options} placeholder="Date" />
          </Form.Group>
          <Form.Field control={TextArea} placeholder="Description..." />
          <Form.Group>
            <Button content="Add" fluid primary />
          </Form.Group>
        </Form>
      </div>
    );
  }
}
