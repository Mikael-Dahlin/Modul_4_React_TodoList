import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import axios from 'axios';

import './App.css';

class App extends Component{
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data}))
      .catch(console.error);;
  }

  // Toggle complete
  markComplete = (id) => {
    // Find todo with provided id and toggle completed state.
    const newTodos = this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    });

    // Set state with new todos.
    this.setState({ todos: newTodos });
  }

  // Temporary id generator
  idGenerator = () => {
    const ids = this.state.todos.map(todo => todo.id);
    for(let newId = 1; newId <= ids.length + 1; newId++){
      if(!ids.includes(newId)) return newId;
    }
  }

  // Add Todo
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    }).then((res) => {
      // generate new id to not break application (all post requests get same id '201')
      res.data.id = this.idGenerator();
      
      const newTodos = [...this.state.todos, res.data];
      this.setState({ todos: newTodos });
    }).catch(console.error);
  }

  // Delete Todo
  deleteTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => {
        const newTodos = this.state.todos.filter(todo => todo.id !== id);
        this.setState({ todos: newTodos });
      }).catch(console.error);
  }
      
  render() {
    return (
      <Router>
        <div className="App">
          <div className="conatiner">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo 
                  addTodo={this.addTodo}
                />
                <Todos 
                  todos={this.state.todos} 
                  markComplete={this.markComplete} 
                  deleteTodo={this.deleteTodo}
                />
              </React.Fragment>
            )} />
            <Route path="/about/" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
