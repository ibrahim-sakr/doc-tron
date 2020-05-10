import { ComponentInterface, Settings } from 'he-loader';
import Scheduler from '../scheduler/scheduler';

export default class SchedulerComponent implements ComponentInterface {

    async load(settings: Settings) {
        const scheduler = new Scheduler;

        scheduler.run();
        return console.log('Scheduler running');
    }
}
