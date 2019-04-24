import React from "react";
import { mount, render, shallow } from "enzyme";
import Quiz from "../forPublishing";
import Answer from "../forPublishing";
import {
  setQuizBackground,
  uniqueIdGenerator
} from "../forPublishing/ponyFunctions";
import randomWords from "random-words";
import {
  takeRandomWordFromArray,
  createAnswersArray,
  smartAnswersCreator,
  finalAnswersArrayGenerator
} from "../forPublishing/arrayGenerator";

// tools

const backgroundStyles = { quiz: "quiz", green: "green", red: "red" };

const pets = ["cat", "dog", "frog"];

// ponyFunctions testing

test("setQuizBackground white returns quiz", () => {
  const background = "white";
  expect(setQuizBackground(background, backgroundStyles)).toBe("quiz");
});

test("setQuizBackground green returns quiz green", () => {
  const background = "green";
  expect(setQuizBackground(background, backgroundStyles)).toBe("quiz green");
});

test("setQuizBackground red returns quiz red", () => {
  const background = "red";
  expect(setQuizBackground(background, backgroundStyles)).toBe("quiz red");
});

test("uniqueIdGenerator returns right string design", () => {
  const questionWord = randomWords();
  const answer = randomWords();
  const index = randomWords().length;
  const generatedWord = uniqueIdGenerator(questionWord, answer, index);
  const lastRandomNumber = generatedWord.split("_")[3];
  expect(generatedWord).toBe(
    questionWord + "_" + answer + "_" + index + "_" + lastRandomNumber
  );
});

// arrayGenerator functions testing

test("takeRandomWordFromArray returns string", () => {
  expect(typeof takeRandomWordFromArray(pets)).toBe("string");
});

test("createAnswersArray returns array", () => {
  expect(Array.isArray(createAnswersArray(pets, "pet"))).toBe(true);
});

test("createAnswersArray returns  array with length == 4 ", () => {
  expect(createAnswersArray(pets, "pet").length).toBe(4);
});

test("createAnswersArray returns array without repeated words", () => {
  const answersArray = createAnswersArray(pets, "pet");
  answersArray.map((element, index) => {
    const newArray = answersArray;
    newArray.splice(index, 1);
    for (let i = 0; i < newArray.length; i++) {
      expect(element.answer).not.toBe(newArray[i].answer);
    }
  });
});

test("smartAnswersCreator returns array", () => {
  expect(Array.isArray(smartAnswersCreator("красный"))).toBe(true);
});

test("smartAnswersCreator returns array with langth === 4", () => {
  expect(smartAnswersCreator("красный").length).toBe(4);
});

test("smartAnswersCreator returns array with array[0] === rightAnswer", () => {
  const rightAnswer = "красный";
  expect(smartAnswersCreator(rightAnswer)[0].answer).toBe(rightAnswer);
});

test("finalAnswersArrayGenerator returns nothing", () => {
  const rightAnswer = "красный";
  const callback = jest.fn();
  expect(finalAnswersArrayGenerator(rightAnswer, callback)).toBeUndefined();
});

test("finalAnswersArrayGenerator callback gets an array as a parameter with rghtAnswer inside", () => {
  const rightAnswer = "красный";
  let array;
  const callback = data => {
    array = data;
  };
  finalAnswersArrayGenerator(rightAnswer, callback);
  expect(Array.isArray(array)).toBe(true);
  expect(array.length).toBe(4);
  const checkRightAnswer = () => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].answer === rightAnswer) {
        return true;
      }
    }
  };
  expect(checkRightAnswer()).toBe(true);
});

// Components testing

test("Quiz first word equals array[0]", () => {
  const wordsToTestArray = [
    { word: "Wolf", translation: "Волк" },
    { word: "Sad", translation: "Грустный" },
    { word: "Cat", translation: "Кот" },
    { word: "Dog", translation: "Собака" }
  ];

  const component = mount(<Quiz wordsToTest={wordsToTestArray} />);

  let word = component
    .find(".questionText")
    .text()
    .split('"')[1];

  expect(word).toBe(wordsToTestArray[0].word);
});
