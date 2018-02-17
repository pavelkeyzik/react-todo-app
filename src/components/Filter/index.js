import React, { Component } from "react";
import { Form, Checkbox, Input } from "semantic-ui-react";
import DatePicker from "react-datepicker";

export default class Filter extends Component {
  render() {
    return (
      <div>
        <h3>Filter</h3>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              name="showCompleted"
              onChange={this.handleChange}
              control={Checkbox}
              label="Show completed"
              checked={this.props.showCompleted}
            />
            <DatePicker
              name="dateFrom"
              selected={this.props.dateFrom}
              onChange={this.handleChangeDateFrom}
            />
            <DatePicker
              name="dateTo"
              selected={this.props.dateTo}
              onChange={this.handleChangeDateTo}
            />
          </Form.Group>
          <Form.Field
            name="description"
            onChange={this.handleChange}
            value={this.props.description}
            control={Input}
            placeholder="Text search (title + description)"
          />
        </Form>
      </div>
    );
  }

  handleChange = (event, element) => {
    this.props.onFilter(element.name, element.value || element.checked || "");
  };

  handleChangeDateFrom = (element, x) => {
    this.props.onFilter("dateFrom", element);
  };

  handleChangeDateTo = (element, x) => {
    this.props.onFilter("dateTo", element);
  };
}
