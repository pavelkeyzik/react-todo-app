import React, { Component } from "react";
import ButtonContent, {
  Button,
  Header,
  Icon,
  Modal,
  Form,
  TextArea,
  Input,
  Select
} from "semantic-ui-react";
import moment from "moment";
import DatePicker from "react-datepicker";

export default class EditingModal extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.editingModalData;
    this.id = this.data.id;
    this.state = {
      title: this.data.title,
      done: this.data.done,
      priority: this.data.priority,
      date: this.data.date,
      description: this.data.description
    };
  }

  componentWillReceiveProps(newProps) {
    this.data = newProps.editingModalData;
    this.id = this.data.id;
    this.setState({
      title: this.data.title,
      done: this.data.done,
      priority: this.data.priority,
      date: this.data.date,
      description: this.data.description
    });
  }

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
      <Modal open>
        {this.state.done ? (
          <Header icon="unhide" content="View task" />
        ) : (
          <Header icon="write" content="Edit task" />
        )}
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                name="title"
                onChange={this.handleChange}
                value={this.state.title}
                control={Input}
                placeholder="Title"
                disabled={this.state.done}
              />
              <Form.Field
                name="priority"
                onChange={this.handleChange}
                control={Select}
                defaultValue={this.state.priority}
                options={options}
                placeholder="Priority"
                disabled={this.state.done}
              />
              <DatePicker
                name="date"
                selected={moment(this.state.date, "DD.MM.YYYY")}
                disabled={this.state.done}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Field
              name="description"
              onChange={this.handleChange}
              control={TextArea}
              value={this.state.description}
              placeholder="Description..."
              disabled={this.state.done}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" float="left" onClick={this.removeTask}>
            <Button.Content>
              <Icon name="trash" /> Remove task
            </Button.Content>
          </Button>
          {this.state.done ? (
            <Button color="grey" onClick={this.closeModal}>
              Close modal
            </Button>
          ) : (
            [
              <Button key="cancelButton" onClick={this.closeModal}>
                <Icon name="cancel" /> Cancel edit
              </Button>,
              <Button
                key="saveButton"
                color="green"
                onClick={this.saveEditedData}
              >
                <Icon name="save" /> Save edited
              </Button>
            ]
          )}
        </Modal.Actions>
      </Modal>
    );
  }

  closeModal = () => {
    this.props.closeEditingModal();
  };

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

  saveEditedData = () => {
    let data = {
      title: this.state.title,
      done: this.state.done,
      priority: this.state.priority,
      date: this.state.date,
      description: this.state.description
    };

    this.props.saveEditedData(this.id, data);
  };

  removeTask = () => {
    this.props.removeTask(this.id);
  };
}
