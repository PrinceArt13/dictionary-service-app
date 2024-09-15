import { Injectable } from '@nestjs/common';
import { Country } from '../entities/countries';
import { Like, Not } from 'typeorm';
import DataSource from '../../ormconfig';
import { Language } from '../entities/languages';


@Injectable()
export class CountryService {
    //Создание страны
    async create(name: string, alpha2: string, alpha3: string, languageId: number): Promise<Country> {
        const allCountries = await DataSource.getRepository(Country).find();

        if (!name || !alpha2 || !alpha3 || !languageId) {
            throw new Error('Не все значения заполнены.');
        }

        if (allCountries.map(x => x.name).includes(name)) {
            throw new Error('Такая страна уже существует.');
        }

        if (name.length > 25) {
            throw new Error('Название страны не может превышать 25 символов.');
        }

        if (
            allCountries.map(x => x.alpha2).includes(alpha2) ||
            allCountries.map(x => x.alpha3).includes(alpha3)
        ) {
            throw new Error('alpha2 и alpha3 коды должны быть уникальными.');
        }

        const newCountry = DataSource.getRepository(Country).create({
            name,
            alpha2,
            alpha3,
            language: { id: languageId },
        });

        return await DataSource.getRepository(Country).save(newCountry);
    }

    // Обновление страны
    async update(id: number, updateData: { name, alpha2, alpha3, languageId }): Promise<Country> {
        const existingCountry = await DataSource.getRepository(Country).findOneBy({
            id: id
        });
        if (!existingCountry) {
            throw new Error("Страны для обновления не существует.");
        }

        const allCountries = await DataSource.getRepository(Country).find({
            where: { name: Not(updateData.name) }
        });

        if (allCountries.map(x => x.name).includes(updateData.name)) {
            throw new Error("Такая страна уже существует.");
        }
        if (updateData.name.length > 25) {
            throw new Error("Название страны не может превышать 25 символов.");
        }
        //if (updateData.alpha2 || updateData.alpha3) {
        if (allCountries.map(x => x.alpha2).includes(updateData.alpha2) || allCountries.map(x => x.alpha3).includes(updateData.alpha3)) {
            throw new Error("alpha2 и alpha3 коды должны быть уникальными.")
        }
        //}
        const allLanguages = await DataSource.getRepository(Language).find();
        if (!(allLanguages.map(x => x.id).includes(updateData.languageId))) {
            throw new Error("Такого языка не существует.");
        }

        const countryLang = await DataSource.getRepository(Language).findOneBy({
            id: updateData.languageId
        });

        const updatedCountry = {
            name: updateData.name,
            alpha2: updateData.alpha2,
            alpha3: updateData.alpha3,
            language: countryLang
        }

        await DataSource.getRepository(Country).update(id, updatedCountry);
        return DataSource.getRepository(Country).findOneBy({ id });
    }

    // Soft-delete страны
    async remove(id: number): Promise<boolean> {
        const allCountries = await DataSource.getRepository(Country).find();
        if (!(allCountries.map(x => x.id).includes(id))) {
            throw new Error("Такой страны не существует.");
        }
        DataSource.getRepository(Country).softDelete(id);
        return true;
    }

    // Поиск с фильтрацией и пагинацией
    async findAll(search: string, page: number, limit: number): Promise<object> {
        const skip = (page - 1) * limit;

        const countries = await DataSource.getRepository(Country).find({
            where: search ? { name: Like(`%${search.toLowerCase()}%`) || Like(`%${search.toUpperCase()}%`) } : {},
            skip,
            take: limit,
            relations: ['language']
        });

        return countries;
    }

    // Найти по ID
    async findOne(id: number): Promise<Country> {
        const existingCountry = DataSource.getRepository(Country).findOne({
            where: { id: id },
            relations: ['language']
        });
        if (!existingCountry) {
            throw new Error("Такой страны не существует.");
        }

        return existingCountry;
    }
}