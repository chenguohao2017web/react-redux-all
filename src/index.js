import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Item from '../node_modules/antd/lib/list/Item';
import { Object } from 'core-js';
const todoApp = {
  todoList: [{
    text: '记得今天去买菜',
    computed: false
  }]

}

const reducers = (state = todoApp, action) => {
  switch (action.type) {
    case 'ADD':
      return { todoList: [...state.todoList, { text: action.text, computed: false }] }
    case 'TOGGLE':
      return {
        todoList: [...state.todoList.map((Item, index) => {
          if (index === action.index) {
            return Object.assign({}, item, {
              computed: true
            })
          }
          return item
        })]
      }
    default:
      return state
  }
}

const store = createStore(reducers)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
