import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeDecimalColumnsToIntInFarmsTable1759546988591
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('farms', [
      new TableColumn({
        name: 'total_area_tmp',
        type: 'bigint',
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: 'agricultural_area_tmp',
        type: 'bigint',
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: 'vegetation_area_tmp',
        type: 'bigint',
        isNullable: false,
        default: 0,
      }),
    ]);

    await queryRunner.query(`
      UPDATE farms
      SET 
        total_area_tmp = ROUND(total_area * 10000),
        agricultural_area_tmp = ROUND(agricultural_area * 10000),
        vegetation_area_tmp = ROUND(vegetation_area * 10000)
    `);

    await queryRunner.dropColumn('farms', 'total_area');
    await queryRunner.dropColumn('farms', 'agricultural_area');
    await queryRunner.dropColumn('farms', 'vegetation_area');

    await queryRunner.renameColumn('farms', 'total_area_tmp', 'total_area');
    await queryRunner.renameColumn(
      'farms',
      'agricultural_area_tmp',
      'agricultural_area',
    );
    await queryRunner.renameColumn(
      'farms',
      'vegetation_area_tmp',
      'vegetation_area',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('farms', [
      new TableColumn({
        name: 'total_area_tmp',
        type: 'decimal',
        precision: 8,
        scale: 2,
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: 'agricultural_area_tmp',
        type: 'decimal',
        precision: 8,
        scale: 2,
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: 'vegetation_area_tmp',
        type: 'decimal',
        precision: 8,
        scale: 2,
        isNullable: false,
        default: 0,
      }),
    ]);

    await queryRunner.query(`
      UPDATE farms
      SET 
        total_area_tmp = total_area / 10000.0,
        agricultural_area_tmp = agricultural_area / 10000.0,
        vegetation_area_tmp = vegetation_area / 10000.0
    `);

    await queryRunner.dropColumn('farms', 'total_area');
    await queryRunner.dropColumn('farms', 'agricultural_area');
    await queryRunner.dropColumn('farms', 'vegetation_area');

    await queryRunner.renameColumn('farms', 'total_area_tmp', 'total_area');
    await queryRunner.renameColumn(
      'farms',
      'agricultural_area_tmp',
      'agricultural_area',
    );
    await queryRunner.renameColumn(
      'farms',
      'vegetation_area_tmp',
      'vegetation_area',
    );
  }
}
