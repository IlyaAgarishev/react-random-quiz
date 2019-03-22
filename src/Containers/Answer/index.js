import React from "react";
import "./radio.css";
import styles from "./index.module.css";
import PropTypes from "prop-types";

export const Answer = props => {
  const { answerId, answer, onInputChange } = { ...props };
  return (
    <div className={styles.answerWrapper}>
      <input
        type="radio"
        name="answer"
        id={answerId}
        onChange={() => {
          onInputChange(answer);
        }}
      />
      <label id={answerId} htmlFor={answerId} className={styles.answerWord}>
        {answer}
      </label>
    </div>
  );
};

Answer.propTypes = {
  answerId: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default Answer;
