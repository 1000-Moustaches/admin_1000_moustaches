// @ts-ignore
import { User } from "../dist/app/models/User";
// Used for dev (to get the typed entity)
//import { User } from "../app/models/User";
import { DataSource } from "typeorm";

const createUser = (
  email: string,
  name: string,
  firstname: string,
  isReferent: boolean,
  teams: number
) => {
  const user = new User();
  user.name = name;
  user.firstname = firstname;
  user.email = email;
  user.isReferent = isReferent;
  user.teams = teams;
  return user;
};

export const createUsers = async (dataSource: DataSource) => {
  const users = [
    {
      email: "alex.terrieur@example.com",
      name: "Terrieur",
      firstname: "Alex",
      isReferent: true,
      teams: 1,
    },
    {
      email: "marie.curieuse@example.com",
      name: "Curieuse",
      firstname: "Marie",
      isReferent: false,
      teams: 2,
    },
    {
      email: "lucas.fort@example.com",
      name: "Fort",
      firstname: "Lucas",
      isReferent: true,
      teams: 3,
    },
    {
      email: "emma.linaire@example.com",
      name: "Linaire",
      firstname: "Emma",
      isReferent: false,
      teams: 4,
    },
    {
      email: "nathan.droit@example.com",
      name: "Droit",
      firstname: "Nathan",
      isReferent: true,
      teams: 5,
    },
    {
      email: "lea.bout@example.com",
      name: "Bout",
      firstname: "Léa",
      isReferent: false,
      teams: 6,
    },
    {
      email: "julien.barre@example.com",
      name: "Barré",
      firstname: "Julien",
      isReferent: true,
      teams: 7,
    },
    {
      email: "sarah.peut@example.com",
      name: "Peut",
      firstname: "Sarah",
      isReferent: false,
      teams: 8,
    },
    {
      email: "maxime.rate@example.com",
      name: "Raté",
      firstname: "Maxime",
      isReferent: true,
      teams: 9,
    },
    {
      email: "chloe.danse@example.com",
      name: "Danse",
      firstname: "Chloé",
      isReferent: false,
      teams: 10,
    },
    {
      email: "thomas.point@example.com",
      name: "Point",
      firstname: "Thomas",
      isReferent: false,
      teams: 2,
    },
    {
      email: "manon.verse@example.com",
      name: "Verse",
      firstname: "Manon",
      isReferent: false,
      teams: 3,
    },
    {
      email: "quentin.tation@example.com",
      name: "Tation",
      firstname: "Quentin",
      isReferent: true,
      teams: 4,
    },
    {
      email: "julie.rature@example.com",
      name: "Rature",
      firstname: "Julie",
      isReferent: false,
      teams: 5,
    },
    {
      email: "hugo.boss@example.com",
      name: "Boss",
      firstname: "Hugo",
      isReferent: false,
      teams: 6,
    },
    {
      email: "camille.taire@example.com",
      name: "Taire",
      firstname: "Camille",
      isReferent: false,
      teams: 7,
    },
    {
      email: "axel.rateur@example.com",
      name: "Rateur",
      firstname: "Axel",
      isReferent: true,
      teams: 8,
    },
    {
      email: "sophie.ticate@example.com",
      name: "Ticate",
      firstname: "Sophie",
      isReferent: false,
      teams: 9,
    },
    {
      email: "vincent.time@example.com",
      name: "Time",
      firstname: "Vincent",
      isReferent: false,
      teams: 10,
    },
    {
      email: "melanie.gerie@example.com",
      name: "Gerie",
      firstname: "Mélanie",
      isReferent: true,
      teams: 2,
    },
  ];

  const usersToSave = users.map((user) => {
    return createUser(
      user.email,
      user.name,
      user.firstname,
      user.isReferent,
      user.teams
    );
  });

  const userRepository = dataSource.getRepository(User);
  for (const user of usersToSave) {
    await userRepository.save(user);
  }
};
