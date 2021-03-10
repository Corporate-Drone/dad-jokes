import axios from 'axios';
import React, { Component } from 'react';
import Joke from './Joke';
import { v4 as uuidv4 } from 'uuid';
const url = 'https://icanhazdadjoke.com/'
import './JokeList.css';

class JokeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: [],
        }
        this.getJokes = this.getJokes.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleScore = this.handleScore.bind(this);
        this.sortJokes = this.sortJokes.bind(this);
    }

    componentDidMount() {
        this.getJokes();
    }

    sortJokes() {
        this.state.jokes.sort(function (a, b) {
            return b.score - a.score
        })

    }

    handleClick() {
        this.getJokes();
    }

    handleScore(id, delta) {
        //find id of joke and add/subtract score
        //change score then create new array copy of jokes
        this.setState(
            st => ({
                jokes: st.jokes.map(j =>
                    j.id === id ? { ...j, score: j.score + delta } : j)
            })
        )
    }

    async getJokes() {
        for (let i = 0; i < 10; i++) {
            let response = await axios.get(url, { headers: { "Accept": "text/plain" } });
            //prevent duplicate jokes from being added
            if (!this.state.jokes.includes(response.data)) {
                let newJoke = { text: response.data, score: 0, id: uuidv4() }
                this.setState(state => ({
                    jokes: [...state.jokes, newJoke]
                }))
            }

        }
    }

    render() {
        this.sortJokes();
        const allJokes = this.state.jokes.map(joke => (
            <Joke
                key={joke.id}
                id={joke.id}
                text={joke.text}
                handleScore={this.handleScore}
                score={joke.score}
            />
        ))
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">
                        <span>Dad</span> Jokes
                    </h1>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
                    <button className='JokeList-getmore' onClick={this.handleClick}>
                        Fetch Jokes
                    </button>
                </div>

                <div className="JokeList-jokes">
                {allJokes}
                </div>
                
            </div>
        )
    }
}

export default JokeList;