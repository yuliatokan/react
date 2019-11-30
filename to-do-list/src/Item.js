import React from 'react'
import './App.css';

export default class Item extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let cn = 'bs-callout'
        cn += this.props.done ? ' bs-callout-success' : ' bs-callout-info';

        return (
            <div id={this.props.id} className={cn}>
                <span className="spn" onClick={this.props.onClickItem}>{this.props.value}</span>
                <i className="close" onClick={this.props.onClickClose}>&times;</i>
            </div>
        )
    }
}