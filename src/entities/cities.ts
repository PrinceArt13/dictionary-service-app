import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, DeleteDateColumn } from 'typeorm';
import { Region } from './regions';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class City {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column("varchar", { length: 25, unique: true })
    @Field()
    name: string;

    @ManyToOne(type => Region)
    @Field()
    region: Region;

    @DeleteDateColumn()
    deletedAt?: Date;
}