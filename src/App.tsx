import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faXmark,
  faDivide,
  faEquals,
  faPercent,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [display, setDisplay] = useState(0);
  const [operation, setOperation] = useState<string | null>(null);
  const [prevInput, setPrevInput] = useState(0);
  const [isNewInput, setIsNewInput] = useState(false);
  const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  const operations = ["+", "-", "x", "/", "%"];
  const signs = [faPlus, faMinus, faXmark, faDivide, faPercent];

  const handleNumber = (num: number) => {
    if (isNewInput) {
      setDisplay(num);
      setIsNewInput(false);
    } else {
      setDisplay(display * 10 + num);
    }
  };

  const calculate = (prev: number, curr: number, op: string | null) => {
    switch (op) {
      case "+":
        return prev + curr;
      case "-":
        return prev - curr;
      case "x":
        return prev * curr;
      case "/":
        return prev / curr;
      case "%":
        return prev % curr;
      default:
        return curr;
    }
  };

  const handleOperation = (op: string) => {
    const curr = display;
    if (operation) {
      const result = calculate(prevInput, curr, operation);
      setDisplay(result);
      setPrevInput(result);
    } else {
      setPrevInput(display);
    }
    setOperation(op);
    setIsNewInput(true);
  };

  const handleEquals = () => {
    if (operation) {
      const result = calculate(prevInput, display, operation);
      setDisplay(result);
      setPrevInput(0);
      setOperation(null);
      setIsNewInput(true);
    }
  };

  const handleReset = () => {
    setDisplay(0);
    setPrevInput(0);
    setOperation(null);
    setIsNewInput(false);
  };

  return (
    <div className="app">
      <h5>{display}</h5>
      <div className="grid">
        <button
          className="operation-button"
          onClick={() => setDisplay(display * -1)}
        >
          {"(-)"}
        </button>
        {operations.map((op, key) => (
          <button
            key={key}
            className="operation-button"
            onClick={() => handleOperation(op)}
          >
            <FontAwesomeIcon icon={signs[key]} />
          </button>
        ))}
        {nums.map((num) => (
          <button
            key={num}
            className="num-button"
            onClick={() => handleNumber(num)}
          >
            {num}
          </button>
        ))}
        <button onClick={handleReset} className="operation-button">
          AC
        </button>
        <button className="operation-button" onClick={handleEquals}>
          <FontAwesomeIcon icon={faEquals} />
        </button>
      </div>
    </div>
  );
}

export default App;
