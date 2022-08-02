const ex5 = require("../src/ex5");

test("it creates an object with createTable and execute methods", () => {
  const input =
    "create table author (id number, name string, age number, city string, state string, country string)";
  const database = ex5();
  const result = {
    tables: {
      author: {
        columns: {
          id: "number",
          name: "string",
          age: "number",
          city: "string",
          state: "string",
          country: "string",
        },
        data: [],
      },
    },
  };
  expect(database).toHaveProperty("tables");
  expect(database).toHaveProperty("createTable");
  expect(database).toHaveProperty("execute");
  database.execute(input);
  expect(JSON.stringify(database)).toStrictEqual(JSON.stringify(result));
});

test("it does not change database table if sql command is invalid", () => {
  const input = "anything";
  const database = ex5();
  expect(database.tables).toStrictEqual({});
});

test("it returns an error for invalid commands", () => {
  const input = "select id, name from author";
  const database = ex5();
  expect(database.execute(input)).toEqual(
    "Syntax error: 'select id, name from author'"
  );
});

test("it inserts data into table with insert command", () => {
  const database = ex5();
  database.execute(
    "create table author (id number, name string, age number, city string, state string, country string)"
  );
  database.execute(
    "insert into author (id, name, age) values (1, Douglas Crockford, 62)"
  );
  database.execute(
    "insert into author (id, name, age) values (2, Linus Torvalds, 47)"
  );
  database.execute(
    "insert into author (id, name, age) values (3, Martin Fowler, 54)"
  );
  const result = {
    tables: {
      author: {
        columns: {
          id: "number",
          name: "string",
          age: "number",
          city: "string",
          state: "string",
          country: "string",
        },
        data: [
          {
            id: "1",
            name: "Douglas Crockford",
            age: "62",
          },
          {
            id: "2",
            name: "Linus Torvalds",
            age: "47",
          },
          {
            id: "3",
            name: "Martin Fowler",
            age: "54",
          },
        ],
      },
    },
  };
  expect(JSON.stringify(database)).toStrictEqual(JSON.stringify(result));
});
