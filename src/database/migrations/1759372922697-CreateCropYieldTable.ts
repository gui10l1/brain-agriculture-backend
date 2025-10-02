import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCropYieldTable1759372922697 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'crop_yields',
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
            name: 'farm_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'year',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'crops',
            type: 'text',
            isArray: true,
            isNullable: false,
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
        foreignKeys: [
          {
            name: 'FarmId',
            columnNames: ['farm_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'farms',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('crop_yields');
  }
}
