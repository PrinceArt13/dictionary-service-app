import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Language } from './languages';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Country {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column("varchar", { length: 25, unique: true })
    @Field()
    name: string;

    @Column("varchar", { length: 2, unique: true })
    @Field()
    alpha2: string;

    @Column("varchar", { length: 3, unique: true })
    @Field()
    alpha3: string;

    @ManyToOne(type => Language)
    @Field()
    language: Language;

    @DeleteDateColumn()
    deletedAt?: Date;
}