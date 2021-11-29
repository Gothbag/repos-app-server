const sqlite3 = require("sqlite3").verbose();
const pick = require("lodash.pick");

let db;

const connectDb = () => {
  return new Promise(function(resolve) {
    if (!db) {
      db = new sqlite3.Database(":memory:", err => {
        if (err) {
          reject(`Open error: ${err.message}`);
        } else {
          return resolve();
        }
      });
    } else {
      return resolve();
    }
  });
};

const repoDao = {
  homepage: "TEXT",
  size: "INTEGER",
  stargazers_count: "INTEGER",
  watchers_count: "INTEGER",
  language: "TEXT",
  has_issues: "INTEGER DEFAULT 0",
  has_projects: "INTEGER DEFAULT 0",
  has_downloads: "INTEGER DEFAULT 0",
  has_wiki: "INTEGER DEFAULT 0",
  has_pages: "INTEGER DEFAULT 0",
  forks_count: "INTEGER",
  mirror_url: "TEXT",
  archived: "INTEGER DEFAULT 0",
  disabled: "INTEGER DEFAULT 0",
  open_issues_count: "INTEGER",
  allow_forking: "INTEGER DEFAULT 0",
  is_template: "INTEGER DEFAULT 0",
  visibility: "TEXT",
  forks: "INTEGER",
  open_issues: "INTEGER",
  watchers: "INTEGER",
  default_branch: "TEXT"
};

const tableFieldsCreationString = Object.entries(repoDao)
  .sort()
  .reduce((acc, entry, index) => {
    const returnString = `${acc} ${entry[0]} ${entry[1]}`;
    if (index < Object.entries(repoDao).length - 1) {
      return `${returnString},`;
    }
    return `${returnString}`;
  }, "");

const repoDaoFields = Object.keys(repoDao);

module.exports.addRepo = async repo => {
  await connectDb();

  db.serialize(function() {
    db.run(
      `CREATE TABLE IF NOT EXISTS trackedRepos (${tableFieldsCreationString})`
    );

    const cols = repoDaoFields.sort().join(", ");
    const placeholders = repoDaoFields.map(() => "?").join(", ");

    const repoValues = Object.entries(pick(repo, repoDaoFields))
      .sort()
      .map(entry => entry[1]);

    db.run(
      `INSERT INTO trackedRepos (${cols}) VALUES (${placeholders})`,
      repoValues,
      err => {
        if (!err) {
          console.log("data successfully inserted");
        } else {
          throw err;
        }
      }
    );
  });
};

module.exports.getAllRepos = () => {
  return new Promise(function(resolve, reject) {
    db.all("SELECT * FROM trackedRepos", [], (err, rows) => {
      if (err) {
        return reject(err);
      }

      rows.forEach(row => {
        resolve(rows);
      });
    });
  });
};
