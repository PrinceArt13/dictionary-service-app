import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDB1726420245100 implements MigrationInterface {
    name = 'CreateDB1726420245100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "DictionaryServiceDB"."user" ("id" SERIAL NOT NULL, "login" character varying(50) NOT NULL, "password" character varying(256) NOT NULL, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "DictionaryServiceDB"."language" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_7df7d1e250ea2a416f078a631fb" UNIQUE ("name"), CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "DictionaryServiceDB"."country" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "alpha2" character varying(2) NOT NULL, "alpha3" character varying(3) NOT NULL, "deletedAt" TIMESTAMP, "languageId" integer, CONSTRAINT "UQ_2c5aa339240c0c3ae97fcc9dc4c" UNIQUE ("name"), CONSTRAINT "UQ_05bb99dff5ece9e1234a48bf0da" UNIQUE ("alpha2"), CONSTRAINT "UQ_f99016ded6fcc47ddf50ec74ba1" UNIQUE ("alpha3"), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "DictionaryServiceDB"."region" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "deletedAt" TIMESTAMP, "countryId" integer, CONSTRAINT "UQ_8d766fc1d4d2e72ecd5f6567a02" UNIQUE ("name"), CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "DictionaryServiceDB"."currency" ("id" SERIAL NOT NULL, "code" character varying(3) NOT NULL, "name" character varying(25) NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_723472e41cae44beb0763f4039c" UNIQUE ("code"), CONSTRAINT "UQ_77f11186dd58a8d87ad5fff0246" UNIQUE ("name"), CONSTRAINT "PK_3cda65c731a6264f0e444cc9b91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "DictionaryServiceDB"."city" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "deletedAt" TIMESTAMP, "regionId" integer, CONSTRAINT "UQ_f8c0858628830a35f19efdc0ecf" UNIQUE ("name"), CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "DictionaryServiceDB"."bank" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "treasury" integer NOT NULL, "special" character varying, "deletedAt" TIMESTAMP, "locationId" integer, CONSTRAINT "PK_7651eaf705126155142947926e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "DictionaryServiceDB"."bank_currencies_currency" ("bankId" integer NOT NULL, "currencyId" integer NOT NULL, CONSTRAINT "PK_8b01349adaf435e93fc08379fa9" PRIMARY KEY ("bankId", "currencyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_22d8f00754ac5f0ad8f4a49274" ON "DictionaryServiceDB"."bank_currencies_currency" ("bankId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7ab917c4e26c33419ff26e48c9" ON "DictionaryServiceDB"."bank_currencies_currency" ("currencyId") `);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."user" DROP CONSTRAINT "UQ_a62473490b3e4578fd683235c5e"`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."user" DROP COLUMN "login"`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."user" ADD "login" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."user" ADD CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login")`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."country" ADD CONSTRAINT "FK_578f260ceb6e8a4a33268d442eb" FOREIGN KEY ("languageId") REFERENCES "DictionaryServiceDB"."language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."region" ADD CONSTRAINT "FK_75ceb9efda6c228a50d88dcdfb8" FOREIGN KEY ("countryId") REFERENCES "DictionaryServiceDB"."country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."city" ADD CONSTRAINT "FK_a702dde63cef536819298d776b5" FOREIGN KEY ("regionId") REFERENCES "DictionaryServiceDB"."region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."bank" ADD CONSTRAINT "FK_b30da21dd0655d5e4694024980c" FOREIGN KEY ("locationId") REFERENCES "DictionaryServiceDB"."city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."bank_currencies_currency" ADD CONSTRAINT "FK_22d8f00754ac5f0ad8f4a492740" FOREIGN KEY ("bankId") REFERENCES "DictionaryServiceDB"."bank"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."bank_currencies_currency" ADD CONSTRAINT "FK_7ab917c4e26c33419ff26e48c91" FOREIGN KEY ("currencyId") REFERENCES "DictionaryServiceDB"."currency"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."bank_currencies_currency" DROP CONSTRAINT "FK_7ab917c4e26c33419ff26e48c91"`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."bank_currencies_currency" DROP CONSTRAINT "FK_22d8f00754ac5f0ad8f4a492740"`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."bank" DROP CONSTRAINT "FK_b30da21dd0655d5e4694024980c"`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."city" DROP CONSTRAINT "FK_a702dde63cef536819298d776b5"`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."region" DROP CONSTRAINT "FK_75ceb9efda6c228a50d88dcdfb8"`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."country" DROP CONSTRAINT "FK_578f260ceb6e8a4a33268d442eb"`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."user" DROP CONSTRAINT "UQ_a62473490b3e4578fd683235c5e"`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."user" DROP COLUMN "login"`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."user" ADD "login" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "DictionaryServiceDB"."user" ADD CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login")`);
        await queryRunner.query(`DROP INDEX "DictionaryServiceDB"."IDX_7ab917c4e26c33419ff26e48c9"`);
        await queryRunner.query(`DROP INDEX "DictionaryServiceDB"."IDX_22d8f00754ac5f0ad8f4a49274"`);
        await queryRunner.query(`DROP TABLE "DictionaryServiceDB"."bank_currencies_currency"`);
        await queryRunner.query(`DROP TABLE "DictionaryServiceDB"."bank"`);
        await queryRunner.query(`DROP TABLE "DictionaryServiceDB"."city"`);
        await queryRunner.query(`DROP TABLE "DictionaryServiceDB"."currency"`);
        await queryRunner.query(`DROP TABLE "DictionaryServiceDB"."region"`);
        await queryRunner.query(`DROP TABLE "DictionaryServiceDB"."country"`);
        await queryRunner.query(`DROP TABLE "DictionaryServiceDB"."language"`);
        await queryRunner.query(`DROP TABLE "DictionaryServiceDB"."user"`);
    }

}
