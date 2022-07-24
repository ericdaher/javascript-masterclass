const ex2 = require('../src/ex2');

test('it creates object database', () => {
  const input = 'create table author (id number, name string, age number, city string, state string, country string)';
  const result = {
    "tables": {
      "author": {
        "columns": {
          "id": "number",
          "name": "string",
          "age": "number",
          "city": "string",
          "state": "string",
          "country": "string"
        },
        "data": []
      }
    }
  }
  expect(JSON.stringify(ex2(input))).toStrictEqual(JSON.stringify(result));
});
