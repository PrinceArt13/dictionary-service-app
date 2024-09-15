import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn } from 'typeorm';
import { Country } from './countries';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Region {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column("varchar", { length: 25, unique: true })
    @Field()
    name: string;

    @ManyToOne(type => Country)
    @Field()
    country: Country;

    @DeleteDateColumn()
    deletedAt?: Date;
}