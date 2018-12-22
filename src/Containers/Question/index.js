import React from 'react';
import './index.css';
import Answer from '../Answer';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = { answers: [] };
  }

  componentWillMount() {
    var answersArray = [
      { answer: 'Кот' },
      { answer: 'Толстый' },
      { answer: this.props.rightAnswer },
      { answer: 'Сова' }
    ];

    // Fisher-Yates Shuffle ALGORITHM
    var shuffle = function(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };

    shuffle(answersArray);

    this.setState({ answersArray: answersArray });
  }

  render() {
    return (
      <div
        className="question"
        rightanswer={this.props.rightAnswer}
        ref={ref => {
          this.question = ref;
        }}
      >
        <div className="question-text">{this.props.questionWord} переводится как ?</div>
        <form
          className="answers"
          ref={ref => {
            this.answers = ref;
          }}
        >
          {this.state.answersArray.map((element, index) => {
            return (
              <Answer
                answer={element.answer}
                key={index}
                answerId={this.props.questionWord + '_' + element.answer + '_' + index}
                ref={ref => {
                  this.answer = ref;
                }}
              />
            );
          })}
        </form>
        <div
          className="checkAnswer"
          ref={ref => {
            this.checkAnswer = ref;
          }}
          onClick={() => {
            for (let index = 0; index < this.answers.children.length; index++) {
              if (
                this.answers.children[index].children[0].checked &&
                this.answers.children[index].children[0].getAttribute('answer') ==
                  this.props.rightAnswer
              ) {
                this.question.style.background = '#3fffa6';
                setTimeout(() => {
                  this.props.onChecked(this.props.rightAnswer);
                }, 800);
              } else if (
                this.answers.children[index].children[0].checked &&
                this.answers.children[index].children[0].getAttribute('answer') !=
                  this.props.rightAnswer
              ) {
                this.question.style.background = '#ff6c6c';
                setTimeout(() => {
                  this.question.style.background = 'white';
                }, 150);

                this.answers.children[index].children[0].checked = false;
              }
            }
          }}
        >
          Дальше
        </div>
      </div>
    );
  }
}

export default Question;
