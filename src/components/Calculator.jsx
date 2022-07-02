import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Calculator = () => {

  const [displayValue, setDisplayValue] = useState('');
  const [firstOperand, setFirstOperand] = useState('');
  const [secondOperand, setSecondOperand] = useState('');
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    let calculation = `${firstOperand || ''} ${operator || ''} ${secondOperand || ''}`
    setDisplayValue(calculation);
  })

  const calculate = (operation) => {
    let result;
    if (operation === '+') {
      result = (Number(firstOperand) + Number(secondOperand));
    } else if (operation === '-') {
      result = (Number(firstOperand) - Number(secondOperand));
    } else if (operation === '×') {
      result = (Number(firstOperand) * Number(secondOperand));
    } else if (operation === '÷') {
      result = (Number(firstOperand) / Number(secondOperand));
    }
    result = truncate(result);
    setResult(result);
    setFirstOperand(result);
    setSecondOperand('');
    setOperator('');
  }

  const clear = (e) => {
    setFirstOperand('');
    setSecondOperand('');
    setOperator(null);
    setDisplayValue('');
    setResult('');
  }

  const setOperands = (e) => {
    e.stopPropagation()
    if (!operator) { // operation is false => entered # must be firstOperand
      if (firstOperand) {
        let newOperand = firstOperand;
        setFirstOperand(newOperand += e.target.value);
      } else {
        setFirstOperand(e.target.value);
      }
    } else { // operation is true => entered # must be secondOperand
      if (secondOperand) {
        let newOperand = secondOperand;
        setSecondOperand(newOperand += e.target.value);
      } else {
        setSecondOperand(e.target.value);
      }
    }
  }

  const truncate = (num) => {
    num = num.toString();
    return num.length > 10 ? Number(num.substr(0, 9)) : num;
  }

  return (
    <Container>
      <CalculatorContainer id="calculator">
        <Output id="output">
          <DisplayUpper>
            <div>{displayValue ? displayValue : ''}</div>
          </DisplayUpper>
          <Display>{result ? result : ''}</Display>
        </Output>
      <ButtonsWrapper>
        <Operations>
          {['+', '-', '×', '÷'].map((val) => (
            <Button
              key={JSON.stringify(val)}
              onClick={() => setOperator(val)}
            >{val}</Button>
          ))}
          <Button onClick={(e) => calculate(operator)}>=</Button>
        </Operations>
        <div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((val) => (
            <Button
              key={JSON.stringify(val)}
              value={val}
              onClick={(e) => setOperands(e)}
            >{val}</Button>
          ))}
          <Button value={'.'} onClick={(e) => setOperands(e)}>.</Button>
          <Button onClick={(e) => clear(e)}>AC</Button>
        </div>
      </ButtonsWrapper>
      </CalculatorContainer>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: #e0e0e0;
  font-family: 'Merriweather', serif;
  color: darkgray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CalculatorContainer = styled.div`
  min-width: 350px;
  max-width: 400px;
  width: 30%;
  min-height: 50vh;
  max-height: 55vh;
  border-radius: 28px;
  background: #e0e0e0;
  /* box-shadow:  -10px -10px 20px #cacaca,
              10px 10px 20px #f6f6f6; */
  box-shadow:  10px 10px 8px #cacaca,
              -5px -5px 6px #f6f6f6;
`;

const Output = styled.div`
  height: 100px;
  font-size: 2.5em;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 15px;
`;


const Display = styled.div`
  min-height: 50%;
`;

const DisplayUpper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.5em;
  position: relative;
  font-style: italic;
  top: 0;
  padding: 5px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 5px;
`;

const Operations = styled.div`
  margin-bottom: 10px;
`;

const Button = styled.button`
  height: 50px;
  width: 50px;
  border: none;
  cursor: pointer;
  border-radius: 50px;
  background: #e0e0e0;
  box-shadow:  3px 3px 4px #bebebe,
              -3px -3px 3px #ffffff;
  margin: 7px;
  color: darkgray;
`;

export default Calculator;