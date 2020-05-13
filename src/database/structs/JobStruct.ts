import {Request} from "express";
import StructInterface from "../interfaces/StructInterface";
import WorkerInterface from "../interfaces/WorkerInterface";
import {parseExpression} from 'cron-parser';

export default class JobStruct implements StructInterface {
    name: string;
    description: string | null;
    scheduled: string;
    worker: WorkerInterface;
    nextRun: Date;
    args: Object | null;
    inProgress: boolean;
    queued: boolean;

    constructor(req: Request) {
        this.name = req.body.name;
        this.description = req.body.description;
        this.scheduled = req.body.scheduled;
        this.worker = req.body.worker;
        this.nextRun = parseExpression(req.body.scheduled).next().toDate();
        this.args = req.body.args;
        this.inProgress = req.body.inProgress;
        this.queued = req.body.queued;
    }

    toObject(): Object {
        return {
            name: this.name,
            description: this.description,
            scheduled: this.scheduled,
            worker: this.worker,
            next_run: this.nextRun,
            args: this.args,
            in_progress: this.inProgress,
            queued: this.queued
        }
    }
}
