import {EventEmitter} from "events";
import WorkerInterface from "../interfaces/WorkerInterface";
import {Client} from 'ssh2';
import {readFileSync} from 'fs';

export default class SSHWorker extends EventEmitter implements WorkerInterface {
    send(worker: any): void {
        const conn = new Client();
        conn.on('ready', () => {
            conn.exec(worker.command, (error, stream) => {
                if (error) this.emit('error', error.message);

                stream.on('close', (code, signal) => {
                    conn.end();
                    this.emit('end');
                });
                stream.on('data', (data) => this.emit('data', data));
                stream.stderr.on('data', (data) => this.emit('error', data));
            });
        });

        conn.on('error', (error) => this.emit('error', error.message));

        conn.connect({
            host: worker.host,
            port: worker.port,
            username: worker.username,
            privateKey: readFileSync('/Users/hema/.ssh/id_rsa'),
            passphrase: worker.passphrase
        });

    }
}
