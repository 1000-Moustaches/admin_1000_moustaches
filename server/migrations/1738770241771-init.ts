import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1738770241771 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add Default Species (Chat, Chien)
        await queryRunner.query(`INSERT INTO \`species\` (\`id\`, \`name\`) VALUES (1, 'Chat'), (2, 'Chien')`);

        // Add Default Host Family Kind (Chats, Chats + Maman, Chiens, Chatons biberonnage, Chiots, Lapins, Chatons, Rats, Hamsters)
        await queryRunner.query(`INSERT INTO \`host_family_kind\` (\`id\`, \`name\`) VALUES (1, 'Chats'), (2, 'Chatons + Maman'), (3, 'Chiens'), (4, 'Chatons biberonnage'), (5, 'Chiots'), (6, 'Lapins'), (13, 'Chatons'), (14, 'Rats'), (15, 'Hamsters')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM \`species\``);
        await queryRunner.query(`DELETE FROM \`host_family_kind\``);
    }

}
