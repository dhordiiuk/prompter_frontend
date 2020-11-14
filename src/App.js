import React, {Component} from "react";
import {CardTitle, CardBody, Button} from 'reactstrap';
import Modes from './components/Modes'
import WordsDesk from './components/WordsDesk'
import Game from './components/Game'
import axios from "axios";


const range = (start, stop, step = 1) =>
    Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordsList: [],
            activeMode: {
                description: "",
                minTimeSec: 10,
                maxTimeSec: 15,
                gameTime: 60,
                stateTime: {
                    active: 3,
                    options: range(1, 6, 1),
                }
            },
            isGame: false
        };
        this.updateActiveMode = this.updateActiveMode.bind(this)
        this.toggleGame = this.toggleGame.bind(this)
        this.handleUpdateWordsList = this.handleUpdateWordsList.bind(this)
    }

    componentDidMount() {
        document.title = "Prompter";
    }

    updateActiveMode(mode) {
        this.setState({
            activeMode: {
                description: mode.description,
                minTimeSec: mode.min_time_sec,
                maxTimeSec: mode.max_time_sec,
                gameTime: 60
            }
        });

        axios
            .get(`/api/words/?mode=${mode.id}`)
            .then(res => this.setState({wordsList: res.data}))
            .catch(err => console.log(err));
    }

    toggleGame() {
        this.setState({
            isGame: !this.state.isGame
        })
    }

    handleUpdateWordsList(wordsList) {
        this.setState({
            wordsList: wordsList
        })
    }

    mainMenu() {
        return (
            <main className="content">
                <h1 className="text-white text-uppercase text-center my-4">PROMPTER</h1>
                <Modes updateActiveMode={this.updateActiveMode} />
                <div className="row ">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                            <CardBody>
                                <CardTitle className="text-center"> {this.state.activeMode.description} </CardTitle>
                            </CardBody>
                            <CardBody>
                                <li
                                    key="time menu"
                                    className=" d-flex justify-content-between align-items-center"
                                >
                                    <span style={{fontWeight: 300}}> {"Keep state sec"} </span>
                                     <span style={{fontWeight: 300}}> {`${this.state.activeMode.maxTimeSec}`} </span>
                                </li>
                            </CardBody>
                            <WordsDesk
                                wordsList={this.state.wordsList}
                                updateWordsList={this.handleUpdateWordsList}
                            />
                            <div style={{alignSelf: "center"}}>
                                <Button color="primary"
                                        onClick={e => this.toggleGame()}
                                        disabled={this.state.wordsList.length === 0}
                                >Start training!</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    play() {
        return (
            <Game toggleGame={this.toggleGame} data={this.state}/>
        )
    }

    render() {
        return (
            <div>
                {this.state.isGame ? this.play() : this.mainMenu()}
            </div>
        )
    }
}

export default App;