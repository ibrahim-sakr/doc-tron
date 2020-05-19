import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createJobTable1589749619232 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'jobs',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'in_progress',
                    type: 'tinyint',
                    default: false,
                    isNullable: false
                },
                {
                    name: 'queued',
                    type: 'tinyint',
                    isNullable: false
                },
                {
                    name: 'scheduled',
                    type: 'varchar',
                    length: '50',
                    isNullable: false
                },
                {
                    name: 'worker',
                    type: 'json',
                    isNullable: false
                },
                {
                    name: 'next_run',
                    type: 'timestamp',
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'current_timestamp',
                    isNullable: false
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'current_timestamp',
                    isNullable: false
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("jobs");
    }

}

