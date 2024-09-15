import { Injectable } from '@nestjs/common';
import { City } from '../entities/cities';
import { Like, Not } from 'typeorm';
import DataSource from '../../ormconfig';
import { Region } from '../entities/regions';

@Injectable()
export class CityService {
    // Создание города
    async create(name: string, regionId: number): Promise<City> {
        if (!name || !regionId) {
            throw new Error("Не все значения заполнены.");
        }
        if (name.length > 25) {
            throw new Error("Название города не может быть больше 25 символов.");
        }

        const existingRegion = await DataSource.getRepository(Region).findOne({
            where: { id: regionId }
        });
        if (!existingRegion) {
            throw new Error("Такого региона не существует.");
        }
        const allCities = await DataSource.getRepository(City).find();
        if (allCities.some(x => x.name == name)) {
            throw new Error("Такой город уже существует.");
        }

        const newCity = DataSource.getRepository(City).create({ name, region: { id: regionId } });
        return await DataSource.getRepository(City).save(newCity);
    }

    // Обновление города
    async update(id: number, updateData: { name, regionId }): Promise<City> {
        if (updateData.name.length > 25) {
            throw new Error("Название города не может быть больше 25 символов.");
        }

        const existingRegion = await DataSource.getRepository(Region).findOne({
            where: { id: updateData.regionId }
        });
        if (!existingRegion) {
            throw new Error("Такого региона не существует.");
        }

        const exisitngCity = await DataSource.getRepository(City).findOne({
            where: { id: id }
        });
        if (!exisitngCity) {
            throw new Error("Город для обновления не существует.");
        }

        const allCitys = await DataSource.getRepository(City).find({
            where: { id: Not(id) }
        });
        if (allCitys.some(x => x.name == updateData.name)) {
            throw new Error("Такой город уже существует.");
        }

        const updatedCity = {
            name: updateData.name,
            region: { id: updateData.regionId }
        };

        await DataSource.getRepository(City).update(id, updatedCity);
        return DataSource.getRepository(City).findOne({ where: { id }, relations: ['region'] });
    }

    // Soft-delete города
    async remove(id: number): Promise<boolean> {
        const exisitngCity = await DataSource.getRepository(City).findOne({
            where: { id: id }
        });
        if (!exisitngCity) {
            throw new Error("Такого города не существует.");
        }

        await DataSource.getRepository(City).softDelete(id);
        return true;
    }

    // Поиск с фильтрацией и пагинацией
    async findAll(search: string, page: number, limit: number): Promise<City[]> {
        const skip = (page - 1) * limit;
        const Cities = await DataSource.getRepository(City).find({
            where: search ? { name: Like(`%${search}%`) } : {},
            skip,
            take: limit,
            relations: ['region']
        });
        return Cities;
    }

    // Найти по ID
    async findOne(id: number): Promise<City> {
        const exisitngCity = await DataSource.getRepository(City).findOne({
            where: { id: id },
            relations: ['region']
        });
        if (!exisitngCity) {
            throw new Error("Такого города не существует.");
        }
        return exisitngCity;
    }
}