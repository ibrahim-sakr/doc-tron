export default interface WorkerInterface {
    type: string;
    url?: string;
    host?: string;
    port?: string;
    username?: string;
    password?: string;
    privateKey?: string;
    command?: string;
    passphrase?: string;
}
