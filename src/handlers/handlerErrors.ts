import { Request, Response } from 'express';
import { HttpStatusCode as Http } from '../abstractions/HttpStatusCode';
import { ServiceResponse } from '../abstractions/ServiceResponse'

export const handlerErrors = (error: any, _request: Request, response: Response, message: string): Promise<Response> => {
    console.error(error);
    console.log(error.name);

    const errMsg = error instanceof Error ? error.message : "Internal server error";

    if (error instanceof Error && error.name === "CastError") {
        const errorServiceResponse = new ServiceResponse(null, false, message, errMsg);
        return new Promise((resolve, rejects) => {
            return resolve(response.status(Http.INTERNAL_SERVER_ERROR).json(errorServiceResponse.JSON()));
        });
    }

    const errorServiceResponse = new ServiceResponse(null, false, message, errMsg);
    return new Promise((resolve, rejects) => {
        return resolve(response.status(Http.INTERNAL_SERVER_ERROR).json(errorServiceResponse.JSON()));
    });
}
