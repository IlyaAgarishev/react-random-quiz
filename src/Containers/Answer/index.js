import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Answer extends React.Component {
  render() {
    return (
      <div className="answer-wrapper">
        <input type="radio" name="answer" id="" className="answer" answer={this.props.answer} />
        {this.props.answer}
      </div>
    );
  }
}

export default Answer;
