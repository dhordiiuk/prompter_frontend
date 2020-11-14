import React, {Component} from "react";
import {Input} from 'reactstrap';


class Weight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [...Array(11).keys()],
            active: this.props.active
        }
        this.changeWeight = this.changeWeight.bind(this)
    }

    changeWeight = (e) => {
         this.props.updateWeight(e.target.value)
    }

    render() {
        return (
            <Input type="select"
                   name="select"
                   id="exampleSelect"
                   style={{width: "auto"
                   }}
                   defaultValue={this.state.active}
                   onChange={this.changeWeight}
            >
                {this.state.options.map( o =>
                    <option key={o}
                            value={o}
                    >{o}</option>
                )}
            </Input>
        )
    }
}

export default Weight;