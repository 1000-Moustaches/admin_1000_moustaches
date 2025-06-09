// @ts-ignore
import { HostFamilyKind } from "../dist/app/models/HostFamilyKind";
// @ts-ignore
import { HostFamily } from "../dist/app/models/HostFamily";
// Used for dev (to get the typed entity)
//import { HostFamilyKind } from "../app/models/HostFamilyKind";
//import { HostFamily } from "../app/models/HostFamily";
import { DataSource } from "typeorm";

const createHostFamily = (
  name: string,
  firstname: string,
  phone: string,
  mail: string,
  socialNetworkAlias: string,
  address: string,
  driverLicense: boolean,
  hasVehicule: boolean,
  nbChildren: number,
  childrenInfos: string,
  animalsInfos: string,
  canProvideVeterinaryCare: boolean,
  canProvideSociabilisation: boolean,
  canHostDisableAnimal: boolean,
  canProvideNightCare: boolean,
  observations: string,
  housingInformations: string,
  canIsolate: boolean,
  hostConditions: string,
  onBreak: boolean,
  membershipUpToDate: boolean,
  isTemporary: boolean,
  situation: string,
  hostFamilyKinds: HostFamilyKind[]
) => {
  const hostFamily = new HostFamily();
  hostFamily.name = name;
  hostFamily.firstname = firstname;
  hostFamily.phone = phone;
  hostFamily.mail = mail;
  hostFamily.socialNetworkAlias = socialNetworkAlias;
  hostFamily.address = address;
  hostFamily.driverLicense = driverLicense;
  hostFamily.hasVehicule = hasVehicule;
  hostFamily.nbChildren = nbChildren;
  hostFamily.childrenInfos = childrenInfos;
  hostFamily.animalsInfos = animalsInfos;
  hostFamily.canProvideVeterinaryCare = canProvideVeterinaryCare;
  hostFamily.canProvideSociabilisation = canProvideSociabilisation;
  hostFamily.canHostDisableAnimal = canHostDisableAnimal;
  hostFamily.canProvideNightCare = canProvideNightCare;
  hostFamily.observations = observations;
  hostFamily.housingInformations = housingInformations;
  hostFamily.canIsolate = canIsolate;
  hostFamily.hostConditions = hostConditions;
  hostFamily.onBreak = onBreak;
  hostFamily.membershipUpToDate = membershipUpToDate;
  hostFamily.isTemporary = isTemporary;
  hostFamily.situation = situation;
  hostFamily.hostFamilyKinds = hostFamilyKinds;
  return hostFamily;
};

