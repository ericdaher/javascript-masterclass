const ex4 = require("./ex4");

function ex5() {
  const database = ex4();
  database.execute = function (sqlCommand) {
    try {
      if (sqlCommand.startsWith("create table")) {
        return this.createTable(sqlCommand);
      } else if (sqlCommand.startsWith("insert")) {
        return this.insertInTable(sqlCommand);
      } else {
        const message = `Syntax error: '${sqlCommand}'`;
        throw new DatabaseError(sqlCommand, message);
      }
    } catch (e) {
      return e.message;
    }
  };
  database.insertInTable = function (sqlCommand) {
    return insertInTable(this, sqlCommand);
  };
  return database;
}

function insertInTable(databaseObject, sqlCommand) {
  const regExp = /insert into ([a-z]+) \(([a-z\s,]+)\) values \(([\w\s,]+)\)/;
  const [_, tableName, tableColumns, tableRow] = regExp.exec(sqlCommand);
  const tableObject = {};
  tableColumns.split(", ").forEach((column, index) => {
    tableObject[column] = tableRow.split(", ")[index];
  });
  databaseObject.tables[tableName].data.push(tableObject);
}

const DatabaseError = function (statement, message) {
  this.statement = statement;
  this.message = message;
};

module.exports = ex5;
