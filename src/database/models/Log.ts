import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    BaseEntity
} from 'typeorm';

export interface LogInterface {
    id?: number;
    job_id: number;
    status: string;
    output: string;
    error: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}

@Entity('logs')
export class Log extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int'
    })
    job_id: number;

    @Column({
        type: 'varchar',
        length: '30'
    })
    status: string;

    @Column({
        type: 'mediumtext',
        nullable: true
    })
    output: string;

    @Column({
        type: 'text',
        nullable: true
    })
    error: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
