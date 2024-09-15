import { Injectable } from '@nestjs/common';
import { Region } from '../entities/regions';
import { Like, Not } from 'typeorm';
import DataSource from '../../ormconfig';
import { Country } from '../entities/countries';

@Injectable()
export class RegionService {
    // Создание региона
    async create(name: string, countryId: number): Promise<Region> {
        if (!name || !countryId) {
            throw new Error("Не все значения заполнены.");
        }
        if (name.length > 25) {
            throw new Error("Название региона не может быть больше 25 символов.");
        }

        const existingCountry = await DataSource.getRepository(Country).findOne({
            where: { id: countryId }
        });
        if (!existingCountry) {
            throw new Error("Такой страны не существует.");
        }
        const allRegions = await DataSource.getRepository(Region).find();
        if (allRegions.some(x => x.name == name)) {
            throw new Error("Такой регион уже существует.");
        }

        const newRegion = DataSource.getRepository(Region).create({ name, country: { id: countryId } });
        return await DataSource.getRepository(Region).save(newRegion);
    }

    // Обновление региона
    async update(id: number, updateData: { name, countryId }): Promise<Region> {
        if (updateData.name.length > 25) {
            throw new Error("Название региона не может быть больше 25 символов.");
        }

        const existingCountry = await DataSource.getRepository(Country).findOne({
            where: { id: updateData.countryId }
        });
        if (!existingCountry) {
            throw new Error("Такой страны не существует.");
        }

        const exisitngRegion = await DataSource.getRepository(Region).findOne({
            where: { id: id }
        });
        if (!exisitngRegion) {
            throw new Error("Регион для обновления не существует.");
        }

        const allRegions = await DataSource.getRepository(Region).find({
            where: { id: Not(id) }
        });
        if (allRegions.some(x => x.name == updateData.name)) {
            throw new Error("Такой регион уже существует.");
        }

        const updatedRegion = {
            name: updateData.name,
            country: { id: updateData.countryId }
        };

        await DataSource.getRepository(Region).update(id, updatedRegion);
        return DataSource.getRepository(Region).findOne({ where: { id }, relations: ['country'] });
    }

    // Soft-delete региона
    async remove(id: number): Promise<boolean> {
        const exisitngRegion = await DataSource.getRepository(Region).findOne({
            where: { id: id }
        });
        if (!exisitngRegion) {
            throw new Error("Такого региона не существует.");
        }

        await DataSource.getRepository(Region).softDelete(id);
        return true;
    }

    // Поиск с фильтрацией и пагинацией
    async findAll(search: string, page: number, limit: number): Promise<Region[]> {
        const skip = (page - 1) * limit;
        const regions = await DataSource.getRepository(Region).find({
            where: search ? { name: Like(`%${search}%`) } : {},
            skip,
            take: limit,
            relations: ['country']
        });
        return regions;
    }

    // Найти по ID
    async findOne(id: number): Promise<Region> {
        const exisitngRegion = await DataSource.getRepository(Region).findOne({
            where: { id: id },
            relations: ['country']
        });
        if (!exisitngRegion) {
            throw new Error("Такого региона не существует.");
        }
        return exisitngRegion;
    }
}