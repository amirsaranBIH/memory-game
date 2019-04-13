import React, { Component } from 'react';

class Card extends Component {
    render() {
        return (
            <div onClick={e => this.props.onClick(e, this.props.card)} className={'card card-' + this.props.card.state}>
                <img src={`/images/${this.props.card.img}.png`} alt="" />
            </div>
        );
    }
}

export default Card;