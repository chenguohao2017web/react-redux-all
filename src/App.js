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
              <Input placeholder="Basic usage"
                onChange={this.handleOnChange.bind(this)}
                onKeyDown={this.handleKeyDown.bind(this)}
              />
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
                  <li className={item.computed ? 'li computed' : 'li'} key={index}>
                    <div className="text">{item.text}</div>
                    <Button className="btn" type="primary"
                      onClick={this.handleToggle.bind(this, index)}
                    >完成</Button>
                  </li>
                )
              })
            }
          </ul>
          <Button style={{ marginTop: '20px' }} className="btn" type="warning"
            onClick={this.handleShowAll.bind(this)}
          >显示已完成</Button>
          <Button style={{ marginTop: '20px' }} className="btn" type="warning"
            onClick={this.reset.bind(this)}
          >还原</Button>
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
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.handleBtnAdd()
    }
  }
  handleBtnAdd() {
    this.props.addTodo(this.value)
  }
  handleShowAll() {
    this.props.showAll()
  }
  reset() {
    this.props.reset()
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
    },
    showAll: () => {
      dispatch({
        type: 'SHOWCOMPUTEDALL'
      })
    },
    reset: () => {
      dispatch({
        type: 'RESET'
      })
    }
  }
}
export default connect(mapState, mapDispatch)(App)
