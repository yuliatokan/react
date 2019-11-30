import React from "react";
import './App.css';


export default class ToDoListForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <form
                className="form-horizontal"
                onSubmit={this.props.onClickAdd}>
                <div className="input-group">
                    <input type="text" value={this.props.value} className="form-control"
                           onChange={this.props.onClickChange}
                           placeholder="Something to do"/>
                    <div className="input-group-btn">
                        <button type="submit" className="btn btn-default">
                            <span className="glyphicon glyphicon-plus-sign"></span>
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}