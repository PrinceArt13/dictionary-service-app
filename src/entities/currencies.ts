import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Currency {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column("varchar", { length: 3, unique: true })
    @Field()
    code: string;

    @Column("varchar", { length: 25, unique: true })
    @Field()
    name: string;

    @DeleteDateColumn()
    deletedAt?: Date;
}