import React, { Component } from 'react';

class Joke extends Component {
    constructor(props) {
        super(props)
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
    }

    handleAdd() {
        this.props.handleScore(this.props.id, 1);
    }

    handleDecrease() {
        this.props.handleScore(this.props.id, -1);

    }

    render() {
        return (
            <div>
                <p>{this.props.text}</p>
                <button onClick={this.handleAdd}>Add</button>
                <p>{this.props.score}</p>
                <button onClick={this.handleDecrease}>Decrease</button>
                <hr/>
            </div>
        )
    }
}

export default Joke;