import React, { Component } from "react";
import { Form, Button, TextArea, Input, Select } from "semantic-ui-react";
import moment from "moment";
import DatePicker from "react-datepicker";

export default class AddTask extends Component {
  state = {
    date: moment()
  };

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
            <DatePicker
              name="date"
              selected={this.state.date}
              onChange={this.handleChange}
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
    if (
      element.target &&
      element.target.classList.contains("react-datepicker__day")
    ) {
      this.setState({
        date: moment(event)
      });
      return;
    }

    this.setState({
      [element.name]: element.value
    });
  };

  handleSubmit = () => {
    const { title, priority, date, description } = this.state;
    let data = { title, priority, date, description };
    data.date = moment(data.date).format("DD.MM.YYYY");

    this.props.onAddClick(data);
  };
}
