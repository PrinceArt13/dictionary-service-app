import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from '../entities/currencies';
import { CurrencyResolver } from './currency-resolver';
import { CurrencyService } from './currency-service';

@Module({
    imports: [TypeOrmModule.forFeature([Currency])],
    providers: [CurrencyResolver, CurrencyService],
})
export class CurrencyModule { }