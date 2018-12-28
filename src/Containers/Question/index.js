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
    this.state = {
      wordsToTest: [
        { word: 'Great', translation: 'Великий' },
        { word: 'Sad', translation: 'Грустный' },
        { word: 'Rat', translation: 'Крыса' },
        { word: 'Pet', translation: 'Питомец' }
      ],
      answers: [],
      questionIndex: 0,
      quizIsFinished: false
    };
  }

  componentWillMount() {
    this.setState({
      questionWord: this.state.wordsToTest[0].word,
      rightAnswer: this.state.wordsToTest[0].translation
    });
    // let wordsToTest = [];
    // for (let i = 0; i < 100; i++) {
    //   wordsToTest.push({ word: `Word_${i}`, translation: `слово_${i}` });
    // }
    // this.setState({ wordsToTest: wordsToTest });

    this.finalAnswersArrayGenerator(this.state.wordsToTest[0].translation);
  }

  takeRandomWordFromArray = array => {
    return array[Math.floor(Math.random(0, 1) * array.length)].toLowerCase();
  };

  createAnswersArray = (array, rightAnswer) => {
    var answersArray = [
      { answer: rightAnswer },
      { answer: this.takeRandomWordFromArray(array) },
      { answer: this.takeRandomWordFromArray(array) },
      { answer: this.takeRandomWordFromArray(array) }
    ];

    return answersArray;
  };

  smartAnswersCreator = rightAnswer => {
    var xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20181222T134922Z.9d94e99b6da5e84a.19d04de00934554d34f2a675f0100fd307a76107&lang=ru-en&text=${rightAnswer}`,
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
        return this.createAnswersArray(Adjectives, rightAnswer);
      } else if (partOfSpeach == 'adverb') {
        return this.createAnswersArray(Adverbs, rightAnswer);
      } else if (partOfSpeach == 'conjunction' || partOfSpeach == 'particle') {
        return this.createAnswersArray(Conjunctions, rightAnswer);
      } else if (partOfSpeach == 'noun') {
        return this.createAnswersArray(Nouns, rightAnswer);
      } else if (partOfSpeach == 'numeral') {
        return this.createAnswersArray(Numerous, rightAnswer);
      } else if (partOfSpeach == 'preposition') {
        return this.createAnswersArray(Prepositions, rightAnswer);
      } else if (partOfSpeach == 'pronoun') {
        return this.createAnswersArray(Pronouns, rightAnswer);
      } else if (partOfSpeach == 'verb') {
        return this.createAnswersArray(Verbs, rightAnswer);
      } else {
        return this.createAnswersArray(Nouns, rightAnswer);
      }
    }
  };

  // Fisher-Yates Shuffle ALGORITHM
  shuffleArray = array => {
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

  uncheckRadioInputs = children => {
    for (let i = 0; i < children.length; i++) {
      children[i].children[0].checked = false;
    }
  };

  finalAnswersArrayGenerator = rightAnswer => {
    var answersArray = this.smartAnswersCreator(rightAnswer.toLowerCase());
    // Shuffling this array
    this.shuffleArray(answersArray);
    // Than setting it to state
    this.setState({ answersArray: answersArray });
  };

  onInputChange = word => {
    this.setState({ selectedAnswer: word });
  };

  render() {
    return this.state.quizIsFinished ? (
      <div className="quizIsFinished">Тест пройден</div>
    ) : (
      <div
        className="question"
        ref={ref => {
          this.question = ref;
        }}
      >
        <div className="question-text">"{this.state.questionWord}" переводится как ?</div>
        <form
          className="answers"
          ref={ref => {
            this.answers = ref;
          }}
        >
          {this.state.answersArray.map((element, index) => {
            return (
              <Answer
                onInputChange={this.onInputChange}
                answer={element.answer}
                key={index}
                answerId={
                  this.state.questionWord +
                  '_' +
                  element.answer +
                  '_' +
                  index +
                  '_' +
                  Math.floor(Math.random(0, 1) * 1000)
                }
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
            console.log(this.question.children[1].children[0].children[0]);

            if (this.state.selectedAnswer == this.state.rightAnswer.toLowerCase()) {
              this.question.style.background = '#3FFFA6';
              setTimeout(() => {
                this.setState({ questionIndex: this.state.questionIndex + 1 });
                if (this.state.questionIndex != this.state.wordsToTest.length) {
                  this.setState({
                    questionWord: this.state.wordsToTest[this.state.questionIndex].word,
                    rightAnswer: this.state.wordsToTest[this.state.questionIndex].translation
                  });
                  this.finalAnswersArrayGenerator(this.state.rightAnswer);
                  this.question.style.background = 'white';
                  this.uncheckRadioInputs(this.question.children[1].children);
                } else {
                  this.setState({ quizIsFinished: true });
                }
              }, 700);
            } else {
              this.uncheckRadioInputs(this.question.children[1].children);
              this.question.style.background = '#ff6c6c';
              setTimeout(() => {
                this.question.style.background = 'white';
              }, 150);
            }
          }}
        >
          Дальше
        </div>
        <div className="questionsCounter">
          {this.state.questionIndex + 1} / {this.state.wordsToTest.length}
        </div>
      </div>
    );
  }
}

export default Question;
