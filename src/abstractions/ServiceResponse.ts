interface IServiceResponse {
    data: any;
    success: boolean;
    message: string;
    error: string | null;
}

export class ServiceResponse implements IServiceResponse {
    public data: any;
    public success: boolean;
    public message: string;
    public error: string | null;

    constructor(data: any, success: boolean, message: string, error: string | null) {
        this.data = data;
        this.success = success;
        this.message = message;
        this.error = error;
    }

    public JSON() {
        return JSON.parse(JSON.stringify(this));
    }
}
