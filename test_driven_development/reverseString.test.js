import {reverseString} from './reverseString'

test('reverse string', () =>{
    expect(reverseString('hello')).toBe('olleh')
})

test('reverse string', ()=>{
        expect(reverseString('hello world')).toBe('dlrow olleh')
})

test('empty or not', ()=>{
    expect(reverseString('')).toBe('')
})