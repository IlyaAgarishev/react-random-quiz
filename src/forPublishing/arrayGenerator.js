import Adjectives from "./RussianDictionary/adjectives.js";
import Adverbs from "./RussianDictionary/adverbs.js";
import Conjunctions from "./RussianDictionary/conjunctions.js";
import Nouns from "./RussianDictionary/nouns.js";
import Numerous from "./RussianDictionary/numerous.js";
import Prepositions from "./RussianDictionary/prepositions.js";
import Pronouns from "./RussianDictionary/pronouns.js";
import Verbs from "./RussianDictionary/verbs.js";

export const takeRandomWordFromArray = array => {
  return array[Math.floor(Math.random(0, 1) * array.length)].toLowerCase();
};

export const createAnswersArray = (array, rightAnswer) => {
  // Logic to avoid repited words
  let answer_2 = takeRandomWordFromArray(array);
  while (answer_2 === rightAnswer) {
    answer_2 = takeRandomWordFromArray(array);
  }
  let answer_3 = takeRandomWordFromArray(array);
  while (answer_3 === answer_2 || answer_3 === rightAnswer) {
    answer_3 = takeRandomWordFromArray(array);
  }
  let answer_4 = takeRandomWordFromArray(array);
  while (
    answer_4 === answer_3 ||
    answer_4 === answer_2 ||
    answer_4 === rightAnswer
  ) {
    answer_4 = takeRandomWordFromArray(array);
  }

  // Finally creating answerArray
  const answersArray = [
    { answer: rightAnswer },
    { answer: answer_2 },
    { answer: answer_3 },
    { answer: answer_4 }
  ];

  return answersArray;
};

export const smartAnswersCreator = rightAnswer => {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20181222T134922Z.9d94e99b6da5e84a.19d04de00934554d34f2a675f0100fd307a76107&lang=ru-en&text=${rightAnswer}`,
    false
  );
  xhr.send();
  if (xhr.status !== 200) {
    console.log(xhr.status + ": " + xhr.statusText);
  } else {
    let data = JSON.parse(xhr.responseText);
    let partOfSpeach;
    if (data.def.length === 0) {
      partOfSpeach = "noun";
    } else {
      partOfSpeach = data.def[0].pos;
    }

    if (partOfSpeach === "adjective") {
      return createAnswersArray(Adjectives, rightAnswer);
    } else if (partOfSpeach === "adverb") {
      return createAnswersArray(Adverbs, rightAnswer);
    } else if (partOfSpeach === "conjunction" || partOfSpeach === "particle") {
      return createAnswersArray(Conjunctions, rightAnswer);
    } else if (partOfSpeach === "noun") {
      return createAnswersArray(Nouns, rightAnswer);
    } else if (partOfSpeach === "numeral") {
      return createAnswersArray(Numerous, rightAnswer);
    } else if (partOfSpeach === "preposition") {
      return createAnswersArray(Prepositions, rightAnswer);
    } else if (partOfSpeach === "pronoun") {
      return createAnswersArray(Pronouns, rightAnswer);
    } else if (partOfSpeach === "verb") {
      return createAnswersArray(Verbs, rightAnswer);
    } else {
      return createAnswersArray(Nouns, rightAnswer);
    }
  }
};

// Fisher-Yates Shuffle ALGORITHM
export const shuffleArray = array => {
  let currentIndex = array.length,
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

export const finalAnswersArrayGenerator = (rightAnswer, callback) => {
  // Generate array of answers with right parts of speach
  const answersArray = smartAnswersCreator(rightAnswer.toLowerCase());
  // Shuffling this generated array
  shuffleArray(answersArray);
  // Than setting it to state
  callback(answersArray);
};
