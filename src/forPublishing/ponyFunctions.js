export const setQuizBackground = (background, styles) => {
  if (background === "white") {
    return styles.quiz;
  } else if (background === "green") {
    return [styles.quiz, styles.green].join(" ");
  } else if (background === "red") {
    return [styles.quiz, styles.red].join(" ");
  }
};

export const uniqueIdGenerator = (questionWord, answer, index) => {
  return (
    questionWord +
    "_" +
    answer +
    "_" +
    index +
    "_" +
    Math.floor(Math.random(0, 1) * 1000)
  );
};

export const uncheckRadioInputs = inputParents => {
  for (let i = 0; i < inputParents.length; i++) {
    inputParents[i].children[0].checked = false;
  }
};
