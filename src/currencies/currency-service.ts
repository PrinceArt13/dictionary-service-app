import { Injectable } from '@nestjs/common';
import { Currency } from '../entities/currencies';
import { Like, Not } from 'typeorm';
import DataSource from '../../ormconfig';

@Injectable()
export class CurrencyService {
    // Создание валюты
    async create(code: string, name: string): Promise<Currency> {
        if (code.length > 2) {
            throw new Error("Код не может быть длиннее 2 символов.");
        }

        if (name.length > 25) {
            throw new Error("Название не может быть длиннее.");
        }

        const existingCurrency = await DataSource.getRepository(Currency).findOne({
            where: [
                { name: name },
                { code: code }
            ]
        });
        if (existingCurrency) {
            throw new Error("Такая валюта уже существует.");
        }

        const newCurrency = DataSource.getRepository(Currency).create({ code, name });
        return await DataSource.getRepository(Currency).save(newCurrency);
    }

    // Обновление валюты
    async update(id: number, updateData: { code, name }): Promise<Currency> {
        const existingCurrency = await DataSource.getRepository(Currency).findOne({
            where: { id: id }
        });
        if (!existingCurrency) {
            throw new Error("Валюта для обновления не существует.");
        }
        if (updateData.code.length > 2) {
            throw new Error("Код не может быть длиннее 2 символов.");
        }
        if (updateData.name.length > 25) {
            throw new Error("Название не может быть длиннее.");
        }

        const allCurrencies = await DataSource.getRepository(Currency).find({
            where: { id: Not(id) }
        });
        if (allCurrencies.some(x => x.name == updateData.name || x.code == updateData.code)) {
            throw new Error("Валюта с таким названием или кодом уже существует.");
        }

        const updatedCurrency = { code: updateData.code, name: updateData.name };
        await DataSource.getRepository(Currency).update(id, updatedCurrency);
        return DataSource.getRepository(Currency).findOne({ where: { id } });
    }

    // Soft-delete валюты
    async remove(id: number): Promise<boolean> {
        const existingCurrency = await DataSource.getRepository(Currency).findOne({
            where: { id: id }
        });
        if (!existingCurrency) {
            throw new Error("Валюты для удаления не существует.");
        }
        await DataSource.getRepository(Currency).softDelete(id);
        return true;
    }

    // Поиск с фильтрацией и пагинацией
    async findAll(search: string, page: number, limit: number): Promise<Currency[]> {
        const skip = (page - 1) * limit;
        const currencies = await DataSource.getRepository(Currency).find({
            where: search ? [
                { name: Like(`%${search}%`) },
                { code: Like(`%${search}%`) }
            ] : {},
            skip,
            take: limit
        });
        return currencies;
    }

    // Найти по ID
    async findOne(id: number): Promise<Currency> {
        const existingCurrency = await DataSource.getRepository(Currency).findOne({ where: { id } });
        if (!existingCurrency) {
            throw new Error("Валюта не найдена.");
        }
        return existingCurrency;
    }
}