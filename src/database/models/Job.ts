import {
    BaseEntity, BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Log} from "./Log";

export interface JobInterface {
    id?: number;
    name: string;
    logs?: Log[];
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

    @OneToMany(type => Log, log => log.job)
    logs: Promise<Log[]>;

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

    static jobsWithLastLog(query: { search?: string }): Promise<any> {
        let q = `
        select
            jobs.id as job_id,
            jobs.name as job_name,
            jobs.description as job_description,
            jobs.in_progress as job_in_progress,
            jobs.queued as job_queued,
            jobs.scheduled as job_scheduled,
            jobs.worker as job_worker,
            jobs.next_run as job_next_run,
            logs.status as log_status,
            logs.started_at as log_started_at,
            logs.finished_at as log_finished_at
        from jobs
        left join (
            SELECT *
            FROM logs
            WHERE id IN (SELECT MAX(id) FROM logs GROUP BY job_id)
        ) as logs on jobs.id = logs.job_id`;

        if (query.search) {
            q += ` WHERE jobs.name LIKE '%${query.search}%'`;
        }
        return this.query(q);
    }

    static countWhere(where?: string): Promise<any> {
        let q = `
        select COUNT(jobs.id) as count
        from jobs
                 left join (
            SELECT *
            FROM logs
            WHERE id IN (SELECT MAX(id) FROM logs GROUP BY job_id)
        ) as logs on jobs.id = logs.job_id
        `;
        if (where) {
            q += ` where logs.status = '${where}'`;
        }

        return this.query(q);
    }
}
