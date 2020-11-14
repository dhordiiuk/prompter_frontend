import React, {Component} from "react";
import {Nav, NavItem, NavLink} from 'reactstrap';
import axios from "axios";


class Modes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMode: {
                id: 0,
                name: "",
                description: "",
                min_time: 0,
                max_time: 0
            },
            modesList: [],
        }
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios
            .get("/api/modes/")
            .then(res => {
                    this.setState({
                        modesList: res.data
                    });
                    this.activateMode(res.data[0])
                }
            )
            .catch(err => console.log(err));
    };

    activateMode = (mode) => {
        this.setState({activeMode: mode});
        this.props.updateActiveMode(mode);
    };

    renderModes = () => {
        const modesItems = this.state.modesList
        return modesItems.map(mode => (
            <NavItem key={mode.id}>
                <NavLink
                    active={mode.id === this.state.activeMode.id}
                    onClick={() => this.activateMode(mode)}
                    href='#'>
                    {mode.name}
                </NavLink>
            </NavItem>
        ));
    };

    render() {
        return (
            <div className="col-md-6 col-sm-10 mx-auto p-0 ">
                <Nav>
                    {this.renderModes()}
                </Nav>
            </div>
        )
    }
}

export default Modes;