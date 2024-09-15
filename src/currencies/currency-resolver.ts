import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Currency } from '../entities/currencies';
import { CurrencyService } from './currency-service';

@Resolver(() => Currency)
export class CurrencyResolver {
    constructor(private readonly CurrencyService: CurrencyService) { }

    // Запрос на получение всех валют с фильтрацией и пагинацией
    @Query(() => [Currency], { name: 'Currencys' })
    async findAll(
        @Args('search', { type: () => String, nullable: true }) search: string,
        @Args('page', { type: () => Int }) page: number,
        @Args('limit', { type: () => Int }) limit: number,
    ) {
        return this.CurrencyService.findAll(search, page, limit);
    }

    // Запрос на получение одного валюты
    @Query(() => Currency, { name: 'Currency' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.CurrencyService.findOne(id);
    }

    // Мутация для создания валюты
    @Mutation(() => Currency)
    async createCurrency(
        @Args('name') name: string,
        @Args('code') code: string
    ): Promise<Currency> {
        return this.CurrencyService.create(code, name);
    }

    //Мутация для обновления валюты
    @Mutation(() => Currency)
    updateCurrency(
        @Args('id', { type: () => Int }) id: number,
        @Args('name') name: string,
        @Args('code') code: string
    ) {
        const updateData = { name, code };
        return this.CurrencyService.update(id, updateData);
    }

    // Мутация для soft-delete валюты
    @Mutation(() => Boolean)
    async removeCurrency(@Args('id', { type: () => Int }) id: number) {
        return this.CurrencyService.remove(id);
    }
}