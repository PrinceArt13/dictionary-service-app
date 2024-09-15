import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from '../entities/cities';
import { CityResolver } from './city-resolver';
import { CityService } from './city-service';

@Module({
    imports: [TypeOrmModule.forFeature([City])],
    providers: [CityResolver, CityService],
})
export class CityModule { }