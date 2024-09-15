import { Injectable } from '@nestjs/common';
import { Bank } from '../entities/banks';
import { Like, Not } from 'typeorm';
import DataSource from '../../ormconfig';
import { City } from '../entities/cities';
import { Currency } from '../entities/currencies';

@Injectable()
export class BankService {
    // Создание банка
    async create(name: string, locationId: number, treasury: number, special: string, currenciesId: number[]): Promise<Bank> {
        if (!name || !locationId || !treasury || currenciesId.length == 0) {
            throw new Error("Не все значения заполнены.");
        }
        if (name.length > 25) {
            throw new Error("Название банка не может быть больше 25 символов.");
        }
        if (treasury > 2147483647) {
            throw new Error("Казна не может быть больше 2 147 483 647.");
        }
        const existingCity = await DataSource.getRepository(City).findOne({
            where: { id: locationId }
        });
        if (!existingCity) {
            throw new Error("Такого города не существует.");
        }
        const allBanks = await DataSource.getRepository(Bank).find();
        if (allBanks.some(x => x.name == name)) {
            throw new Error("Такой банк уже существует.");
        }
        const allCurrencies = await DataSource.getRepository(Currency).find();
        currenciesId.forEach(x => {
            if (!allCurrencies.some(y => y.id == x)) {
                throw new Error('Среди списка валют есть несуществующие.');
            }
        });

        const newBank = DataSource.getRepository(Bank).create({ name, location: { id: locationId }, treasury, special, currencies: currenciesId.map(id => ({ id })) });
        return await DataSource.getRepository(Bank).save(newBank);
    }

    // Обновление банка
    async update(id: number, updateData: { name: string, locationId: number, treasury: number, special: string, currenciesId: number[] }): Promise<Bank> {
        if (updateData.name.length > 25) {
            throw new Error("Название банка не может быть больше 25 символов.");
        }
        if (updateData.treasury > 2147483647) {
            throw new Error("Казна не может быть больше 2 147 483 647.");
        }

        const existingCity = await DataSource.getRepository(City).findOne({
            where: { id: updateData.locationId }
        });
        if (!existingCity) {
            throw new Error("Такого города не существует.");
        }

        const exisitngBank = await DataSource.getRepository(Bank).findOne({
            where: { id: id }
        });
        if (!exisitngBank) {
            throw new Error("Банк для обновления не существует.");
        }

        const allBanks = await DataSource.getRepository(Bank).find({
            where: { id: Not(id) }
        });
        if (allBanks.some(x => x.name == updateData.name)) {
            throw new Error("Такой банк уже существует.");
        }

        const allCurrencies = await DataSource.getRepository(Currency).find();
        updateData.currenciesId.forEach(x => {
            if (!allCurrencies.some(y => y.id == x)) {
                throw new Error('Среди списка валют есть несуществующие.');
            }
        });

        const updatedBank = {
            name: updateData.name,
            location: { id: updateData.locationId },
            treasury: updateData.treasury,
            special: updateData.special,
            currencies: updateData.currenciesId.map(id => ({ id }))
        };

        await DataSource.getRepository
        await DataSource.getRepository(Bank).update(id, updatedBank);
        return DataSource.getRepository(Bank).findOne({ where: { id }, relations: ['city'] });
    }

    // Soft-delete банка
    async remove(id: number): Promise<boolean> {
        const exisitngBank = await DataSource.getRepository(Bank).findOne({
            where: { id: id }
        });
        if (!exisitngBank) {
            throw new Error("Такого банка не существует.");
        }

        await DataSource.getRepository(Bank).softDelete(id);
        return true;
    }

    // Поиск с фильтрацией и пагинацией
    async findAll(search: string, page: number, limit: number): Promise<Bank[]> {
        const skip = (page - 1) * limit;
        const Banks = await DataSource.getRepository(Bank).find({
            where: search ? { name: Like(`%${search}%`) } : {},
            skip,
            take: limit,
            relations: ['location', 'currencies']
        });
        return Banks;
    }

    // Найти по ID
    async findOne(id: number): Promise<Bank> {
        const exisitngBank = await DataSource.getRepository(Bank).findOne({
            where: { id: id },
            relations: ['location', 'currency']
        });
        if (!exisitngBank) {
            throw new Error("Такого банка не существует.");
        }
        return exisitngBank;
    }
}