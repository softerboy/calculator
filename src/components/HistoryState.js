import React from 'react'

import Button from 'react-bootstrap/Button'

import History from './History'

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const possibleOperations = ['-', '+', '/', 'x']

function dummyHistory(count) {
  const history = []
  let firstNumber = 0
  let secondNumber = 0
  let operation = '+'
  let result = 0
  let expression = '0 + 0 ='

  for (let i = 0; i < count; i++) {
    operation = possibleOperations[getRandomInt(0, 3)]
    firstNumber = getRandomInt(0, 100)
    secondNumber = getRandomInt(0, 100)
    if (operation === '-') {
      result = firstNumber - secondNumber
    } else if (operation === '+') {
      result = firstNumber + secondNumber
    } else if (operation === '/' && secondNumber !== 0) {
      result = firstNumber / secondNumber
    } else {
      result = firstNumber * secondNumber
    }

    expression = `${firstNumber} ${operation} ${secondNumber} =`
    if (!Number.isInteger(result)) {
      result = result.toFixed(6)
    }
    history.push({ expression, result: String(result) })
  }

  return history
}

export default function HistoryState() {
  return (
    <>
      <History history={dummyHistory(10)} />

      <Button
        className="trash-button"
        dangerouslySetInnerHTML={{ __html: '&#xE74D;' }}
      />
    </>
  )
}
