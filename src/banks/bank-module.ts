import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from '../entities/banks';
import { BankResolver } from './bank-resolver';
import { BankService } from './bank-service';

@Module({
    imports: [TypeOrmModule.forFeature([Bank])],
    providers: [BankResolver, BankService],
})
export class BankModule { }