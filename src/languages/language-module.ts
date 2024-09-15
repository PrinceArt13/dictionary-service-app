import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from '../entities/languages';
import { LanguageResolver } from './language-resolver';
import { LanguageService } from './language-service';

@Module({
    imports: [TypeOrmModule.forFeature([Language])],
    providers: [LanguageResolver, LanguageService],
})
export class languageModule { }