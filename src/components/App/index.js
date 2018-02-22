import React, { Component } from "react";
import AddTask from "../AddTask";
import Filter from "../Filter";
import ListOfTasks from "../ListOfTasks";
import { Container, Header } from "semantic-ui-react";
import "react-datepicker/dist/react-datepicker.css";
import Api from "../../utils/api";
import moment from "moment";
import EditingModal from "../EditingModal";

export default class App extends Component {
  api = new Api();

  constructor() {
    super();
    this.filterData = this.api.getFilterData();
    this.state = {
      todos: this.api.getTodos(),
      sortField: this.filterData.sortField,
      sortDirection: this.filterData.sortDirection,
      showCompleted: this.filterData.showCompleted,
      dateFrom: this.filterData.dateFrom,
      dateTo: this.filterData.dateTo,
      description: this.filterData.description,
      showEditingModal: false
    };
  }

  render() {
    return (
      <Container>
        {this.state.showEditingModal && (
          <EditingModal
            closeEditingModal={this.closeEditingModal}
            editingModalData={this.state.editingModalData}
            saveEditedData={this.saveEditedData}
            removeTask={this.removeTask}
          />
        )}
        <Header as="h1" textAlign="center">
          <Header.Content>React ToDo App</Header.Content>
        </Header>
        <AddTask onAddClick={this.handleAdd} />
        <Filter
          showCompleted={this.state.showCompleted}
          dateFrom={this.state.dateFrom}
          dateTo={this.state.dateTo}
          description={this.state.description}
          onFilter={this.handleFilter}
        />
        <ListOfTasks
          sortField={this.state.sortField}
          sortDirection={this.state.sortDirection}
          onSort={this.handleSort}
          todos={this.getTodos()}
          setDone={this.handleDone}
          onDblClick={this.handleEdit}
        />
      </Container>
    );
  }

  handleAdd = data => {
    this.api.addTodo(data);
    this.updateData();
  };

  handleDone = (id, value) => {
    this.api.setDone(id, value);
    this.updateData();
  };

  updateData = () => {
    this.setState({
      todos: this.api.getTodos()
    });
  };

  handleSort = fieldNumber => {
    if (this.state.sortField === fieldNumber) {
      this.setState({
        sortDirection:
          this.state.sortDirection === "ascending" ? "descending" : "ascending"
      });
      this.api.setFilterData("sortDirection", this.state.sortDirection);
    } else {
      this.setState({
        sortField: fieldNumber
      });
      this.api.setFilterData("sortField", fieldNumber);
    }
  };

  handleFilter = (field, value) => {
    if (field === "showCompleted") {
      this.setState({
        [field]: !this.state.showCompleted
      });
    } else {
      this.setState({
        [field]: value
      });
    }

    this.api.setFilterData(field, value);
  };

  getTodos = () => {
    let todos = this.state.todos;

    let query = this.state.description.toLowerCase();

    todos = todos.filter(item => {
      if (!this.state.showCompleted && item.done) return false;
      if (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      ) {
        if (
          this.state.dateFrom === undefined &&
          this.state.dateTo !== undefined &&
          moment(item.date, "DD.MM.YYYY").isBefore(this.state.dateTo)
        ) {
          return true;
        }
        if (
          this.state.dateTo === undefined &&
          this.state.dateFrom !== undefined &&
          moment(item.date, "DD.MM.YYYY").isAfter(this.state.dateFrom)
        ) {
          return true;
        }
        if (
          this.state.dateFrom === undefined &&
          this.state.dateTo === undefined
        ) {
          return true;
        }

        if (
          moment(item.date, "DD.MM.YYYY").isSameOrAfter(this.state.dateFrom) &&
          moment(item.date, "DD.MM.YYYY").isSameOrBefore(this.state.dateTo)
        ) {
          return true;
        }
      }

      return false;
    });

    return todos;
  };

  handleEdit = item => {
    this.setState({
      showEditingModal: true,
      editingModalData: item
    });
  };

  closeEditingModal = () => {
    this.setState({
      showEditingModal: false,
      editingModalData: {}
    });
  };

  saveEditedData = (id, data) => {
    this.api.saveEditedData(id, data);
    this.updateData();
    this.closeEditingModal();
  };

  removeTask = id => {
    this.api.removeTask(id);
    this.updateData();
    this.closeEditingModal();
  };
}
