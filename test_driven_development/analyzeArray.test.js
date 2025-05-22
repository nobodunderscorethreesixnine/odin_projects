import {analyzeArray} from './analyzeArray.js'

test('checking arrays', ()=>{
    expect(analyzeArray([1,8,3,4,2,6])).toEqual ,({
        average:4,
        min:1,
        max:8,
        length:6
    })
})

test('empty array', ()=>{
    expect(analyzeArray([])).toBe(null)
})

