import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { CountryModule } from './countries/country-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { RegionModule } from './regions/region-module';
import { CityModule } from './cities/city-module';
import { BankModule } from './banks/bank-module';
import { CurrencyModule } from './currencies/currency-module';
import { languageModule } from './languages/language-module';

dotenv.config();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [join(__dirname, './src/entities/*.{ts,js}')],
      migrations: [join(__dirname, 'migrations/*.{ts,js}')],
      synchronize: false,
    }),
    CountryModule,
    RegionModule,
    CityModule,
    BankModule,
    CurrencyModule,
    languageModule
  ],
},
)
export class AppModule { }
