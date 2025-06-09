import { DataSource } from "typeorm";
// @ts-ignore
import { User } from "../dist/app/models/User";
// @ts-ignore
import { Team } from "../dist/app/models/Team";
// Used for dev (to get the typed entity)
//import { Team } from "../app/models/Team";
// import { User } from "../app/models/User";

const createDemoAccount = (name: string, firstname: string, email: string, teams: Team[]) => {
  const demoAccount = new User();
  demoAccount.name = name;
  demoAccount.firstname = firstname;
  demoAccount.email = email;
  demoAccount.teams = teams;
  return demoAccount;
};

export const createDemoAccounts = async (dataSource: DataSource) => {
  const teams = await dataSource.getRepository(Team).find();
  const adminTeam = teams.find(team => team.name === "Admin");
  const adoptionTeam = teams.find(team => team.name === "Adoption");

  // Create demo user account linked to team
  const demoAccounts = [
    {
      name: "Admin",
      firstname: "Admin",
      email: "admin@example.com",
      teams: [adminTeam],
    }, {
      name: 'Adoption',
      firstname: 'Pole',
      email: 'pole-adoption@example.com',
      teams: [adoptionTeam],
    }
  ];

  const demoAccountsToSave = demoAccounts.map(demoAccount => createDemoAccount(demoAccount.name, demoAccount.firstname, demoAccount.email, demoAccount.teams));

  const demoAccountRepository = dataSource.getRepository(User);
  for (const demoAccount of demoAccountsToSave) {
    await demoAccountRepository.save(demoAccount);
  }
};