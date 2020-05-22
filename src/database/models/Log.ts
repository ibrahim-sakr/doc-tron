import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    BaseEntity, ManyToOne, JoinColumn
} from 'typeorm';
import {Job} from "./Job";

export interface LogInterface {
    id?: number;
    job_id: number;
    job?: Job;
    status: string;
    output: string;
    error: string;
    started_at: Date;
    finished_at: Date;
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

    @ManyToOne(type => Job, job => job.logs)
    @JoinColumn({ name: 'job_id' })
    job: Job;

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

    @Column({
        type: 'timestamp',
        nullable: false,
    })
    started_at: Date;

    @Column({
        type: 'timestamp',
        nullable: false,
    })
    finished_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
