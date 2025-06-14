import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPermissions1745071346931 implements MigrationInterface {
  name = 'AddPermissions1745071346931'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`ressource\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`create\` tinyint NOT NULL, \`read\` tinyint NOT NULL, \`update\` tinyint NOT NULL, \`delete\` tinyint NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`ressourceId\` int NULL, \`teamId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`team\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`user_teams_team\` (\`userId\` int NOT NULL, \`teamId\` int NOT NULL, INDEX \`IDX_5b1d47a221406321be714a8186\` (\`userId\`), INDEX \`IDX_a80f8ae0d425218dbaa2240df4\` (\`teamId\`), PRIMARY KEY (\`userId\`, \`teamId\`)) ENGINE=InnoDB`);

    // Add teams
    await queryRunner.query(`INSERT INTO \`team\` (\`id\`, \`name\`) VALUES (1, 'Admin'), (2, 'Event'), (3, 'Sponsorship'), (4, 'Communication'), (5, 'Adoption'), (6, 'Diffusion Manager'), (7, 'Diffusion'), (8, 'Veterinary'), (9, 'Pickup Manager'), (10, 'Pickup')`);

    // Add ressources
    await queryRunner.query(`INSERT INTO \`ressource\` (\`id\`, \`name\`) VALUES (1, 'pet_list'), (2, 'pet_info'), (3, 'pet_pickup'), (4, 'pet_health'), (5, 'pet_behavior'), (6, 'pet_diffusion'), (7, 'pet_exit'), (8, 'pet_death'), (9, 'pet_hist_veto'), (10, 'pet_hist_hf'), (11, 'hf_list'), (12, 'hf_contact'), (13, 'hf_address'), (14, 'hf_host'), (15, 'hf_hist_pets'), (16, 'vet_list'), (17, 'vet_info')`);

    // Add permissions
    await queryRunner.query(`INSERT INTO \`permission\` (\`id\`, \`teamId\`, \`ressourceId\`, \`create\`, \`read\`, \`update\`, \`delete\`) VALUES (1, 1, 1, 1, 1, 1, 1), (2, 1, 2, 1, 1, 1, 1), (3, 1, 3, 1, 1, 1, 1), (4, 1, 4, 1, 1, 1, 1), (5, 1, 5, 1, 1, 1, 1), (6, 1, 6, 1, 1, 1, 1), (7, 1, 7, 1, 1, 1, 1), (8, 1, 8, 1, 1, 1, 1), (9, 1, 9, 1, 1, 1, 1), (10, 1, 10, 1, 1, 1, 1), (11, 1, 11, 1, 1, 1, 1), (12, 1, 12, 1, 1, 1, 1), (13, 1, 13, 1, 1, 1, 1), (14, 1, 14, 1, 1, 1, 1), (15, 1, 15, 1, 1, 1, 1), (16, 1, 16, 1, 1, 1, 1), (17, 1, 17, 1, 1, 1, 1)`);
    await queryRunner.query(`INSERT INTO \`permission\` (\`id\`, \`teamId\`, \`ressourceId\`, \`create\`, \`read\`, \`update\`, \`delete\`) VALUES (18, 2, 1, 0, 1, 0, 0), (19, 2, 2, 0, 1, 0, 0), (20, 2, 3, 0, 1, 0, 0), (21, 2, 4, 0, 1, 0, 0), (22, 2, 5, 0, 1, 0, 0), (23, 2, 6, 0, 1, 0, 0), (24, 2, 7, 0, 1, 0, 0), (25, 2, 8, 0, 1, 0, 0), (26, 2, 9, 0, 0, 0, 0), (27, 2, 10, 0, 0, 0, 0), (28, 2, 11, 0, 0, 0, 0), (29, 2, 12, 0, 0, 0, 0), (30, 2, 13, 0, 0, 0, 0), (31, 2, 14, 0, 0, 0, 0), (32, 2, 15, 0, 0, 0, 0), (33, 2, 16, 0, 0, 0, 0), (34, 2, 17, 0, 0, 0, 0)`);
    await queryRunner.query(`INSERT INTO \`permission\` (\`id\`, \`teamId\`, \`ressourceId\`, \`create\`, \`read\`, \`update\`, \`delete\`) VALUES (35, 3, 1, 0, 1, 0, 0), (36, 3, 2, 0, 1, 0, 0), (37, 3, 3, 0, 1, 0, 0), (38, 3, 4, 0, 1, 0, 0), (39, 3, 5, 0, 1, 0, 0), (40, 3, 6, 0, 1, 0, 0), (41, 3, 7, 0, 1, 0, 0), (42, 3, 8, 0, 1, 0, 0), (43, 3, 9, 0, 1, 0, 0), (44, 3, 10, 0, 1, 0, 0), (45, 3, 11, 0, 0, 0, 0), (46, 3, 12, 0, 0, 0, 0), (47, 3, 13, 0, 0, 0, 0), (48, 3, 14, 0, 0, 0, 0), (49, 3, 15, 0, 0, 0, 0), (50, 3, 16, 0, 0, 0, 0), (51, 3, 17, 0, 0, 0, 0)`);
    await queryRunner.query(`INSERT INTO \`permission\` (\`id\`, \`teamId\`, \`ressourceId\`, \`create\`, \`read\`, \`update\`, \`delete\`) VALUES (52, 4, 1, 0, 1, 0, 0), (53, 4, 2, 0, 1, 0, 0), (54, 4, 3, 0, 1, 0, 0), (55, 4, 4, 0, 1, 0, 0), (56, 4, 5, 0, 1, 0, 0), (57, 4, 6, 0, 1, 0, 0), (58, 4, 7, 0, 1, 0, 0), (59, 4, 8, 0, 1, 0, 0), (60, 4, 9, 0, 1, 0, 0), (61, 4, 10, 0, 1, 0, 0), (62, 4, 11, 0, 0, 0, 0), (63, 4, 12, 0, 0, 0, 0), (64, 4, 13, 0, 0, 0, 0), (65, 4, 14, 0, 0, 0, 0), (66, 4, 15, 0, 0, 0, 0), (67, 4, 16, 0, 0, 0, 0), (68, 4, 17, 0, 0, 0, 0)`);
    await queryRunner.query(`INSERT INTO \`permission\` (\`id\`, \`teamId\`, \`ressourceId\`, \`create\`, \`read\`, \`update\`, \`delete\`) VALUES (69, 5, 1, 0, 1, 0, 0), (70, 5, 2, 0, 1, 0, 0), (71, 5, 3, 0, 1, 0, 0), (72, 5, 4, 0, 1, 0, 0), (73, 5, 5, 0, 1, 0, 0), (74, 5, 6, 0, 1, 0, 0), (75, 5, 7, 0, 1, 0, 0), (76, 5, 8, 0, 1, 0, 0), (77, 5, 9, 0, 1, 0, 0), (78, 5, 10, 0, 1, 0, 0), (79, 5, 11, 0, 0, 0, 0), (80, 5, 12, 0, 0, 0, 0), (81, 5, 13, 0, 0, 0, 0), (82, 5, 14, 0, 0, 0, 0), (83, 5, 15, 0, 0, 0, 0), (84, 5, 16, 0, 0, 0, 0), (85, 5, 17, 0, 0, 0, 0)`);
    await queryRunner.query(`INSERT INTO \`permission\` (\`id\`, \`teamId\`, \`ressourceId\`, \`create\`, \`read\`, \`update\`, \`delete\`) VALUES (86, 6, 1, 0, 1, 0, 0), (87, 6, 2, 0, 1, 0, 0), (88, 6, 3, 0, 1, 0, 0), (89, 6, 4, 0, 1, 0, 0), (90, 6, 5, 0, 1, 0, 0), (91, 6, 6, 0, 1, 0, 0), (92, 6, 7, 0, 1, 1, 0), (93, 6, 8, 0, 1, 0, 0), (94, 6, 9, 0, 1, 0, 0), (95, 6, 10, 0, 1, 0, 0), (96, 6, 11, 0, 0, 0, 0), (97, 6, 12, 0, 0, 0, 0), (98, 6, 13, 0, 0, 0, 0), (99, 6, 14, 0, 0, 0, 0), (100, 6, 15, 0, 0, 0, 0), (101, 6, 16, 0, 0, 0, 0), (102, 6, 17, 0, 0, 0, 0)`);
    await queryRunner.query(`INSERT INTO \`permission\` (\`id\`, \`teamId\`, \`ressourceId\`, \`create\`, \`read\`, \`update\`, \`delete\`) VALUES (103, 7, 1, 0, 1, 0, 0), (104, 7, 2, 0, 1, 0, 0), (105, 7, 3, 0, 1, 0, 0), (106, 7, 4, 0, 1, 0, 0), (107, 7, 5, 0, 1, 0, 0), (108, 7, 6, 0, 1, 0, 0), (109, 7, 7, 0, 1, 0, 0), (110, 7, 8, 0, 1, 0, 0), (111, 7, 9, 0, 1, 0, 0), (112, 7, 10, 0, 1, 0, 0), (113, 7, 11, 0, 0, 0, 0), (114, 7, 12, 0, 0, 0, 0), (115, 7, 13, 0, 0, 0, 0), (116, 7, 14, 0, 0, 0, 0), (117, 7, 15, 0, 0, 0, 0), (118, 7, 16, 0, 0, 0, 0), (119, 7, 17, 0, 0, 0, 0)`);
    await queryRunner.query(`INSERT INTO \`permission\` (\`id\`, \`teamId\`, \`ressourceId\`, \`create\`, \`read\`, \`update\`, \`delete\`) VALUES (120, 8, 1, 0, 1, 0, 0), (121, 8, 2, 0, 1, 0, 0), (122, 8, 3, 0, 1, 0, 0), (123, 8, 4, 0, 1, 0, 0), (124, 8, 5, 0, 1, 0, 0), (125, 8, 6, 0, 1, 0, 0), (126, 8, 7, 0, 1, 0, 0), (127, 8, 8, 0, 1, 0, 0), (128, 8, 9, 0, 1, 1, 1), (129, 8, 10, 0, 1, 0, 0), (130, 8, 11, 0, 0, 0, 0), (131, 8, 12, 0, 0, 0, 0), (132, 8, 13, 0, 0, 0, 0), (133, 8, 14, 0, 0, 0, 0), (134, 8, 15, 0, 0, 0, 0), (135, 8, 16, 1, 1, 1, 1), (136, 8, 17, 1, 1, 1, 1)`);
    await queryRunner.query(`INSERT INTO \`permission\` (\`id\`, \`teamId\`, \`ressourceId\`, \`create\`, \`read\`, \`update\`, \`delete\`) VALUES (137, 9, 1, 1, 1, 1, 1), (138, 9, 2, 1, 1, 1, 1), (139, 9, 3, 1, 1, 1, 1), (140, 9, 4, 1, 1, 1, 1), (141, 9, 5, 1, 1, 1, 1), (142, 9, 6, 1, 1, 1, 1), (143, 9, 7, 1, 1, 1, 1), (144, 9, 8, 1, 1, 1, 1), (145, 9, 9, 0, 1, 0, 0), (146, 9, 10, 0, 1, 0, 0), (147, 9, 11, 0, 1, 0, 0), (148, 9, 12, 0, 1, 0, 0), (149, 9, 13, 0, 1, 0, 0), (150, 9, 14, 0, 1, 0, 0), (151, 9, 15, 0, 1, 0, 0), (152, 9, 16, 0, 0, 0, 0), (153, 9, 17, 0, 0, 0, 0)`);
    await queryRunner.query(`INSERT INTO \`permission\` (\`id\`, \`teamId\`, \`ressourceId\`, \`create\`, \`read\`, \`update\`, \`delete\`) VALUES (154, 10, 1, 0, 1, 0, 0), (155, 10, 2, 0, 0, 0, 0), (156, 10, 3, 0, 0, 0, 0), (157, 10, 4, 0, 0, 0, 0), (158, 10, 5, 0, 0, 0, 0), (159, 10, 6, 0, 0, 0, 0), (160, 10, 7, 0, 0, 0, 0), (161, 10, 8, 0, 0, 0, 0), (162, 10, 9, 0, 1, 0, 0), (163, 10, 10, 0, 1, 0, 0), (164, 10, 11, 0, 1, 0, 0), (165, 10, 12, 0, 1, 0, 0), (166, 10, 13, 0, 1, 0, 0), (167, 10, 14, 0, 1, 0, 0), (168, 10, 15, 0, 1, 0, 0), (169, 10, 16, 0, 0, 0, 0), (170, 10, 17, 0, 0, 0, 0)`);

    await queryRunner.query(`ALTER TABLE \`animal_host_family\` DROP FOREIGN KEY \`FK_58f36bdb0c809bb6c7d768e3bf8\``);
    await queryRunner.query(`ALTER TABLE \`animal_host_family\` DROP FOREIGN KEY \`FK_cd86b3b3afe38019ac72cc9c2d8\``);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`phone\` \`phone\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`mail\` \`mail\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`emergencies\` \`emergencies\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`appointmentConfirmationProcedure\` \`appointmentConfirmationProcedure\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`invoicePaymentDate\` \`invoicePaymentDate\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`paymentMethod\` \`paymentMethod\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`latitude\` \`latitude\` int NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`longitude\` \`longitude\` int NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`priceLevel\` \`priceLevel\` int NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian_intervention\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`sexe\` \`sexe\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`race\` \`race\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`birthdate\` \`birthdate\` datetime NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`entryDate\` \`entryDate\` datetime NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`distinctiveSigns\` \`distinctiveSigns\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`reasonForCare\` \`reasonForCare\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`placeOfCare\` \`placeOfCare\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`careInfos\` \`careInfos\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`exitDate\` \`exitDate\` datetime NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`exitReason\` \`exitReason\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`exitInfos\` \`exitInfos\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`deathDate\` \`deathDate\` datetime NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`deathReason\` \`deathReason\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`sterilised\` \`sterilised\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`firstVaccinationDate\` \`firstVaccinationDate\` datetime NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`secondVaccinationDate\` \`secondVaccinationDate\` datetime NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`fivNegative\` \`fivNegative\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`felvNegative\` \`felvNegative\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`healthIssues\` \`healthIssues\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`behaviour\` \`behaviour\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`needFriends\` \`needFriends\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`posture\` \`posture\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`catsOk\` \`catsOk\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`dogsOk\` \`dogsOk\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`kidsOk\` \`kidsOk\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`behaviorParticularity\` \`behaviorParticularity\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`adopted\` \`adopted\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`broadcastable\` \`broadcastable\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`bookable\` \`bookable\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`needExternalAccess\` \`needExternalAccess\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`transferor\` \`transferor\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`antiParasiticDate\` \`antiParasiticDate\` datetime NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`transferCertificate\` \`transferCertificate\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`reserved\` \`reserved\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`needIcadDuplicate\` \`needIcadDuplicate\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`contractSent\` \`contractSent\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`albumCreated\` \`albumCreated\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`animal_host_family\` CHANGE \`entryDate\` \`entryDate\` timestamp NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`phone\` \`phone\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`mail\` \`mail\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`socialNetworkAlias\` \`socialNetworkAlias\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`latitude\` \`latitude\` int NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`longitude\` \`longitude\` int NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`driverLicense\` \`driverLicense\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`hasVehicule\` \`hasVehicule\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`nbChildren\` \`nbChildren\` int NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`childrenInfos\` \`childrenInfos\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`animalsInfos\` \`animalsInfos\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`canProvideVeterinaryCare\` \`canProvideVeterinaryCare\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`canProvideSociabilisation\` \`canProvideSociabilisation\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`canHostDisableAnimal\` \`canHostDisableAnimal\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`canProvideNightCare\` \`canProvideNightCare\` tinyint NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`observations\` \`observations\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`housingInformations\` \`housingInformations\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`canIsolate\` \`canIsolate\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`hostConditions\` \`hostConditions\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`onBreak\` \`onBreak\` tinyint NULL DEFAULT FALSE`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`membershipUpToDate\` \`membershipUpToDate\` tinyint NULL DEFAULT FALSE`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`isTemporary\` \`isTemporary\` tinyint NULL DEFAULT FALSE`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`situation\` \`situation\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`firstname\` \`firstname\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NULL DEFAULT NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isReferent\` \`isReferent\` tinyint NULL DEFAULT FALSE`);
    await queryRunner.query(`ALTER TABLE \`animal_host_family\` ADD CONSTRAINT \`FK_928e04452e2616832331ea18ff5\` FOREIGN KEY (\`animalId\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`animal_host_family\` ADD CONSTRAINT \`FK_9d333a1256ad1c9bcc1d841c649\` FOREIGN KEY (\`hostFamilyId\`) REFERENCES \`host_family\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`permission\` ADD CONSTRAINT \`FK_72e510981244e349a56e4bac1aa\` FOREIGN KEY (\`ressourceId\`) REFERENCES \`ressource\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`permission\` ADD CONSTRAINT \`FK_4ff15ccf9e648f5255bd9f71a01\` FOREIGN KEY (\`teamId\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`user_teams_team\` ADD CONSTRAINT \`FK_5b1d47a221406321be714a8186d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE \`user_teams_team\` ADD CONSTRAINT \`FK_a80f8ae0d425218dbaa2240df49\` FOREIGN KEY (\`teamId\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user_teams_team\` DROP FOREIGN KEY \`FK_a80f8ae0d425218dbaa2240df49\``);
    await queryRunner.query(`ALTER TABLE \`user_teams_team\` DROP FOREIGN KEY \`FK_5b1d47a221406321be714a8186d\``);
    await queryRunner.query(`ALTER TABLE \`permission\` DROP FOREIGN KEY \`FK_4ff15ccf9e648f5255bd9f71a01\``);
    await queryRunner.query(`ALTER TABLE \`permission\` DROP FOREIGN KEY \`FK_72e510981244e349a56e4bac1aa\``);
    await queryRunner.query(`ALTER TABLE \`animal_host_family\` DROP FOREIGN KEY \`FK_9d333a1256ad1c9bcc1d841c649\``);
    await queryRunner.query(`ALTER TABLE \`animal_host_family\` DROP FOREIGN KEY \`FK_928e04452e2616832331ea18ff5\``);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isReferent\` \`isReferent\` tinyint NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`firstname\` \`firstname\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`situation\` \`situation\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`isTemporary\` \`isTemporary\` tinyint NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`membershipUpToDate\` \`membershipUpToDate\` tinyint NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`onBreak\` \`onBreak\` tinyint NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`hostConditions\` \`hostConditions\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`canIsolate\` \`canIsolate\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`housingInformations\` \`housingInformations\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`observations\` \`observations\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`canProvideNightCare\` \`canProvideNightCare\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`canHostDisableAnimal\` \`canHostDisableAnimal\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`canProvideSociabilisation\` \`canProvideSociabilisation\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`canProvideVeterinaryCare\` \`canProvideVeterinaryCare\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`animalsInfos\` \`animalsInfos\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`childrenInfos\` \`childrenInfos\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`nbChildren\` \`nbChildren\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`hasVehicule\` \`hasVehicule\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`driverLicense\` \`driverLicense\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`longitude\` \`longitude\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`latitude\` \`latitude\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`address\` \`address\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`socialNetworkAlias\` \`socialNetworkAlias\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`mail\` \`mail\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`host_family\` CHANGE \`phone\` \`phone\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`animal_host_family\` CHANGE \`entryDate\` \`entryDate\` timestamp NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`albumCreated\` \`albumCreated\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`contractSent\` \`contractSent\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`needIcadDuplicate\` \`needIcadDuplicate\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`reserved\` \`reserved\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`transferCertificate\` \`transferCertificate\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`antiParasiticDate\` \`antiParasiticDate\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`transferor\` \`transferor\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`needExternalAccess\` \`needExternalAccess\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`bookable\` \`bookable\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`broadcastable\` \`broadcastable\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`adopted\` \`adopted\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`behaviorParticularity\` \`behaviorParticularity\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`kidsOk\` \`kidsOk\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`dogsOk\` \`dogsOk\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`catsOk\` \`catsOk\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`posture\` \`posture\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`needFriends\` \`needFriends\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`behaviour\` \`behaviour\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`healthIssues\` \`healthIssues\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`felvNegative\` \`felvNegative\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`fivNegative\` \`fivNegative\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`secondVaccinationDate\` \`secondVaccinationDate\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`firstVaccinationDate\` \`firstVaccinationDate\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`sterilised\` \`sterilised\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`deathReason\` \`deathReason\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`deathDate\` \`deathDate\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`exitInfos\` \`exitInfos\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`exitReason\` \`exitReason\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`exitDate\` \`exitDate\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`careInfos\` \`careInfos\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`placeOfCare\` \`placeOfCare\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`reasonForCare\` \`reasonForCare\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`distinctiveSigns\` \`distinctiveSigns\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`entryDate\` \`entryDate\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`birthdate\` \`birthdate\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`race\` \`race\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`sexe\` \`sexe\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian_intervention\` CHANGE \`description\` \`description\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`priceLevel\` \`priceLevel\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`longitude\` \`longitude\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`latitude\` \`latitude\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`address\` \`address\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`paymentMethod\` \`paymentMethod\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`invoicePaymentDate\` \`invoicePaymentDate\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`appointmentConfirmationProcedure\` \`appointmentConfirmationProcedure\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`emergencies\` \`emergencies\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`mail\` \`mail\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`phone\` \`phone\` varchar(255) NULL`);
    await queryRunner.query(`DROP INDEX \`IDX_a80f8ae0d425218dbaa2240df4\` ON \`user_teams_team\``);
    await queryRunner.query(`DROP INDEX \`IDX_5b1d47a221406321be714a8186\` ON \`user_teams_team\``);
    await queryRunner.query(`DROP TABLE \`user_teams_team\``);
    await queryRunner.query(`DROP TABLE \`team\``);
    await queryRunner.query(`DROP TABLE \`permission\``);
    await queryRunner.query(`DROP TABLE \`ressource\``);
    await queryRunner.query(`ALTER TABLE \`animal_host_family\` ADD CONSTRAINT \`FK_cd86b3b3afe38019ac72cc9c2d8\` FOREIGN KEY (\`hostFamilyId\`) REFERENCES \`host_family\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`animal_host_family\` ADD CONSTRAINT \`FK_58f36bdb0c809bb6c7d768e3bf8\` FOREIGN KEY (\`animalId\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

}
