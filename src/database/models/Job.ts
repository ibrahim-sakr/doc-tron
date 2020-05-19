import {
    BaseEntity, BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

export interface JobInterface {
    id?: number;
    name: string;
    description?: string;
    in_progress?: boolean;
    queued: boolean;
    scheduled: string;
    next_run?: Date;
    worker: object;
    created_at?: Date;
    updated_at?: Date;
    deleted_at: Date | null;
}

@Entity('jobs')
export class Job extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: '255',
        unique: true
    })
    name: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column({
        type: 'tinyint',
        default: false
    })
    in_progress: boolean;

    @Column({
        type: 'tinyint',
    })
    queued: boolean;

    @Column({
        type: 'varchar',
        length: '50',
    })
    scheduled: string;

    @Column({
        type: 'timestamp',
    })
    next_run: Date;

    @Column({
        type: 'json',
    })
    worker: object;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @BeforeInsert()
    setNextRun() {
        this.next_run = new Date();
    }
}
