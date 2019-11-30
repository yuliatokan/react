import React from 'react'
import './App.css';
import ToDoListForm from "./ToDoListForm";
import Item from "./Item";
import nanoid from 'nanoid'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            todos: [],
            value: '',
            all: true,
            done: false
        }
    }

    addItem(e) {
        e.preventDefault();
        let todos = this.state.todos

        if (this.state.value.length != 0) {
            todos.push({
                id: nanoid(),
                value: this.state.value,
                done: false
            });

            this.setState({todos: todos, value: ''});
        }
    }

    removeAllDone() {
        let data = this.state.todos.filter(todo => !todo.done)
        this.setState({
            todos: data
        })
    }

    removeItem(id) {
        let data = this.state.todos.filter(todo => todo.id !== id)
        this.setState({
            todos: data
        })
    }

    markDone(id) {
        let data = this.state.todos.map(todo => {
            if (todo.id === id)
                todo.done = !todo.done
            return todo
        });
        this.setState({
            todos: data
        })
    }

    handleFormInput(e) {
        this.setState({value: e.target.value});
    }

    getAll() {
        this.setState({all: true});
    }

    getDone(done) {
        this.setState({all: false, done: done});
    }

    render() {
        let todos;
        if (this.state.all)
            todos = this.state.todos;
        else todos = this.state.todos.filter(todo => (this.state.done && todo.done) || (!this.state.done && !todo.done));

        todos = todos.map((todo, i) => {
            return (
                <Item
                    key={todo.id}
                    id={todo.id}
                    value={todo.value}
                    done={todo.done}
                    onClickClose={this.removeItem.bind(this, todo.id)}
                    onClickItem={this.markDone.bind(this, todo.id)}
                />
            )
        });

        let count = 0;
        this.state.todos.map((todo) => {
            if (!todo.done) {
                count++;
            }
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <h1>--------ToDo List--------</h1>

                        <ToDoListForm
                            onClickChange={this.handleFormInput.bind(this)}
                            value={this.state.value}
                            onClickAdd={this.addItem.bind(this)}
                        />

                        {todos}

                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-default" onClick={this.getAll.bind(this)}>All
                            </button>
                            <button type="button" className="btn btn-default"
                                    onClick={this.getDone.bind(this, false)}>Active
                            </button>
                            <button type="button" className="btn btn-default"
                                    onClick={this.getDone.bind(this, true)}>Completed
                            </button>
                        </div>
                        <button type="button" className="btn btn-default rght" aria-label="Left Align"
                                onClick={this.removeAllDone.bind(this)}>
                            <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        </button>
                        <span className="spn rght">Active: {count}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
