import React from "react";
import { mount, render, shallow } from "enzyme";
import Quiz from "../forPublishing";
import {
  setQuizBackground,
  uniqueIdGenerator
} from "../forPublishing/ponyFunctions";
import randomWords from "random-words";

// ponyFunctions testing

test("setQuizBackground white returns quiz", () => {
  const background = "white";
  const styles = { quiz: "quiz", green: "green", red: "red" };
  expect(setQuizBackground(background, styles)).toBe("quiz");
});

test("setQuizBackground green returns quiz green", () => {
  const background = "green";
  const styles = { quiz: "quiz", green: "green", red: "red" };
  expect(setQuizBackground(background, styles)).toBe("quiz green");
});

test("setQuizBackground red returns quiz red", () => {
  const background = "red";
  const styles = { quiz: "quiz", green: "green", red: "red" };
  expect(setQuizBackground(background, styles)).toBe("quiz red");
});

test("uniqueIdGenerator", () => {
  const questionWord = randomWords();
  const answer = randomWords();
  const index = randomWords().length;
  expect(uniqueIdGenerator(questionWord, answer, index).slice(0, -4)).toBe(
    questionWord + "_" + answer + "_" + index
  );
});

// Components testing

// test("shallow App snapshot", () => {
//   const component = shallow(
//     <Quiz
//       wordsToTest={[
//         { word: "Wolf", translation: "Волк" },
//         { word: "Sad", translation: "Грустный" },
//         { word: "Cat", translation: "Кот" },
//         { word: "Dog", translation: "Собака" }
//       ]}
//     />
//   );
//   expect(component).toMatchSnapshot();
// });
