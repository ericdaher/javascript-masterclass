const ex3 = require("../src/ex3");

test('it creates an object with createTable and execute methods', () => {
  const input = 'create table author (id number, name string, age number, city string, state string, country string)';
  const database = ex3();
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
  };
  expect(database).toHaveProperty('tables');
  expect(database).toHaveProperty('createTable');
  expect(database).toHaveProperty('execute');
  database.execute(input);
  expect(JSON.stringify(database)).toStrictEqual(JSON.stringify(result));
});

test('it does not change database table if sql command is invalid', () => {
  const input = 'anything';
  const database = ex3();
  database.execute(input);
  expect(database.tables).toStrictEqual({});
});
