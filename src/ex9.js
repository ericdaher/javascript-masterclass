function ex9() {
  const database = new Database();
  return database;
}

const Database = class {
  constructor() {
    this.tables = {};
    this.parser = new Parser();
  }
  execute(sqlCommand) {
    const parsedInput = this.parser.parse(sqlCommand);
    try {
      if (parsedInput === undefined) {
        const message = `Syntax error: '${sqlCommand}'`;
        throw new DatabaseError(sqlCommand, message);
      }
      const { command, parsedStatement } = parsedInput;
      return this[command].call(this, parsedStatement);
    } catch (e) {
      return e.message;
    }
  }
  createTable(parsedStatement) {
    return createTable(this, parsedStatement);
  }
  insert(parsedStatement) {
    return insertInTable(this, parsedStatement);
  }
  select(parsedStatement) {
    return selectFromTable(this, parsedStatement);
  }
  delete(parsedStatement) {
    return deleteFromTable(this, parsedStatement);
  }
};

const DatabaseError = class {
  constructor(statement, message) {
    this.statement = statement;
    this.message = message;
  }
};

const Parser = class {
  constructor() {
    this.commands = new Map([
      ["createTable", /create table ([a-z]+) \((.+)\)/],
      ["insert", /insert into ([a-z]+) \(([a-z\s,]+)\) values \(([\w\s,]+)\)/],
      [
        "select",
        /select ([a-z, ]+) from ([a-z]+)(?: where ([a-z]+) = ([\w]+))?/,
      ],
      ["delete", /delete from ([a-z]+)(?: where ([a-z]+) = ([\w]+))?/],
    ]);
  }
  parse(statement) {
    for (let [command, regExp] of this.commands) {
      if (statement.match(regExp)) {
        return { command: command, parsedStatement: statement.match(regExp) };
      }
    }
  }
};

function createTable(databaseObject, parsedStatement) {
  const tableName = parsedStatement[1];
  const parsedColumns = parsedStatement[2].split(", ");
  const columns = {};
  for (let column of parsedColumns) {
    let parsedColumn = column.split(" ");
    columns[parsedColumn[0]] = parsedColumn[1];
  }
  databaseObject.tables[tableName] = {
    columns: columns,
    data: [],
  };
  return databaseObject;
}

function insertInTable(databaseObject, parsedStatement) {
  const [_, tableName, tableColumns, tableRow] = parsedStatement;
  const tableObject = {};
  tableColumns.split(", ").forEach((column, index) => {
    tableObject[column] = tableRow.split(", ")[index];
  });
  databaseObject.tables[tableName].data.push(tableObject);
}

function selectFromTable(databaseObject, parsedStatement) {
  const [_, tableColumns, tableName, whereColumn, whereValue] = parsedStatement;
  const tableObjects = databaseObject.tables[tableName].data
    .filter((tableElement) => tableElement[whereColumn] === whereValue)
    .map((tableElement) => {
      return tableColumns
        .split(", ")
        .reduce(
          (object, elementRow) =>
            Object.assign(object, { [elementRow]: tableElement[elementRow] }),
          {}
        );
    });
  return tableObjects;
}

function deleteFromTable(databaseObject, parsedStatement) {
  const [_, tableName, whereColumn, whereValue] = parsedStatement;
  databaseObject.tables[tableName].data = whereValue
    ? databaseObject.tables[tableName].data.filter(
        (tableElement) => tableElement[whereColumn] !== whereValue
      )
    : [];
  return databaseObject;
}

module.exports = { ex9, Database, Parser };
