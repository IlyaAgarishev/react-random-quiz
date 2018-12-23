import React from 'react';
import './index.css';
import Answer from '../Answer';
import Adjectives from '../../RussianDictionary/adjectives.js';
import Adverbs from '../../RussianDictionary/adverbs.js';
import Conjunctions from '../../RussianDictionary/conjunctions.js';
import Nouns from '../../RussianDictionary/nouns.js';
import Numerous from '../../RussianDictionary/numerous.js';
import Prepositions from '../../RussianDictionary/prepositions.js';
import Pronouns from '../../RussianDictionary/pronouns.js';
import Verbs from '../../RussianDictionary/verbs.js';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = { answers: [] };
  }

  takeRandomWordFromRussianDictionary = array => {
    return array[Math.floor(Math.random(0, 1) * array.length)];
  };

  createAnswersArray = array => {
    var answersArray = [
      { answer: this.takeRandomWordFromRussianDictionary(array) },
      { answer: this.takeRandomWordFromRussianDictionary(array) },
      { answer: this.props.rightAnswer.toLowerCase() },
      { answer: this.takeRandomWordFromRussianDictionary(array) }
    ];

    return answersArray;
  };

  answersArrayGenerator = () => {
    var xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20181222T134922Z.9d94e99b6da5e84a.19d04de00934554d34f2a675f0100fd307a76107&lang=ru-en&text=' +
        this.props.rightAnswer,
      false
    );
    xhr.send();
    if (xhr.status != 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    } else {
      var data = JSON.parse(xhr.responseText);
      if (data.def.length == 0) {
        var partOfSpeach = 'noun';
      } else {
        var partOfSpeach = data.def[0].pos;
      }

      if (partOfSpeach == 'adjective') {
        return this.createAnswersArray(Adjectives);
      } else if (partOfSpeach == 'adverb') {
        return this.createAnswersArray(Adverbs);
      } else if (partOfSpeach == 'conjunction' || partOfSpeach == 'particle') {
        return this.createAnswersArray(Conjunctions);
      } else if (partOfSpeach == 'noun') {
        return this.createAnswersArray(Nouns);
      } else if (partOfSpeach == 'numeral') {
        return this.createAnswersArray(Numerous);
      } else if (partOfSpeach == 'preposition') {
        return this.createAnswersArray(Prepositions);
      } else if (partOfSpeach == 'pronoun') {
        return this.createAnswersArray(Pronouns);
      } else if (partOfSpeach == 'verb') {
        return this.createAnswersArray(Verbs);
      } else {
        return this.createAnswersArray(Nouns);
      }
    }
  };

  componentWillMount() {
    var answersArray = this.answersArrayGenerator();

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
        <div className="question-text">"{this.props.questionWord}" переводится как ?</div>
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
              var inputRadio = this.answers.children[index].children[0];
              if (
                inputRadio.checked &&
                inputRadio.getAttribute('answer') == this.props.rightAnswer.toLowerCase()
              ) {
                this.question.style.background = '#3fffa6';
                setTimeout(() => {
                  this.props.onChecked(this.props.rightAnswer);
                }, 800);
              } else if (
                inputRadio.checked &&
                inputRadio.getAttribute('answer') != this.props.rightAnswer
              ) {
                this.question.style.background = '#ff6c6c';
                setTimeout(() => {
                  this.question.style.background = 'white';
                }, 150);
                inputRadio.checked = false;
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
