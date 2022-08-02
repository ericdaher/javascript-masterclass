const ex6 = require("../src/ex6");

test("it creates an object with createTable and execute methods", () => {
  const input =
    "create table author (id number, name string, age number, city string, state string, country string)";
  const database = ex6();
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
  const database = ex6();
  expect(database.tables).toStrictEqual({});
});

test("it returns an error for invalid commands", () => {
  const input = "anything";
  const database = ex6();
  expect(database.execute(input)).toEqual("Syntax error: 'anything'");
});

test("it inserts data into table with insert command", () => {
  const database = ex6();
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

test("it selects data into table with select command", () => {
  const database = ex6();
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
  let result = [
    { name: "Douglas Crockford", age: "62" },
    { name: "Linus Torvalds", age: "47" },
    { name: "Martin Fowler", age: "54" },
  ];
  expect(
    JSON.stringify(database.execute("select name, age from author"))
  ).toStrictEqual(JSON.stringify(result));
  result = [{ name: "Douglas Crockford", age: "62" }];
  expect(
    JSON.stringify(
      database.execute("select name, age from author where id = 1")
    )
  ).toStrictEqual(JSON.stringify(result));
});
