import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Answer from './Containers/Answer';

class App extends React.Component {
  render() {
    return (
      <div className="quiz">
        <div className="question">
          <div className="question-text">Bla bla bla ?</div>
          <form
            className="answers"
            ref={ref => {
              this.answers = ref;
            }}
          >
            {[1, 2, 3].map((element, index) => {
              return <Answer answer={'wrong'} key={index} />;
            })}
            <Answer answer={'right'} key={4} />
          </form>
          <button
            className="checkAnswer"
            onClick={() => {
              for (let index = 0; index < this.answers.children.length; index++) {
                if (
                  this.answers.children[index].children[0].checked &&
                  this.answers.children[index].children[0].getAttribute('answer') == 'right'
                ) {
                  alert(
                    'И правельный ответ ' +
                      this.answers.children[index].children[0].getAttribute('answer')
                  );
                }
              }
            }}
          >
            Check
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
