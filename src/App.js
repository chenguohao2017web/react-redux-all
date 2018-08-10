import React, { Component } from 'react';
import './App.css';
import { Row, Col, Input, Button } from 'antd'
import { connect } from 'react-redux'
class App extends Component {
  render() {
    const { todoList } = this.props
    return (
      <div className="app">
        <div className="title">
          <Row gutter={16}>
            <Col className="gutter-row" span={20}>
              <Input placeholder="Basic usage" onChange={this.handleOnChange.bind(this)} />
            </Col>
            <Col className="gutter-row" span={4}>
              <Button type="primary" block onClick={this.handleBtnAdd.bind(this)}>添加</Button>
            </Col>
          </Row>
        </div>

        <div className="view">
          <ul className="ul">
            {
              todoList.map((item, index) => {
                return (
                  <li className="li" key={index}>
                    <div className="text">{item.text}</div>
                    <Button className="btn" type="primary"
                      onClick={this.handleToggle.bind(this, index)}
                    >完成</Button>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    );
  }
  handleToggle(index) {
    this.props.toggle(index)
  }
  handleOnChange(e) {
    this.value = e.target.value
  }
  handleBtnAdd() {
    this.props.addTodo(this.value)
  }
}

const mapState = (state) => {
  return {
    todoList: state.todoList
  }
}
const mapDispatch = (dispatch) => {
  return {
    addTodo: (text) => {
      dispatch({
        type: 'ADD',
        text
      })
    },
    toggle: (index) => {
      dispatch({
        type: 'TOGGLE',
        index
      })
    }
  }
}
export default connect(mapState, mapDispatch)(App)
