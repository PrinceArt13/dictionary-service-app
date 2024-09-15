import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable, DeleteDateColumn } from 'typeorm';
import { Currency } from './currencies';
import { City } from './cities';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Bank {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column("varchar", { length: 25 })
    @Field()
    name: string;

    @Column("int")
    @Field()
    treasury: number;

    @ManyToMany(() => Currency)
    @JoinTable()
    @Field(() => [Currency])
    currencies: Currency[];

    @ManyToOne(type => City)
    @Field()
    location: City;

    @Column({ nullable: true })
    @Field({ nullable: true })
    special?: string;

    @DeleteDateColumn()
    deletedAt?: Date;
}