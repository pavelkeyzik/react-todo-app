import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {select} from '../actions/index';

class CarList extends Component {

  showList() {
    return this.props.cars.map(item => (
      <li onClick={() => this.props.select(item)} key={item.id}>{item.car}</li>
    ));
  }

  render() {
    return (
      <ol>
        {this.showList()}
      </ol>
    );
  }
}

function mapStateToProps(state) {
  return {
    cars: state.cars
  };
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators({select}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CarList);