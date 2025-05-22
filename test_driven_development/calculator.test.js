import {calculator} from './calculator.js'

test('add numbers', ()=>{
    expect(calculator.add(2,3)).toEqual(5)
})

test('subtract numbers', ()=>{
    expect(calculator.subtract(4,5)).toBe(-1)
})

test('multiply numbers', ()=>{
    expect(calculator.multiply(2,3)).toEqual(6)
})

test('divide numbers', ()=>{
    expect(calculator.divide(4,2)).toEqual(2)
})
