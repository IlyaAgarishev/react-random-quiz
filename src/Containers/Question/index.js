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
      { answer: 'cat' },
      { answer: 'fat' },
      { answer: this.props.rightAnswer },
      { answer: 'rat' }
    ];

    // Fisher-Yates  Shuffle ALGORITHM
    var shuffle = function(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
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
      <div className="question" rightanswer={this.props.rightAnswer}>
        <div className="question-text">Bla bla bla ?</div>
        <form
          className="answers"
          ref={ref => {
            this.answers = ref;
          }}
        >
          {this.state.answersArray.map((element, index) => {
            return <Answer answer={element.answer} key={index} />;
          })}
        </form>
        <button
          className="checkAnswer"
          onClick={() => {
            for (let index = 0; index < this.answers.children.length; index++) {
              if (
                this.answers.children[index].children[0].checked &&
                this.answers.children[index].children[0].getAttribute('answer') ==
                  this.props.rightAnswer
              ) {
                this.props.onChecked(this.props.rightAnswer);
              } else if (
                this.answers.children[index].children[0].checked &&
                this.answers.children[index].children[0].getAttribute('answer') !=
                  this.props.rightAnswer
              ) {
                alert('wrong');
              }
            }
          }}
        >
          Check
        </button>
      </div>
    );
  }
}

export default Question;
