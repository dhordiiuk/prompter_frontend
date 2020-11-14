import React, {Component} from "react";
import {Input} from "reactstrap";
import Weight from './Weight'


class WordItem extends Component {
    constructor(props) {
        super(props);
        this.toggleCheckox = this.toggleCheckox.bind(this);
        this.handleUpdateWeight = this.handleUpdateWeight.bind(this);
    }

    toggleCheckox() {
        const word = {
            ...this.props.word,
            use: !this.props.word.use
        }
        this.props.handleUpdateWord(word)
    }

    handleUpdateWeight(value) {
        const word = {
            ...this.props.word,
            importance: value
        }
        this.props.handleUpdateWord(word)
    }

    render() {
        return (
            <li
                key={this.props.word.id}
                className="list-group-item d-flex justify-content-between"
            >
                <span
                    title={this.props.word.name}
                >
              {this.props.word.name}
            </span>
                <span>
                    <Input type="checkbox"
                           id={this.props.word.id}
                           checked={this.props.word.use}
                           onChange={this.toggleCheckox}
                    />
                   <Weight active={this.props.word.weight}
                           updateWeight={this.handleUpdateWeight}
                   />
                </span>
            </li>
        )
    }
}

export default WordItem;