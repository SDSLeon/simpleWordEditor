import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './Synonyms.css';
import synonymsStore from '../synonyms.store';

const handleClickWord = (word, handler) => () => handler(word);

class Synonyms extends Component {
    render() {
        const { onWordClick } = this.props;

        return (
            <div className="synonyms">
                {synonymsStore.list.map(item => (
                    <div className='synonyms-word' onClick={handleClickWord(item, onWordClick)}>{item}</div>
                ))}
            </div>
        );
    }
}

export default observer(Synonyms);
