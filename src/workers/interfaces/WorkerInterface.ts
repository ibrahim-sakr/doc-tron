export default interface WorkerInterface {
    on(event: "data", listener: (chunk: any) => void): this;

    on(event: "end", listener: () => void): this;

    on(event: "error", listener: (err: Error) => void): this;

    on(event: "close", listener: () => void): this;

    on(event: "pause", listener: () => void): this;

    on(event: "readable", listener: () => void): this;

    on(event: "resume", listener: () => void): this;

    on(event: string | symbol, listener: (...args: any[]) => void): this;

    send(job: any): void;
}