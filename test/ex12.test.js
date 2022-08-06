const { ex11, Database, Parser } = require("../src/ex11");

test("it creates a database class using Promises and deals with them using async/await", async () => {
  const database = ex11();
  expect(database).toBeInstanceOf(Database);
  expect(database.parser).toBeInstanceOf(Parser);
  await database.execute(
    "create table author (id number, name string, age number, city string, state string, country string)"
  );
  await Promise.all([
    database.execute(
      "insert into author (id, name, age) values (1, Douglas Crockford, 62)"
    ),
    database.execute(
      "insert into author (id, name, age) values (2, Linus Torvalds, 47)"
    ),
    database.execute(
      "insert into author (id, name, age) values (3, Martin Fowler, 54)"
    ),
  ]);
  const output = await database.execute("select name, age from author");
  const result = [
    {
      name: "Douglas Crockford",
      age: "62",
    },
    {
      name: "Linus Torvalds",
      age: "47",
    },
    {
      name: "Martin Fowler",
      age: "54",
    },
  ];
  expect(output).toEqual(result);
});

test("it treats errors correctly", async () => {
  const database = ex11();
  const output = await database.execute("do anything").catch((e) => e);
  expect(output).toEqual("Syntax error: 'do anything'");
});
