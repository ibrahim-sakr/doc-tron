import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createLogTable1589749628110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'logs',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: 'job_id',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'status',
                    type: 'varchar',
                    length: '30',
                    isNullable: false
                },
                {
                    name: 'output',
                    type: 'mediumtext',
                    isNullable: true
                },
                {
                    name: 'error',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'started_at',
                    type: 'timestamp',
                    default: 'current_timestamp',
                    isNullable: false
                },
                {
                    name: 'finished_at',
                    type: 'timestamp',
                    default: 'current_timestamp',
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
            ],
            foreignKeys: [
                {
                    name: 'job_log_foreign_key',
                    columnNames: ['job_id'],
                    referencedTableName: 'jobs',
                    referencedColumnNames: ['id'],
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("logs");
    }
}
