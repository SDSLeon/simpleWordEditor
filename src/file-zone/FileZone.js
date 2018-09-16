import React, { Component } from 'react';
import cx from 'classnames';
import './FileZone.css';
import Synonyms from '../synonyms/Synonyms'; 

const handleClickWord = (index, handler) => () => handler(index);

class FileZone extends Component {
    render() {
        const { text, onClickWord, selectedWordIndex, format, onReplaceWord } = this.props;

        return (
            <div id="file-zone">
                <div id="file">
                    {text.split(' ').map((word, index) => (
                        <React.Fragment>
                            <span> </span>
                            <span
                                key={index}
                                className={cx({ 
                                    selected: selectedWordIndex === index,
                                    bold: !!format.find((item) => item.index === index && item.style === 'bold'),
                                    italic: !!format.find((item) => item.index === index && item.style === 'italic'),
                                    underline: !!format.find((item) => item.index === index && item.style === 'underline')
                                })}
                                onDoubleClick={handleClickWord(index, onClickWord)}
                            >{word}</span>
                            <span> </span>
                        </React.Fragment>
                    ))}
                </div>
                <Synonyms onWordClick={onReplaceWord}/>
            </div>
        );
    }
}

export default FileZone;
