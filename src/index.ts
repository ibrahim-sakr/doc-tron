require('./utils/env');
import {Loader, Settings} from 'he-loader';
import ApiComponent from './components/ApiComponent';
import SchedulerComponent from './components/SchedulerComponent';
import DBComponent from './components/DBComponent';

const loader = new Loader({});

const app = loader.load([
    new DBComponent,
    new ApiComponent,
    new SchedulerComponent
]);

app.then((settings: Settings) => console.log("Cron Jobs Service ready."));

app.catch(error => console.log(`Cron Jobs Service crashed: ${error}`));

