const ex1 = require('../src/ex1');

test('it parses tableName and columns', () => {
  const input = 'create table author (id number, name string, age number, city string, state string, country string)';
  const result = {tableName: 'author', columns: ['id number', 'name string', 'age number', 'city string', 'state string', 'country string']};
  expect(ex1(input)).toStrictEqual(result);
})
