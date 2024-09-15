import { Injectable } from '@nestjs/common';
import { Language } from '../entities/languages';
import { Like, Not } from 'typeorm';
import DataSource from '../../ormconfig';

@Injectable()
export class LanguageService {
    // Создание языка
    async create(name: string): Promise<Language> {
        if (name.length > 25) {
            throw new Error("Длина названия не может быть больше 25");
        }
        const existingLanguage = await DataSource.getRepository(Language).findOne({
            where: { name: name }
        });
        if (existingLanguage) {
            throw new Error("Такой язык уже существует.");
        }

        const newLanguage = DataSource.getRepository(Language).create({ name });
        return await DataSource.getRepository(Language).save(newLanguage);
    }

    // Обновление языка
    async update(id: number, updateData: { name }): Promise<Language> {
        if (updateData.name.length > 25) {
            throw new Error("Длина названия не может быть больше 25");
        }

        const existingLanguage = await DataSource.getRepository(Language).findOne({
            where: { id: id }
        });
        if (!existingLanguage) {
            throw new Error("Язык для обновления не существует.");
        }

        const allLanguages = await DataSource.getRepository(Language).find({
            where: { id: Not(id) }
        });

        if (allLanguages.some(x => x.name == updateData.name)) {
            throw new Error("Такой язык уже существует.");
        }

        const updatedLanguage = { name: updateData.name };
        await DataSource.getRepository(Language).update(id, updatedLanguage);
        return DataSource.getRepository(Language).findOne({ where: { id } });
    }

    // Soft-delete языка
    async remove(id: number): Promise<boolean> {
        const existingLanguage = await DataSource.getRepository(Language).findOne({
            where: { id: id }
        });
        if (!existingLanguage) {
            throw new Error("Языка для удаления не существует.");
        }

        await DataSource.getRepository(Language).softDelete(id);
        return true;
    }

    // Поиск с фильтрацией и пагинацией
    async findAll(search: string, page: number, limit: number): Promise<Language[]> {
        const skip = (page - 1) * limit;
        const languages = await DataSource.getRepository(Language).find({
            where: search ? { name: Like(`%${search}%`) } : {},
            skip,
            take: limit
        });
        return languages;
    }

    // Найти по ID
    async findOne(id: number): Promise<Language> {
        const existingLanguage = await DataSource.getRepository(Language).findOne({ where: { id } });
        if (!existingLanguage) {
            throw new Error("Язык не найден.");
        }
        return existingLanguage;
    }
}