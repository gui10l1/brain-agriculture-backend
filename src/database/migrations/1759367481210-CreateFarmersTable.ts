import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFarmersTable1759367481210 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'farmers',
        columns: [
          {
            name: 'id',
            type: 'int',
            generationStrategy: 'increment',
            isPrimary: true,
            unsigned: true,
            isGenerated: true,
          },
          {
            name: 'document',
            type: 'varchar',
            length: '14',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '150',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('farmers');
  }
}
