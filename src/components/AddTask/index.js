import React, { Component } from "react";
import { Form, Button, TextArea, Input, Select } from "semantic-ui-react";
import moment from "moment";
import DatePicker from "react-datepicker";

export default class AddTask extends Component {
  state = {
    date: moment(),
    isHasTitle: false,
    title: ""
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
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field
              name="title"
              onChange={this.handleChange}
              control={Input}
              value={this.state.title}
              placeholder="Title"
            />
            <Form.Field
              name="priority"
              onChange={this.handleChange}
              control={Select}
              value={this.state.priority}
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
            value={this.state.description}
            onChange={this.handleChange}
            control={TextArea}
            placeholder="Description..."
          />
          <Form.Group>
            <Button
              type="submit"
              content="Add"
              fluid
              primary
              disabled={!this.state.isHasTitle}
            />
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

    if (element.name === "title") {
      this.checkTitle(element.value);
    }

    this.setState({
      [element.name]: element.value
    });
  };

  handleSubmit = () => {
    const { title, priority, date, description } = this.state;
    let data = { title, priority, date, description };
    data.date = moment(data.date).format("DD.MM.YYYY");

    this.setState({
      title: "",
      priority: "",
      description: ""
    });

    this.setState({ isHasTitle: false });
    this.props.onAddClick(data);
  };

  checkTitle = title => {
    if (title.length > 0) {
      this.setState({
        isHasTitle: true
      });
    } else {
      this.setState({
        isHasTitle: false
      });
    }
  };
}
