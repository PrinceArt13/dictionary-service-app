import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Region } from '../entities/regions';
import { RegionService } from './region-service';

@Resolver(() => Region)
export class RegionResolver {
    constructor(private readonly RegionService: RegionService) { }

    // Запрос на получение всех регионов с фильтрацией и пагинацией
    @Query(() => [Region], { name: 'regions' })
    async findAll(
        @Args('search', { type: () => String, nullable: true }) search: string,
        @Args('page', { type: () => Int }) page: number,
        @Args('limit', { type: () => Int }) limit: number,
    ) {
        return this.RegionService.findAll(search, page, limit);
    }

    // Запрос на получение одного региона
    @Query(() => Region, { name: 'region' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.RegionService.findOne(id);
    }

    // Мутация для создания региона
    @Mutation(() => Region)
    async createRegion(
        @Args('name') name: string,
        @Args('countryId', { type: () => Int }) countryId: number,
    ): Promise<Region> {
        return this.RegionService.create(name, countryId);
    }

    //Мутация для обновления региона
    @Mutation(() => Region)
    updateRegion(
        @Args('id', { type: () => Int }) id: number,
        @Args('name') name: string,
        @Args('countryId', { type: () => Int }) countryId: number,
    ) {
        const updateData = { name, countryId };
        return this.RegionService.update(id, updateData);
    }

    // Мутация для soft-delete региона
    @Mutation(() => Boolean)
    async removeRegion(@Args('id', { type: () => Int }) id: number) {
        return this.RegionService.remove(id);
    }
}