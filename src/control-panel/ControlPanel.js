import React, { Component } from 'react';
import './ControlPanel.css';

class ControlPanel extends Component {
    render() {
        return (
            <div id="control-panel">
                <div id="format-actions">
                    <button onClick={this.props.onBoldClick} className="format-action" type="button"><b>B</b></button>
                    <button onClick={this.props.onItalicClick} className="format-action" type="button"><i>I</i></button>
                    <button onClick={this.props.onUnderlineClick} className="format-action" type="button"><u>U</u></button>
                </div>
            </div>
        );
    }
}

export default ControlPanel;
