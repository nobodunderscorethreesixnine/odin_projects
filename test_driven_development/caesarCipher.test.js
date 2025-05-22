import { caesarCipher } from "./caesarCipher";

test('xyz - chipher',()=>{
    expect(caesarCipher('xyz', 3)).toBe('abc')
})

test('case preservation', ()=>{
    expect(caesarCipher('HeLLo', 3)).toBe('KhOOr')
})

test('non-alpha character', ()=>{
    expect(caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!')
})
