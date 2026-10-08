import { useState } from 'react';
import './App.css';

function CalcDisplay({ DisplayValue }) {
  return (
    <div className='Display'>
      {DisplayValue}
    </div>
  );
}

function CalcButton({ buttonLabel, onClick, className = '' }) {
  return (
    <button 
      className={`Button ${className}`.trim()} 
      onClick={() => onClick(buttonLabel)}
    >
      {buttonLabel}
    </button>
  );
}

function App() {
  const [displayValue, setDisplayValue] = useState('0');

  const buttonClickHandler = (label) => {
    // 1. Clear button functionality
    if (label === 'C' || label === 'CLR') {
      setDisplayValue('0');
      return;
    }

    // 2. Equals button functionality (evaluates the math expression)
    if (label === '=') {
      try {
        // Replace division character '÷' with standard JavaScript '/'
        const sanitizedExpression = displayValue.replace(/÷/g, '/');
        const result = Function(`'use strict'; return (${sanitizedExpression})`)();
        setDisplayValue(String(result));
      } catch (error) {
        setDisplayValue('Error');
      }
      return;
    }

    // 3. Append digits and operators to the display
    setDisplayValue((prev) => {
      if (prev === '0' || prev === 'Error') {
        return String(label);
      }
      return prev + String(label);
    });
  };

  return (
    <div className='App'>
      <div className='Header'>Calculator of Achilles Isaiah Ocampo - IT3A</div>
      <div className='Calculator'>
        <CalcDisplay DisplayValue={displayValue} />
        <div className='Keypad'>
          {/* Row 1 */}
          <CalcButton buttonLabel={7} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={8} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={9} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={'÷'} className='OperatorButton' onClick={buttonClickHandler} />

          {/* Row 2 */}
          <CalcButton buttonLabel={4} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={5} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={6} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={'*'} className='OperatorButton' onClick={buttonClickHandler} />

          {/* Row 3 */}
          <CalcButton buttonLabel={1} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={2} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={3} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={'-'} className='OperatorButton' onClick={buttonClickHandler} />

          {/* Row 4 */}
          <CalcButton buttonLabel={'C'} className='ClearButton' onClick={buttonClickHandler} />
          <CalcButton buttonLabel={0} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={'='} className='EqualsButton' onClick={buttonClickHandler} />
          <CalcButton buttonLabel={'+'} className='OperatorButton' onClick={buttonClickHandler} />
        </div>
      </div>
    </div>
  );
}

export default App;
