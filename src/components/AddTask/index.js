import React, { Component } from "react";
import { Form, Button, TextArea, Input, Select } from "semantic-ui-react";

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
            <Form.Field
              name="title"
              onChange={this.handleChange}
              control={Input}
              placeholder="Title"
            />
            <Form.Field
              name="priority"
              onChange={this.handleChange}
              control={Select}
              options={options}
              placeholder="Priority"
            />
            <Form.Field
              name="date"
              onChange={this.handleChange}
              control={Select}
              options={options}
              placeholder="Date"
            />
          </Form.Group>
          <Form.Field
            name="description"
            onChange={this.handleChange}
            control={TextArea}
            placeholder="Description..."
          />
          <Form.Group>
            <Button onClick={this.handleSubmit} content="Add" fluid primary />
          </Form.Group>
        </Form>
      </div>
    );
  }

  handleChange = (event, element) => {
    this.setState({
      [element.name]: element.value
    });
  };

  handleSubmit = () => {
    const { title, priority, date, description } = this.state;
    let data = { title, priority, date, description };

    this.props.onAddClick(data);
  };
}
