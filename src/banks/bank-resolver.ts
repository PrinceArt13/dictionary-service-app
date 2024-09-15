import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Bank } from '../entities/Banks';
import { BankService } from './bank-service';

@Resolver(() => Bank)
export class BankResolver {
    constructor(private readonly BankService: BankService) { }

    // Запрос на получение всех городов с фильтрацией и пагинацией
    @Query(() => [Bank], { name: 'banks' })
    async findAll(
        @Args('search', { type: () => String, nullable: true }) search: string,
        @Args('page', { type: () => Int }) page: number,
        @Args('limit', { type: () => Int }) limit: number,
    ) {
        return this.BankService.findAll(search, page, limit);
    }

    // Запрос на получение одного города
    @Query(() => Bank, { name: 'bank' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.BankService.findOne(id);
    }

    // Мутация для создания города
    @Mutation(() => Bank)
    async createBank(
        @Args('name') name: string,
        @Args('locationId', { type: () => Int }) locationId: number,
        @Args('treasury') treasury: number,
        @Args('special', { nullable: true }) special: string,
        @Args('currenciesId', { type: () => [Int] }) currenciesId: number[]
    ): Promise<Bank> {
        return this.BankService.create(name, locationId, treasury, special, currenciesId);
    }

    //Мутация для обновления города
    @Mutation(() => Bank)
    updateBank(
        @Args('id', { type: () => Int }) id: number,
        @Args('name') name: string,
        @Args('locationId', { type: () => Int }) locationId: number,
        @Args('treasury') treasury: number,
        @Args('special', { nullable: true }) special: string,
        @Args('currenciesId', { type: () => [Int], nullable: true }) currenciesId: number[]
    ) {
        const updateData = { name, locationId, treasury, special, currenciesId };
        return this.BankService.update(id, updateData);
    }

    // Мутация для soft-delete города
    @Mutation(() => Boolean)
    async removeBank(@Args('id', { type: () => Int }) id: number) {
        return this.BankService.remove(id);
    }
}