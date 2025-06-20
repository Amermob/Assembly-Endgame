import "./style/style.css";
import { languages } from "./languages";
import { useEffect, useState } from "react";
import { getRandomWord } from "./utils";
import { getFarewellText } from "./utils";
import { clsx } from "clsx";
import { nanoid } from 'nanoid'


export default function Endgame() {
  const [words, setWords] = useState(() => getRandomWord());
  const [guessedLetter, setGuessedLetter] = useState([]);
  const [count, setCount] = useState("");

  const wrongCount = guessedLetter.filter((guess) => {
    return !words.includes(guess);
  });

  const correctAnswer = guessedLetter.filter((guess) => {
    return words.includes(guess);
  });


  const lostLang = languages.slice(wrongCount.length);
  const gameIsOver = lostLang.length === 1;

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  function handleClicks(letter) {
    setGuessedLetter((prev) =>
      prev.includes(letter) ? prev : [...prev, letter]
    );
  }

  useEffect(() => {
    if (wrongCount.length > 0) {
      languages.slice(0, languages.length - 1);
      setCount(
        getFarewellText(
          languages.slice(wrongCount.length - 1, wrongCount.length + 1)[0].name
        )
      );
    } else {
      setCount("");
    }
  }, [wrongCount.length]);

  return (
    <main>
      <header>
        <h2>Assembly: Endgame</h2>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>

      {/* Results */}
      <section
        className={clsx("results", {
          won: correctAnswer.length === words.length,
          lost: wrongCount.length > 7,
          still: wrongCount.length,
        })}
      >
        {correctAnswer.length === words.length && (
          <h3>You win!, Well done! 🎉</h3>
        )}
        {wrongCount.length > 7 ? (
          <h3>You lose! Better start learning Assembly 😭</h3>
        ) : (
          <h3>{correctAnswer.length === words.length ? "" : count}</h3>
        )}
      </section>
      {/* Results */}

      {/* Programming languages */}
      <section className="words">
        {lostLang.map((lang) => {
          return (
            <span
              style={{
                backgroundColor: lang.backgroundColor,
                color: lang.color,
              }}
              key={nanoid()}
            >
              {lang.name}
            </span>
          );
        })}
      </section>
      {/* Programming languages */}

      {/* spell the word */}
      <section className="letters">{words.split("").map((word) => {
    return (
      <span key={nanoid()}>
        {guessedLetter.includes(word) ? word.toUpperCase() : ""}
      </span>
    );
  })}</section>
      {/* spell the word */}

      {/* Keyboard */}
      <section className="keyboard">
        {alphabet.split("").map((alpha) => {
          const isGuessed = guessedLetter.includes(alpha);
          const isCorrect = isGuessed && words.includes(alpha);
          const isWrong = isGuessed && !words.includes(alpha);
          return (
            <button
              disabled={gameIsOver && true}
              className={clsx("", {
                right: isCorrect,
                wrong: isWrong,
              })}
              onClick={() => handleClicks(alpha)}
              key={nanoid()}
            >
              {alpha.toUpperCase()}
            </button>
          );
        })}
      </section>

      {wrongCount.length > 7 || correctAnswer.length === words.length ? (
        <button onClick={() => setGuessedLetter([])} className="start-over">
          Start Again?
        </button>
      ) : null}
      {/* Keyboard */}
    </main>
  );
}
