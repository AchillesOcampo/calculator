import { useState } from 'react'
import './App.css'

function CalcDisplay({ DisplayValue }) {
  return (
    <div className="Display">
      {DisplayValue}
    </div>
  );
}

function CalcButton({ buttonLabel, onClick, buttonType = '' }) {
  return (
    <button
      className={`Button ${buttonType}`}
      onClick={() => onClick(buttonLabel)}
    >
      {buttonLabel}
    </button>
  );
}

function App() {
  const [DisplayValue, setDisplayValue] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNumber, setWaitingForNumber] = useState(false);

  const buttonClickHandler = (value) => {

    // Number buttons
    if (!isNaN(value)) {
      if (DisplayValue === '0' || waitingForNumber) {
        setDisplayValue(String(value));
        setWaitingForNumber(false);
      } else {
        setDisplayValue(DisplayValue + value);
      }

      return;
    }

    // Clear button
    if (value === 'C') {
      setDisplayValue('0');
      setFirstNumber(null);
      setOperator(null);
      setWaitingForNumber(false);

      return;
    }

    // Operator buttons
    if (value === '+' || value === '-' || value === '*' || value === '÷') {
      setFirstNumber(Number(DisplayValue));
      setOperator(value);
      setWaitingForNumber(true);

      return;
    }

    // Equals button
    if (value === '=') {
      if (firstNumber === null || operator === null) {
        return;
      }

      const secondNumber = Number(DisplayValue);
      let result;

      if (operator === '+') {
        result = firstNumber + secondNumber;
      }

      if (operator === '-') {
        result = firstNumber - secondNumber;
      }

      if (operator === '*') {
        result = firstNumber * secondNumber;
      }

      if (operator === '÷') {
        if (secondNumber === 0) {
          setDisplayValue('Error');
          setFirstNumber(null);
          setOperator(null);
          setWaitingForNumber(true);

          return;
        }

        result = firstNumber / secondNumber;
      }

      setDisplayValue(String(result));
      setFirstNumber(null);
      setOperator(null);
      setWaitingForNumber(true);
    }
  };

  return (
    <div className="App">

      <div className="Header">
        Calculator of Achilles Isaiah Ocampo - IT3A
      </div>

      <div className="Calculator">

        <CalcDisplay DisplayValue={DisplayValue} />

        <div className="Keypad">

          <CalcButton
            buttonLabel={7}
            onClick={buttonClickHandler}
          />

          <CalcButton
            buttonLabel={8}
            onClick={buttonClickHandler}
          />

          <CalcButton
            buttonLabel={9}
            onClick={buttonClickHandler}
          />

          <CalcButton
            buttonLabel={'÷'}
            onClick={buttonClickHandler}
            buttonType="OperatorButton"
          />

          <CalcButton
            buttonLabel={4}
            onClick={buttonClickHandler}
          />

          <CalcButton
            buttonLabel={5}
            onClick={buttonClickHandler}
          />

          <CalcButton
            buttonLabel={6}
            onClick={buttonClickHandler}
          />

          <CalcButton
            buttonLabel={'*'}
            onClick={buttonClickHandler}
            buttonType="OperatorButton"
          />

          <CalcButton
            buttonLabel={1}
            onClick={buttonClickHandler}
          />

          <CalcButton
            buttonLabel={2}
            onClick={buttonClickHandler}
          />

          <CalcButton
            buttonLabel={3}
            onClick={buttonClickHandler}
          />

          <CalcButton
            buttonLabel={'-'}
            onClick={buttonClickHandler}
            buttonType="OperatorButton"
          />

          <CalcButton
            buttonLabel={'C'}
            onClick={buttonClickHandler}
            buttonType="ClearButton"
          />

          <CalcButton
            buttonLabel={0}
            onClick={buttonClickHandler}
          />

          <CalcButton
            buttonLabel={'='}
            onClick={buttonClickHandler}
            buttonType="EqualsButton"
          />

          <CalcButton
            buttonLabel={'+'}
            onClick={buttonClickHandler}
            buttonType="OperatorButton"
          />

        </div>

      </div>

    </div>
  );
}

export default App