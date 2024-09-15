import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Language } from '../entities/languages';
import { LanguageService } from './language-service';

@Resolver(() => Language)
export class LanguageResolver {
    constructor(private readonly languageService: LanguageService) { }

    // Запрос на получение всех языков с фильтрацией и пагинацией
    @Query(() => [Language], { name: 'languages' })
    async findAll(
        @Args('search', { type: () => String, nullable: true }) search: string,
        @Args('page', { type: () => Int }) page: number,
        @Args('limit', { type: () => Int }) limit: number,
    ) {
        return this.languageService.findAll(search, page, limit);
    }

    // Запрос на получение одного языка
    @Query(() => Language, { name: 'language' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.languageService.findOne(id);
    }

    // Мутация для создания языка
    @Mutation(() => Language)
    async createlanguage(
        @Args('name') name: string
    ): Promise<Language> {
        return this.languageService.create(name);
    }

    //Мутация для обновления языка
    @Mutation(() => Language)
    updatelanguage(
        @Args('id', { type: () => Int }) id: number,
        @Args('name') name: string
    ) {
        const updateData = { name };
        return this.languageService.update(id, updateData);
    }

    // Мутация для soft-delete языка
    @Mutation(() => Boolean)
    async removelanguage(@Args('id', { type: () => Int }) id: number) {
        return this.languageService.remove(id);
    }
}