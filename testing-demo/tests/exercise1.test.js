const exercise1 = require('../exercise1');

describe('fizzBuzz', () => {

    it('should throw an exception if input is not a number', () => {
       expect(() => { exercise1.fizzBuzz('a') }).toThrow();
       expect(() => { exercise1.fizzBuzz(null) }).toThrow();
       expect(() => { exercise1.fizzBuzz(undefined) }).toThrow();
       expect(() => { exercise1.fizzBuzz({}) }).toThrow();
    });

    it('should return FizzBuzz if input is divisible by 3 and 5', () => {
        const result = exercise1.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return Fizz if input is divisible by 3', () => {
        const result = exercise1.fizzBuzz(3);
        expect(result).toBe('Fizz');
    });

    it('should return the input if the input is not divisible by 3 or 5', () => {
        const result = exercise1.fizzBuzz(2);
        expect(result).toBe(2);
    });
    
});