import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Language {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column("varchar", { unique: true })
    @Field()
    name: string;

    @DeleteDateColumn()
    deletedAt?: Date;
}