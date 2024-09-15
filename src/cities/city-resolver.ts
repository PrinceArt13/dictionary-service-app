import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { City } from '../entities/cities';
import { CityService } from './city-service';

@Resolver(() => City)
export class CityResolver {
    constructor(private readonly CityService: CityService) { }

    // Запрос на получение всех городов с фильтрацией и пагинацией
    @Query(() => [City], { name: 'cities' })
    async findAll(
        @Args('search', { type: () => String, nullable: true }) search: string,
        @Args('page', { type: () => Int }) page: number,
        @Args('limit', { type: () => Int }) limit: number,
    ) {
        return this.CityService.findAll(search, page, limit);
    }

    // Запрос на получение одного города
    @Query(() => City, { name: 'city' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.CityService.findOne(id);
    }

    // Мутация для создания города
    @Mutation(() => City)
    async createCity(
        @Args('name') name: string,
        @Args('regionId', { type: () => Int }) regionId: number,
    ): Promise<City> {
        return this.CityService.create(name, regionId);
    }

    //Мутация для обновления города
    @Mutation(() => City)
    updateCity(
        @Args('id', { type: () => Int }) id: number,
        @Args('name') name: string,
        @Args('regionId', { type: () => Int }) regionId: number,
    ) {
        const updateData = { name, regionId };
        return this.CityService.update(id, updateData);
    }

    // Мутация для soft-delete города
    @Mutation(() => Boolean)
    async removeCity(@Args('id', { type: () => Int }) id: number) {
        return this.CityService.remove(id);
    }
}