export const createHostFamilies = async (dataSource: DataSource) => {
  const hostFamilyKinds = await dataSource.getRepository(HostFamilyKind).find();
  const hostFamilyKindsMap = new Map(hostFamilyKinds.map(kind => [kind.name, kind]));

  const hostfamilies = [
    {
      name: "Martin",
      firstname: "Claire",
      phone: "0602030405",
      mail: "claire.martin@example.com",
      socialNetworkAlias: "@clairem",
      address: "12 rue des Lilas, 75012 Paris",
      driverLicense: true,
      hasVehicule: true,
      nbChildren: 2,
      childrenInfos: "Âgés de 5 et 8 ans, habitués aux chats.",
      animalsInfos: "Un chien calme de 6 ans, stérilisé.",
      canProvideVeterinaryCare: true,
      canProvideSociabilisation: true,
      canHostDisableAnimal: false,
      canProvideNightCare: true,
      observations: "Travaille à domicile, très disponible.",
      housingInformations: "Appartement 90m² avec balcon sécurisé.",
      canIsolate: true,
      hostConditions: "Pas d’animaux agressifs, pas de NAC.",
      onBreak: false,
      membershipUpToDate: true,
      isTemporary: false,
      situation: "En couple avec enfants",
      hostFamilyKinds: ["Chats"]
    },
    {
      name: "Dubois",
      firstname: "Antoine",
      phone: "0677889900",
      mail: "antoine.dubois@example.com",
      socialNetworkAlias: "@antoine_d",
      address: "4 avenue de la Liberté, 69003 Lyon",
      driverLicense: true,
      hasVehicule: false,
      nbChildren: 0,
      childrenInfos: "",
      animalsInfos: "Aucun animal pour le moment.",
      canProvideVeterinaryCare: false,
      canProvideSociabilisation: true,
      canHostDisableAnimal: true,
      canProvideNightCare: false,
      observations: "Travail de nuit, libre en journée.",
      housingInformations: "Appartement 65m², rez-de-chaussée.",
      canIsolate: false,
      hostConditions: "Pas d'animaux bruyants.",
      onBreak: false,
      membershipUpToDate: false,
      isTemporary: true,
      situation: "Célibataire, en colocation",
      hostFamilyKinds: ["Chats", "Chatons + Maman"]
    },
    {
      name: "Leclerc",
      firstname: "Sophie",
      phone: "0611223344",
      mail: "sophie.leclerc@example.com",
      socialNetworkAlias: "@so.leclerc",
      address: "7 rue du Moulin, 44000 Nantes",
      driverLicense: true,
      hasVehicule: true,
      nbChildren: 1,
      childrenInfos: "Fille de 12 ans, adore les animaux.",
      animalsInfos: "Deux chats stérilisés.",
      canProvideVeterinaryCare: true,
      canProvideSociabilisation: true,
      canHostDisableAnimal: true,
      canProvideNightCare: true,
      observations: "Expérience en sociabilisation de chats craintifs.",
      housingInformations: "Maison avec jardin clos.",
      canIsolate: true,
      hostConditions: "Pas de chiens agressifs.",
      onBreak: false,
      membershipUpToDate: true,
      isTemporary: false,
      situation: "En couple",
      hostFamilyKinds: ["Chiens"]
    },
    {
      name: "Bernard",
      firstname: "Luc",
      phone: "0622334455",
      mail: "luc.bernard@example.com",
      socialNetworkAlias: "@luc_b",
      address: "18 impasse des Cerisiers, 67000 Strasbourg",
      driverLicense: false,
      hasVehicule: false,
      nbChildren: 0,
      childrenInfos: "",
      animalsInfos: "Un lapin en liberté.",
      canProvideVeterinaryCare: false,
      canProvideSociabilisation: false,
      canHostDisableAnimal: false,
      canProvideNightCare: false,
      observations: "Disponible uniquement les week-ends.",
      housingInformations: "Studio de 30m².",
      canIsolate: false,
      hostConditions: "Uniquement NAC et petits animaux.",
      onBreak: true,
      membershipUpToDate: false,
      isTemporary: true,
      situation: "Étudiant",
      hostFamilyKinds: ["Chatons + Maman", "Chatons biberonnage"]
    },
    {
      name: "Petit",
      firstname: "Emma",
      phone: "0644556677",
      mail: "emma.petit@example.com",
      socialNetworkAlias: "@emma_p",
      address: "22 rue Victor Hugo, 21000 Dijon",
      driverLicense: true,
      hasVehicule: true,
      nbChildren: 3,
      childrenInfos: "9, 11 et 14 ans, tous à l’aise avec les chiens.",
      animalsInfos: "Un chien et un hamster.",
      canProvideVeterinaryCare: true,
      canProvideSociabilisation: true,
      canHostDisableAnimal: false,
      canProvideNightCare: true,
      observations: "Souhaite accueillir uniquement petits chiens.",
      housingInformations: "Maison avec terrain de 300m².",
      canIsolate: true,
      hostConditions: "Pas de chats non sociabilisés.",
      onBreak: false,
      membershipUpToDate: true,
      isTemporary: false,
      situation: "Famille nombreuse",
      hostFamilyKinds: ["Chiens", "Chiots"]
    },
    {
      name: "Girard",
      firstname: "Nicolas",
      phone: "0677001122",
      mail: "nicolas.girard@example.com",
      socialNetworkAlias: "@nicolas_g",
      address: "3 rue des Peupliers, 31000 Toulouse",
      driverLicense: true,
      hasVehicule: true,
      nbChildren: 0,
      childrenInfos: "",
      animalsInfos: "Ancien propriétaire d’un chien guide.",
      canProvideVeterinaryCare: true,
      canProvideSociabilisation: true,
      canHostDisableAnimal: true,
      canProvideNightCare: true,
      observations: "Très engagé, bénévole SPA depuis 5 ans.",
      housingInformations: "Appartement 70m² avec cour intérieure.",
      canIsolate: true,
      hostConditions: "Aucun animal trop bruyant.",
      onBreak: false,
      membershipUpToDate: true,
      isTemporary: false,
      situation: "Retraité",
      hostFamilyKinds: ["Lapins", "Hamsters"]
    },
    {
      name: "Marchand",
      firstname: "Laura",
      phone: "0612121212",
      mail: "laura.marchand@example.com",
      socialNetworkAlias: "@lauram",
      address: "10 rue Saint-Pierre, 13000 Marseille",
      driverLicense: true,
      hasVehicule: false,
      nbChildren: 1,
      childrenInfos: "Garçon de 6 ans, adore les NAC.",
      animalsInfos: "Deux cochons d’Inde.",
      canProvideVeterinaryCare: false,
      canProvideSociabilisation: true,
      canHostDisableAnimal: false,
      canProvideNightCare: false,
      observations: "Maison calme, mais sans véhicule.",
      housingInformations: "Maison mitoyenne 2 chambres.",
      canIsolate: true,
      hostConditions: "Pas de chats ou chiens.",
      onBreak: false,
      membershipUpToDate: true,
      isTemporary: true,
      situation: "Mère célibataire",
      hostFamilyKinds: ["Rats"]
    },
    {
      name: "Benoît",
      firstname: "Julien",
      phone: "0655554444",
      mail: "julien.benoit@example.com",
      socialNetworkAlias: "@julien_b",
      address: "29 rue des Roses, 34000 Montpellier",
      driverLicense: true,
      hasVehicule: true,
      nbChildren: 0,
      childrenInfos: "",
      animalsInfos: "Aucun pour le moment, mais expérience en accueil.",
      canProvideVeterinaryCare: true,
      canProvideSociabilisation: true,
      canHostDisableAnimal: true,
      canProvideNightCare: true,
      observations: "Flexible sur la durée d'accueil.",
      housingInformations: "T3 avec terrasse fermée.",
      canIsolate: true,
      hostConditions: "Ouvert à tout type d’animal sociable.",
      onBreak: false,
      membershipUpToDate: true,
      isTemporary: false,
      situation: "Célibataire, travaille à distance",
      hostFamilyKinds: ["Chats", "Chatons + Maman", "Chatons"]
    },
    {
      name: "Lambert",
      firstname: "Camille",
      phone: "0600001111",
      mail: "camille.lambert@example.com",
      socialNetworkAlias: "@cam_lambert",
      address: "1 chemin des Écoles, 50000 Saint-Lô",
      driverLicense: false,
      hasVehicule: false,
      nbChildren: 0,
      childrenInfos: "",
      animalsInfos: "Un chat de 3 ans, très calme.",
      canProvideVeterinaryCare: false,
      canProvideSociabilisation: true,
      canHostDisableAnimal: false,
      canProvideNightCare: false,
      observations: "Temps libre les week-ends uniquement.",
      housingInformations: "Studio, pas de balcon.",
      canIsolate: false,
      hostConditions: "Seulement petits animaux sociables.",
      onBreak: true,
      membershipUpToDate: false,
      isTemporary: true,
      situation: "Étudiante",
      hostFamilyKinds: ["Hamsters", "Rats"]
    },
    {
      name: "Moreau",
      firstname: "Isabelle",
      phone: "0633445566",
      mail: "isabelle.moreau@example.com",
      socialNetworkAlias: "@isa.moreau",
      address: "14 rue des Marronniers, 75014 Paris",
      driverLicense: true,
      hasVehicule: true,
      nbChildren: 0,
      childrenInfos: "",
      animalsInfos: "Ancienne propriétaire de NAC (chinchilla).",
      canProvideVeterinaryCare: true,
      canProvideSociabilisation: false,
      canHostDisableAnimal: true,
      canProvideNightCare: true,
      observations: "Calme, rigoureuse, très disponible.",
      housingInformations: "Appartement sécurisé 2 pièces.",
      canIsolate: true,
      hostConditions: "Pas de chiens aboyeurs.",
      onBreak: false,
      membershipUpToDate: true,
      isTemporary: false,
      situation: "En couple sans enfants",
      hostFamilyKinds: ["Chats", "Chatons + Maman", "Chatons"]
    },
  ];

  const HostFamiliesToSave = hostfamilies.map((hostFamily) => {
    return createHostFamily(
      hostFamily.name,
      hostFamily.firstname,
      hostFamily.phone,
      hostFamily.mail,
      hostFamily.socialNetworkAlias,
      hostFamily.address,
      hostFamily.driverLicense,
      hostFamily.hasVehicule,
      hostFamily.nbChildren,
      hostFamily.childrenInfos,
      hostFamily.animalsInfos,
      hostFamily.canProvideVeterinaryCare,
      hostFamily.canProvideSociabilisation,
      hostFamily.canHostDisableAnimal,
      hostFamily.canProvideNightCare,
      hostFamily.observations,
      hostFamily.housingInformations,
      hostFamily.canIsolate,
      hostFamily.hostConditions,
      hostFamily.onBreak,
      hostFamily.membershipUpToDate,
      hostFamily.isTemporary,
      hostFamily.situation,
      hostFamily.hostFamilyKinds.map(kind => hostFamilyKindsMap.get(kind)).filter(kind => kind !== undefined) as HostFamilyKind[]
    );
  });

  const userRepository = dataSource.getRepository(HostFamily);
  for (const hostFamily of HostFamiliesToSave) {
    await userRepository.save(hostFamily);
  }
};
