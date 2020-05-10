import {EventEmitter} from "events";
import WorkerInterface from "../interfaces/WorkerInterface";
import {request} from 'http';
import {URL} from 'url';

export default class HttpWorker extends EventEmitter implements WorkerInterface {

    send(job: any): void {
        const {hostname, port, pathname} = new URL(job.worker.id);
        this.request({
            hostname,
            port,
            path: pathname,
            body: JSON.stringify(job.args)
        });
    }

    request({ hostname, port, path, body }) {
        const req = request({
            hostname,
            port,
            path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': body.length
            }
        }, (res) => {
            res.on('data', data => this.emit('data', data));
            res.on('error', (err) => this.emit('error', err));
            res.on('end', () => this.emit('end'));
        })

        req.write(body);
        req.end();
    }
}