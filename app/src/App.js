import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addTodo,deleteTodo} from './redux/todos';
import { bindActionCreators } from 'redux'

class App extends Component {
	constructor(props){
		super(props);
		this.state={
			text:''
		}
	}
	submit(event){
		event.preventDefault();
		this.props.addTodo(event.target.txt.value);
		event.target.txt.value = '';
		console.log(this.props.todos);
	}
	list(){
		return this.props.todos.map((todo,index)=>
		 <tr key={index}>
		 <td width="100px">{todo.text}</td>
		 <td><a onClick={()=>this.del(todo.text)}>Delete</a></td>
		 </tr>
		);
	}
	del(txt){
		this.props.deleteTodo(txt);
	}
  render() {
	  //console.log(this.props.todos);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
		<div className="container">
		<div className="row">
		<form onSubmit={this.submit.bind(this)}>
		<div className="form-group ">
		<div className="col-md-12">
		<div className="col-md-3">
		<label >Enter value:</label>
		</div>
		<div className="col-md-5">
			<input type="text" name="txt" className="form-control"/>
			</div>
			<div className="col-md-1">
			<input type="submit" name="sub" className="btn btn-success" value="Submit"/>
			</div>
			</div>
			</div>
		</form>
		<table>
		  <tbody>
		   {this.list()}
		  </tbody>
		</table>
		</div>
		</div>
		
      </div>
    );
  }
}

const mapSatetToProps = state => {
  return {
    todos:state.todos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTodo:bindActionCreators(addTodo, dispatch),
	deleteTodo:bindActionCreators(deleteTodo, dispatch)
  }
}

App.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
}

export default App = connect(
  mapSatetToProps,
  mapDispatchToProps
)(App);


