import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddTimeZone1596015675289 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'created_at');
        await queryRunner.dropColumn('appointments', 'updated_at');
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp with time zone',
                default: 'now()',
            }),
        );
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp with time zone',
                default: 'now()',
            }),
        );

        await queryRunner.dropColumn('users', 'created_at');
        await queryRunner.dropColumn('users', 'updated_at');
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp with time zone',
                default: 'now()',
            }),
        );
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp with time zone',
                default: 'now()',
            }),
        );

        await queryRunner.dropColumn('user_tokens', 'created_at');
        await queryRunner.dropColumn('user_tokens', 'updated_at');
        await queryRunner.addColumn(
            'user_tokens',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp with time zone',
                default: 'now()',
            }),
        );
        await queryRunner.addColumn(
            'user_tokens',
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp with time zone',
                default: 'now()',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'updated_at');
        await queryRunner.dropColumn('appointments', 'created_at');

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );

        await queryRunner.dropColumn('users', 'updated_at');
        await queryRunner.dropColumn('users', 'created_at');

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );

        await queryRunner.dropColumn('user_tokens', 'updated_at');
        await queryRunner.dropColumn('user_tokens', 'created_at');

        await queryRunner.addColumn(
            'user_tokens',
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );

        await queryRunner.addColumn(
            'user_tokens',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );
    }
}
