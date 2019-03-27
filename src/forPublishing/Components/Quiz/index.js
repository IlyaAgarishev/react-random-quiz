import React from "react";
import styles from "./index.module.css";
import Answer from "../Answer";
import { finalAnswersArrayGenerator } from "../../arrayGenerator.js";
import {
  setQuizBackground,
  uniqueIdGenerator,
  uncheckRadioInputs
} from "../../ponyFunctions.js";
import PropTypes from "prop-types";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsToTest: this.props.wordsToTest
        ? this.props.wordsToTest
        : [
            { word: "Great", translation: "Великий" },
            { word: "Sad", translation: "Грустный" },
            { word: "Cat", translation: "Кот" },
            { word: "Dog", translation: "Собака" }
          ],
      answers: [],
      questionIndex: 0,
      quizIsFinished: false,
      background: "white"
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

  onInputChange = word => {
    this.setState({ selectedAnswer: word });
  };

  render() {
    return this.state.quizIsFinished ? (
      <div className={styles.quizIsFinished}>quiz is finished</div>
    ) : (
      <div
        className={setQuizBackground(this.state.background, styles)}
        ref={ref => {
          this.quiz = ref;
        }}
      >
        <div className={styles.questionText}>
          "{this.state.questionWord}" переводится как ?
        </div>
        <form>
          {this.state.answersArray.map((element, index) => {
            return (
              <Answer
                onInputChange={this.onInputChange}
                answer={element.answer}
                key={index}
                answerId={uniqueIdGenerator(
                  this.state.questionWord,
                  element.answer,
                  index
                )}
              />
            );
          })}
        </form>
        <div
          className={styles.checkAnswer}
          onClick={() => {
            if (this.state.selectedAnswer === this.state.rightAnswer) {
              this.setState({ background: "green" });
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
                  this.setState({ background: "white" });
                  uncheckRadioInputs(this.quiz.children[1].children);
                } else {
                  this.setState({ quizIsFinished: true });
                }
              }, 700);
            } else {
              this.setState({ background: "red" });
              uncheckRadioInputs(this.quiz.children[1].children);
              setTimeout(() => {
                this.setState({ background: "white" });
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

Quiz.propTypes = {
  wordsToTest: PropTypes.array.isRequired
};

export default Quiz;
