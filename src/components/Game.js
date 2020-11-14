import React, {Component} from "react";
import {Button} from 'reactstrap';
import Timer from 'react-compound-timer';
import '../css/Show.css';
import _ from 'lodash'
import rwc from "random-weighted-choice"


class Game extends Component {
    constructor(props) {
        super(props);
        let wordsList = _.filter(props.data.wordsList, function (w) {
            return w.use !== false
        });
        wordsList = _.map(wordsList,
            function (w) {
                w.showCount = 0;
                w.isActive = false;
                return w
            }
        )
        this.state = {
            ...props.data.activeMode,
            wordsList: wordsList,
            shownWord: 'Play with me!',
            sec: props.data.activeMode.maxTimeSec
        }
    }

    componentDidMount() {
        this.selectNewWord()
    }

    selectNewWord() {
        function selectRandomWord(wordsList, shownWord) {
            if (wordsList.length > 1) {
                const wordsListNew = _.filter(wordsList, function (w) {
                    return w.name !== shownWord;
                });
                const wordId = rwc(wordsListNew);
                const choosenWord = _.find(wordsList, {id: parseInt(wordId)});
                return choosenWord.name;
            } else {
                return wordsList[0].name;
            }
        }

        const choosenWord = selectRandomWord(this.state.wordsList, this.state.shownWord);

        this.setState({
            shownWord: choosenWord
        });
    }

    resetTimer = (getTime, reset, start) => {
        if (getTime() < 100) {
            reset();
            start();
            this.selectNewWord();
        }
    }

    render() {
        return (
            <div className="Show">
                <header className="Show-header">
                    <div>
                        <p style={{fontSize: "xxx-large"}}>
                            {this.state.shownWord}
                        </p>
                        <Timer
                            initialTime={this.state.sec * 1000}
                            direction="backward"
                            timeToUpdate={995}
                        >
                            {({ start, reset, getTime }) => (
                                <React.Fragment>
                                    <div>
                                        <Timer.Seconds
                                            onChange={this.resetTimer(getTime, reset, start)}
                                        />
                                    </div>
                                    <br />
                                </React.Fragment>
                            )}
                        </Timer>
                    </div>
                    <div className="stop-training">
                        <Button outline color="primary"
                                onClick={e => this.props.toggleGame()}
                        >Stop</Button>
                    </div>
                </header>
            </div>
        )
    }
}

export default Game;