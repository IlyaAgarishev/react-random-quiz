import React from "react";
import styles from "./index.module.css";
import Answer from "../Answer";
import { finalAnswersArrayGenerator } from "../../arrayGenerator.js";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsToTest: [
        { word: "Great", translation: "Великий" },
        { word: "Sad", translation: "Грустный" }
      ],
      answers: [],
      questionIndex: 0,
      quizIsFinished: false
    };
  }

  setAnswersArray = answersArray => {
    this.setState({ answersArray: answersArray });
  };

  componentWillMount() {
    this.setState({
      questionWord: this.state.wordsToTest[0].word,
      rightAnswer: this.state.wordsToTest[0].translation.toLowerCase()
    });

    finalAnswersArrayGenerator(
      this.state.wordsToTest[0].translation,
      this.setAnswersArray
    );
  }

  uncheckRadioInputs = inputParents => {
    for (let i = 0; i < inputParents.length; i++) {
      inputParents[i].children[0].checked = false;
    }
  };

  onInputChange = word => {
    this.setState({ selectedAnswer: word });
  };

  render() {
    return this.state.quizIsFinished ? (
      <div className={styles.quizIsFinished}>quiz is finished</div>
    ) : (
      <div
        className={styles.quiz}
        ref={ref => {
          this.quiz = ref;
        }}
      >
        <div className={styles.questionText}>
          "{this.state.questionWord}" переводится как ?
        </div>
        <form
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
                  "_" +
                  element.answer +
                  "_" +
                  index +
                  "_" +
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
          className={styles.checkAnswer}
          ref={ref => {
            this.checkAnswer = ref;
          }}
          onClick={() => {
            if (this.state.selectedAnswer === this.state.rightAnswer) {
              this.quiz.style.background = "#3FFFA6";
              setTimeout(() => {
                this.setState({ questionIndex: this.state.questionIndex + 1 });
                if (
                  this.state.questionIndex !== this.state.wordsToTest.length
                ) {
                  this.setState({
                    questionWord: this.state.wordsToTest[
                      this.state.questionIndex
                    ].word,
                    rightAnswer: this.state.wordsToTest[
                      this.state.questionIndex
                    ].translation.toLowerCase()
                  });
                  finalAnswersArrayGenerator(
                    this.state.rightAnswer,
                    this.setAnswersArray
                  );
                  this.quiz.style.background = "white";
                  this.uncheckRadioInputs(this.quiz.children[1].children);
                } else {
                  this.setState({ quizIsFinished: true });
                }
              }, 700);
            } else {
              this.uncheckRadioInputs(this.quiz.children[1].children);
              this.quiz.style.background = "#ff6c6c";
              setTimeout(() => {
                this.quiz.style.background = "white";
              }, 150);
            }
          }}
        >
          Дальше
        </div>
        <div className={styles.questionsCounter}>
          {this.state.questionIndex + 1} / {this.state.wordsToTest.length}
        </div>
      </div>
    );
  }
}

export default Quiz;
