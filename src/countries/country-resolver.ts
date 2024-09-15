import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Country } from '../entities/countries';
import { CountryService } from './country-service';

@Resolver(() => Country)
export class CountryResolver {
    constructor(private readonly countryService: CountryService) { }

    // Запрос на получение всех стран с фильтрацией и пагинацией
    @Query(() => [Country], { name: 'countries' })
    async findAll(
        @Args('search', { type: () => String, nullable: true }) search: string,
        @Args('page', { type: () => Int }) page: number,
        @Args('limit', { type: () => Int }) limit: number,
    ) {
        return this.countryService.findAll(search, page, limit);
    }

    // Запрос на получение одной страны
    @Query(() => Country, { name: 'country' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.countryService.findOne(id);
    }

    // Мутация для создания страны
    @Mutation(() => Country)
    async createCountry(
        @Args('name') name: string,
        @Args('alpha2') alpha2: string,
        @Args('alpha3') alpha3: string,
        @Args('languageId', { type: () => Int }) languageId: number,
    ): Promise<Country> {
        return this.countryService.create(name, alpha2, alpha3, languageId);
    }

    //Мутация для обновления страны
    @Mutation(() => Country)
    updateCountry(
        @Args('id', { type: () => Int }) id: number,
        @Args('name', { nullable: true }) name: string,
        @Args('alpha2', { nullable: true }) alpha2: string,
        @Args('alpha3', { nullable: true }) alpha3: string,
        @Args('languageId', { type: () => Int, nullable: true }) languageId: number,
    ) {
        const updateData = { name, alpha2, alpha3, languageId };
        return this.countryService.update(id, updateData);
    }

    // Мутация для soft-delete страны
    @Mutation(() => Boolean)
    async removeCountry(@Args('id', { type: () => Int }) id: number) {
        return this.countryService.remove(id);
    }
}