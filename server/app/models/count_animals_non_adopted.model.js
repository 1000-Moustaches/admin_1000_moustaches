const sql = require("./db.js");

// constructor
const CountAnimalsNonAdopted = function () {
  
};

CountAnimalsNonAdopted.getAll=(result)=> {
    sql.connect((connection) =>
        connection.query(
          `select id,name, ifnull(speciesCount.animalCount,0) as animalCount from species
            left join (select a.species_id, count(*) as animalCount from animals a 
                            where  a.adopted = false
                            group by a.species_id) as speciesCount
            on species.id = speciesCount.species_id `,    
          (err, res) => {
            connection.end();
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
    
            if (res.length) {
              console.log("résultat calcul", res);


              let total = res.reduce(getSum,0);

              let animalsNonAdopted={ "Total": total ,"Species" : res}
              result(null,  animalsNonAdopted);
              return;
            }
          }
        )
      );
      function getSum(total, item) {
        return total + item.animalCount;
      }
}


module.exports = CountAnimalsNonAdopted;


