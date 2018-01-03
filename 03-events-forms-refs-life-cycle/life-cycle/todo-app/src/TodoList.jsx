import React, { Component } from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';


class TodoList extends Component{
	constructor(props){
		super(props);
		this.state = {
			todos : [
				{id: 1, title: 'chore', description: 'wash pots and pans', isComplete: false},
				{id: 2, title: 'chore', description: 'mow the lawn', isComplete: true}
			],
			idCounter : 3,
			inputTitle : '',
			inputDescription: '' 
		}


		this.handleMarkComplete = this.handleMarkComplete.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}

	handleMarkComplete(id){
		let updatedTodos = this.state.todos.map(val => {
			if(val.id === id){
				val.isComplete = true;
			}
			return val;
		})
		this.setState({todos: updatedTodos});
	}

	handleRemove(id){
		this.setState({todos : [...this.state.todos.filter(val => val.id !==id)]});
	}

	handleAdd(e){
		e.preventDefault();
		let newTodo = {id: this.state.idCounter, 
			description: this.state.inputDescription, 
			title: this.state.inputTitle,
			isComplete: false
		}
		this.setState({idCounter: this.state.idCounter + 1});
		this.setState({inputTitle: ''});
		this.setState({inputDescription: ''});
		this.setState({todos: [...this.state.todos, newTodo]});
	}

	handleInputChange(e){
		this.setState({[e.target.name] : e.target.value});

	}

	handleEdit(id, title, description){
		let updatedTodos = this.state.todos.map(val => {
			if (val.id === id){
				val.title = title;
				val.description = description;
			}
			return val;
		});
		this.setState({todos: updatedTodos});
	}


	render(){
		let todoListItems = this.state.todos.map(val => {
			return ( 	
				<Todo 
				key={val.id}
				id={val.id}
				title={val.title}
				description = {val.description}
				isComplete = {val.isComplete}
				markComplete={this.handleMarkComplete.bind(this,val.id)}
				remove={this.handleRemove.bind(this,val.id)}
				edit={this.handleEdit}
				/>		
				)
		} )
		return (
			<div>
				<NewTodoForm
					inputTitle = {this.state.inputTitle}
					inputDescription = {this.state.inputDescription}
					inputChange = {this.handleInputChange}
					addTodo = {this.handleAdd}
				/>
				<ul>
					{ todoListItems }
				</ul>
			</div>	
		)	
	}

}

export default TodoList;