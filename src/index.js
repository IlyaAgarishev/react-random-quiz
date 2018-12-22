import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Question from './Containers/Question';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    for (let index = 0; index < this.quiz.children.length; index++) {
      this.quiz.children[index].style.display = 'none';
    }
    this.quiz.children[0].style.display = 'block';
  }

  onChecked = index => {
    this.setState({ questionIndex: index });
  };

  shouldComponentUpdate(props, state) {
    for (let index = 0; index < this.quiz.children.length; index++) {
      if (this.quiz.children[index].getAttribute('rightanswer') == state.questionIndex) {
        this.quiz.children[index].style.display = 'none';
        if (index + 1 == this.quiz.children.length) {
          console.log('quiz is finished');
        } else {
          this.quiz.children[index + 1].style.display = 'block';
        }
      }
    }
    return true;
  }

  render() {
    return (
      <div
        className="quiz"
        ref={ref => {
          this.quiz = ref;
        }}
      >
        <Question rightAnswer="brad" onChecked={this.onChecked} />
        <Question rightAnswer="swag" onChecked={this.onChecked} />
        <Question rightAnswer="head" onChecked={this.onChecked} />
        <Question rightAnswer="wow" onChecked={this.onChecked} />
        <Question rightAnswer="lol" onChecked={this.onChecked} />
      </div>
    );
  }
}

ReactDOM.render(<Quiz />, document.getElementById('root'));
