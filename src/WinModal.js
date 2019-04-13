import React, { Component } from 'react';

class WinModal extends Component {
    render() {
        return (
            <div class="win-modal">
                <h1>YOU FINISHED!</h1>
                <div class="buttons">
                    <span onClick={this.props.startNewGame} class="btn" title="Play another game of memory.">Play Again</span>
                    <a class="btn" href="https://github.com/amirsaranBIH" title="Check out my other projects." target="_blank" rel="noopener noreferrer">Check out my GitHub!</a>
                </div>
            </div>
        );
    }
}

export default WinModal;
