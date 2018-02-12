import React, { Component } from "react";
import { Form, Checkbox, Select, Input } from "semantic-ui-react";

export default class Filter extends Component {
  render() {
    return (
      <div>
        <h3>Filter</h3>
        <Form>
          <Form.Group widths="equal">
            <Form.Field control={Checkbox} label="Show completed" />
            <Form.Field control={Select} placeholder="Date From" />
            <Form.Field control={Select} placeholder="Date To" />
          </Form.Group>
          <Form.Field
            control={Input}
            placeholder="Text search (title + description)"
          />
        </Form>
      </div>
    );
  }
}
