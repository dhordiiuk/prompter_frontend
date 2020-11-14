import React, {Component} from "react";
import WordItem from "./WordItem";
import _ from "lodash"


class WordsDesk extends Component {
    constructor(props) {
        super(props);
        this.handleUpdateWord = this.handleUpdateWord.bind(this)
    }

    handleUpdateWord(word) {
        let wordsList = this.props.wordsList
        const idx = _.findIndex(wordsList, function(w) { return w.id == word.id})
        wordsList[idx] = word
        this.props.updateWordsList(wordsList)
    }

    render() {
        return (
            <div>
                <li
                    key="some key"
                    className="list-group-item d-flex justify-content-between align-items-center"
                >
                <span style={{fontWeight: 100}}> {"Word"} </span>
                <span style={{fontWeight: 100}}> {"Weight"} </span>
                </li>

                <ul className="list-group list-group-flush">
                    {this.props.wordsList.map(
                        word => <WordItem
                                    word={word}
                                    key={word.id}
                                    handleUpdateWord={this.handleUpdateWord}
                        />
                        )
                    }
                </ul>
                <div className="">
                </div>
            </div>
        )
    }
}

export default WordsDesk;
