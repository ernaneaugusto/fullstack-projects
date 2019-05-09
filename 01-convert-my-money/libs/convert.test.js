const convert = require('./convert');

// test cases
test('valor dolar 4 e valor a ser convertido 4', () => {
  expect(convert.convert(4,4)).toBe(16);
});
test('valor dolar 0 e valor a ser convertido 4', () => {
  expect(convert.convert(0,4)).toBe(0);
});
test('converte valor=2 do tipo inteiroem reais', () => {
  expect(convert.toMoney(2)).toBe('2.00');
});
test('converte valor=5 do tipo float em reais', () => {
  expect(convert.toMoney(5.00)).toBe('5.00');
});
test('converte valor=10 do tipo string SEM casas decimais em reais', () => {
  expect(convert.toMoney('10')).toBe('10.00');
});
test('converte valor=12.00 do tipo string COM casas decimais em reais', () => {
  expect(convert.toMoney('12.00')).toBe('12.00');
});