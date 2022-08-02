const ex1 = require("./ex1");

function ex2(input) {
  const parsedInput = ex1(input);
  const database = {
    tables: {
      [parsedInput.tableName]: {
        columns: columnsObject(parsedInput.columns),
        data: [],
      },
    },
  };
  return database;
}

function columnsObject(parsedColumns) {
  const columns = {};
  for (let column of parsedColumns) {
    let parsedColumn = column.split(" ");
    columns[parsedColumn[0]] = parsedColumn[1];
  }
  return columns;
}

module.exports = ex2;
