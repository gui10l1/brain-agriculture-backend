import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateAreaColumnsForFarmsTable1759413219315
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('farms', [
      {
        oldColumn: new TableColumn({
          name: 'total_area',
          type: 'decimal',
        }),
        newColumn: new TableColumn({
          name: 'total_area',
          type: 'decimal',
          precision: 8,
          scale: 2,
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'agricultural_area',
          type: 'decimal',
        }),
        newColumn: new TableColumn({
          name: 'agricultural_area',
          type: 'decimal',
          precision: 8,
          scale: 2,
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'vegetation_area',
          type: 'decimal',
        }),
        newColumn: new TableColumn({
          name: 'vegetation_area',
          type: 'decimal',
          precision: 8,
          scale: 2,
          isNullable: false,
        }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('farms', [
      {
        oldColumn: new TableColumn({
          name: 'total_area',
          type: 'decimal',
        }),
        newColumn: new TableColumn({
          name: 'total_area',
          type: 'decimal',
          precision: 5,
          scale: 2,
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'agricultural_area',
          type: 'decimal',
        }),
        newColumn: new TableColumn({
          name: 'agricultural_area',
          type: 'decimal',
          precision: 5,
          scale: 2,
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'vegetation_area',
          type: 'decimal',
        }),
        newColumn: new TableColumn({
          name: 'vegetation_area',
          type: 'decimal',
          precision: 5,
          scale: 2,
          isNullable: false,
        }),
      },
    ]);
  }
}
