import {capitalize} from './capitalize.js'

test('capitalize string', ()=>{
    expect(capitalize('hello')).toBe('Hello')
})

test('capitalize single letter', ()=>{
    expect(capitalize('h')).toBe('H')
})

test('handles empty string or not', ()=>{
    expect(capitalize('')).toBe('')
})

test('handles multiple word or not', ()=>{
    expect(capitalize('hello world')).toBe('Hello world')
})
