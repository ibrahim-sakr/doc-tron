import {Job} from "../database/models/Job";
import {ObjectLiteral} from "typeorm";

export default class DashboardService {
    async statistics(): Promise<ObjectLiteral> {
        const totals = await Promise.all([
            Job.countWhere(),
            Job.countWhere('success'),
            Job.countWhere('failed'),
            Job.countWhere('in_progress')
        ]);

        return {
            jobs: totals[0][0],
            success: totals[1][0],
            failed: totals[2][0],
            in_progress: totals[3][0]
        }
    }
}
