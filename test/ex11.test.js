const { ex11, Database, Parser } = require("../src/ex11");

test("it creates a database class using Promises", () => {
  const database = ex11();
  expect(database).toBeInstanceOf(Database);
  expect(database.parser).toBeInstanceOf(Parser);
  return database
    .execute(
      "create table author (id number, name string, age number, city string, state string, country string)"
    )
    .then(() => {
      return Promise.all([
        database.execute(
          "insert into author (id, name, age) values (1, Douglas Crockford, 62)"
        ),
        database.execute(
          "insert into author (id, name, age) values (2, Linus Torvalds, 47)"
        ),
        database.execute(
          "insert into author (id, name, age) values (3, Martin Fowler, 54)"
        ),
      ]).then(() => {
        return database.execute("select name, age from author");
      });
    })
    .then((output) => {
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
});

test("it treats errors correctly", () => {
  const database = ex11();
  return database.execute("do anything").catch((output) => {
    expect(output).toEqual("Syntax error: 'do anything'");
  });
});
