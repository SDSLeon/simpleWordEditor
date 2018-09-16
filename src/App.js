import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import getMockText from './text.service';
import synonymsStore from './synonyms.store';

class App extends Component {
    state = {
        text: '',
        selectedWordIndex: '',
        format: [],
    }

    componentDidMount() {
        this.getText();
    }

    getText = async () => {
        const text = await getMockText();
        
        this.setState({ text });
    }

    handleClickWord = (selectedWordIndex) => {
        this.setState({ selectedWordIndex });
        this.requestGetSynoms(selectedWordIndex)
    }

    requestGetSynoms = async (selectedWordIndex) => {
        const word = this.state.text.split(' ')[selectedWordIndex];

        synonymsStore.fetchSynonyms(word)
    }

    handleClickBold = () => {
        this.handleApplyStyle('bold');
    }
    
    handleItalicClick = () => {
        this.handleApplyStyle('italic');
    }
    
    handleUnderlineClick = () => {
        this.handleApplyStyle('underline');
    }

    handleApplyStyle = (applyedStyle) => {
        const { format, selectedWordIndex } = this.state;
        const intFormat = [ ...format ];
        const formatIndex = intFormat.findIndex(item => item.index === selectedWordIndex && item.style === applyedStyle);

        if (formatIndex > -1) {
            intFormat.splice(formatIndex, 1)
        } else {
            intFormat.push({ index: selectedWordIndex, style: applyedStyle })
        }

        this.setState({  format: intFormat  });
    }

    handleReplaceWord = (synonym) => {
        const newText = this.state.text.split(' ').map((word, index) => {
            if (index === this.state.selectedWordIndex) {
                return synonym;
            }

            return word;
        }).join(' ');

        this.setState({ text: newText }, () => {
            this.requestGetSynoms(this.state.selectedWordIndex)
        });
    }

    render() {
        const { text, selectedWordIndex, format } = this.state;

        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <ControlPanel
                        isWordSelected={selectedWordIndex}
                        onBoldClick={this.handleClickBold}
                        onItalicClick={this.handleItalicClick}
                        onUnderlineClick={this.handleUnderlineClick}
                    />
                    <FileZone
                        format={format}
                        onClickWord={this.handleClickWord}
                        selectedWordIndex={selectedWordIndex}
                        text={text} 
                        onReplaceWord={this.handleReplaceWord}
                    />
                </main>
            </div>
        );
    }
}

export default App;
