const ex1 = require("./ex1");

function ex3() {
  const database = {
    tables: {},
    createTable(sqlCommand) {
      return createTable(this, sqlCommand);
    },
    execute(sqlCommand) {
      if (sqlCommand.startsWith("create table"))
        return this.createTable(sqlCommand);
    },
  };
  return database;
}

function createTable(databaseObject, sqlCommand) {
  const parsedInput = ex1(sqlCommand);
  databaseObject.tables[parsedInput.tableName] = {
    columns: columnsObject(parsedInput.columns),
    data: [],
  };
  return databaseObject;
}

function columnsObject(parsedColumns) {
  const columns = {};
  for (let column of parsedColumns) {
    let parsedColumn = column.split(" ");
    columns[parsedColumn[0]] = parsedColumn[1];
  }
  return columns;
}

module.exports = ex3;
