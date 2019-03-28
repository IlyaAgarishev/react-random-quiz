# React random quiz

Это квиз. Каждый раз когда вы обновляете его - он генерит в случайном порядке рандомные ответы(на русском языке), в зависимости от части речи правильного ответа. Я создал этот квиз, чтобы использовать его в своем браузерном расширении 'qiqi' для более эффективного изучения английского языка.

This is a quiz built with react. Every time you load it, it randomly generates answers(russian lang) depending on part of speach of the right answer.
I built this quiz to use it in my chrome extension "qiqi" to learn english more effectively.

See demo : http://randomquiz.surge.sh/

![first](https://i.imgur.com/5Be8ims.gif)

## Install

`yarn add react-random-quiz`


## Usage

```javascript
import Quiz from "react-random-quiz";

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
```

## Props

| prop                         | type      | description                                                                                                                                    |
| ---------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `wordsToTest`                   | `array`    | Array of english words and russian translation of this words(Array is required). Amount of words is unlimited.                                                                                                                                                           |

### Available commands:

- `yarn start` - start dev server and open browser
- `yarn build` - make a production build
- `yarn dist` - make a dist folder(dist folder is for npm publishing)
- `yarn test` - start tests 


