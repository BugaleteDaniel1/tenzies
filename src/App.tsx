import { useEffect, useState } from "react";
import Confetti from "./components/Confetti";
import Title from "./components/Title";
import Dice from "./components/Dice";
import startNumbers from "./assets/StartNumbers";
import "./App.css";
function App() {
  let defaultStart = startNumbers;
  const [randomNumbers, setRandomNumbers] = useState(defaultStart);
  const [endGame, setEndGame] = useState(false);

  function getRandomArray() {
    setRandomNumbers((prevRandomNumbers) =>
      prevRandomNumbers.map((obj: nrObj) => {
        return {
          ...obj,
          number:
            obj.selected === false
              ? Math.floor(1 + Math.random() * 6)
              : obj.number,
        };
      })
    );
  }

  function selectNumber(e: any) {
    e.stopPropagation();
    setRandomNumbers((prevRandomNumbers) =>
      prevRandomNumbers.map((obj: nrObj) => {
        if (e.target.getAttribute("data-target") == obj.id - 1) {
          return {
            ...obj,
            selected: !obj.selected,
          };
        } else
          return {
            ...obj,
          };
      })
    );
  }

  function restart() {
    setRandomNumbers(defaultStart);
    setEndGame(false);
  }

  useEffect(() => {
    let flsSelected = randomNumbers.every((el: any) => el.selected);
    let firstValue = randomNumbers[0].number;
    let sameNr = randomNumbers.every((el: any) => el.number === firstValue);
    console.log("isSelected", flsSelected, "sameNr", sameNr);
    if (flsSelected && sameNr) {
      setEndGame(true);
    }
  }, [randomNumbers]);

  return (
    <div className="App">
      {endGame && <Confetti />}
      {endGame ? (
        <h1 className="game__header-title">Congratiulations you Won!</h1>
      ) : (
        <Title />
      )}
      {randomNumbers === defaultStart ? (
        <h1 className="game__header-title">Roll To Start</h1>
      ) : (
        <Dice handleClick={selectNumber} numbers={randomNumbers} />
      )}
      <button
        className="roll__btn"
        onClick={endGame ? restart : getRandomArray}
      >
        {endGame ? "Restart" : "Roll"}
      </button>
    </div>
  );
}

export default App;

interface nrObj {
  number: number;
  selected: boolean;
  id: number;
}
