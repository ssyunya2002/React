import React, { Component } from 'react';
import './App.css';
import ToDoItem from './components/ToDoItem';

class App extends Component {
  constructor(){
    super();
    this.state = {
      todos: [
        {id: 1, text: 'dataを表示する', isDone: false},
        {id: 2, text: '簡単な構成を知る', isDone: false}
      ],
      newTodo: {text: ''}
    };
  };

  hundleInput = e =>{
    const newId = Math.max.apply(null, this.state.todos.map(t => t.id)) + 1;
    console.log(newId);
    this.setState({
      newTodo: {id: newId, text:e.target.value, isDone: false}
    });
  };

  createNewToDoItem = () =>{
    this.setState(({todos, newTodo}) => ({
      todos: [
        ...todos,
        //...はSpread operator（スプレッドオペレータ）で、spread operatorによって式が(関数の呼び出しのための)複数の引数か(配列リテラルのための)複数の要素が期待される場所で拡張されます。
        newTodo
      ],
      newTodo: { text: ''}
    }));
  };

  deleteToDo = item => {
    this.setState(({todos})=> ({
      todos: todos.filter((todo) =>todo.id !== item.id)
    }));
  };

  toggleCheckBox = item =>{
    const tempTodos = this.state.todos.map(todo => {
      if(todo === item){
        todo.isDone = !todo.isDone;
      }
      return todo
    });

    this.setState(({ todos })=>({
      todos: tempTodos
    }));
  };

  render() {
    let remaining = this.state.todos.filter(function(todo){
      return !todo.isDone;
    });
    return (
      <div className="App">
        <h1>
          My todos
          <span>({remaining.length}/{this.state.todos.length})</span>
        </h1>
        <ul>
          {this.state.todos.map((item, key) =>{
            return(
              <ToDoItem
                key={key}
                text={item.text}
                toggleCheckBox={this.toggleCheckBox.bind(this, item)}
                deleteToDo={this.deleteToDo.bind(this,item)}
                />
            )
          })}
        </ul>
        <div>
          <input type="text" value={this.state.newTodo.text} onChange={this.handleInput} />
          <button onClick={this.createNewToDoItem}>+</button>
        </div>
      </div>
    );
  }
}

export default App;
