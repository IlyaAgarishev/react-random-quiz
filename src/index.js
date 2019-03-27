import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Quiz from "./forPublishing";

ReactDOM.render(
  <Quiz
    wordsToTest={[
      { word: "Wolf", translation: "Волк" },
      { word: "Sad", translation: "Грустный" },
      { word: "Cat", translation: "Кот" },
      { word: "Dog", translation: "Собака" }
    ]}
  />,
  document.getElementById("root")
);
