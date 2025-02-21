const sql = require("./db.js");

// constructor
const Permission = function () {
  
};


Permission.findByUserId = (id, result) => {
  sql.connect((connection) =>
    connection.query(
      `select users.name as user_name, teams.name as team_name, ressources.name as ressource_name, permissions.create ,
      permissions.read , permissions.update, permissions.delete 
        from users
        join userstoteams on users.id = userstoteams.users_id 
        join teams on teams.id = userstoteams.teams_id
        join permissions on permissions.teams_id = teams.id
        join ressources on  permissions.ressources_id = ressources.id 
      WHERE users.id = ${id}`,

      (err, res) => {
        connection.end();
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.length) {
          console.log(`findById(${id}) : permission : `, res[0]);
          result(null, res);
          return;
        }

        // not found entity with the id
        result({ kind: "not_found" }, null);
      }
    )
  );
};

module.exports = Permission;