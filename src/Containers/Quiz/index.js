import React from 'react';
import './index.css';
import Question from '../Question';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    for (let index = 0; index < this.quiz.children.length; index++) {
      this.quiz.children[index].style.display = 'none';
    }
    this.quiz.children[0].style.display = 'flex';
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
          this.quiz.children[index + 1].style.display = 'flex';
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
        <Question rightAnswer="Великий" questionWord="Great" onChecked={this.onChecked} />
        <Question rightAnswer="Грустный" questionWord="Sad" onChecked={this.onChecked} />
        <Question rightAnswer="Крыса" questionWord="Rat" onChecked={this.onChecked} />
        <Question rightAnswer="Питомец" questionWord="Pet" onChecked={this.onChecked} />
        <div>quiz is finished</div>
      </div>
    );
  }
}

export default Quiz;
