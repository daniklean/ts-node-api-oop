import { Response } from "express"

export enum codeStatus {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    FORBIDDEN = 403,
    UNAUTHORIZED = 401,
    INTERNAL_SERVER_ERROR = 500

}

export class ResponseCodeStatus {

    Success(res:Response, data?: any ): Response {
        return res.status(codeStatus.OK).json({
            status: codeStatus.OK,
            statusMsg: "SUCCESS", 
            data: data,
        })
    }

    NotFound(res:Response, data?: any ): Response {
        return res.status(codeStatus.NOT_FOUND).json({
            status: codeStatus.NOT_FOUND,
            statusMsg: "NOT FOUND", 
            error: data,
        })
    }

    Unauthorized(res:Response, data?: any) : Response {
        return res.status(codeStatus.UNAUTHORIZED).json({
            status: codeStatus.UNAUTHORIZED,
            statusMsg: "UNAUTHORIZED", 
            error: data,
        })
    }

    ServerError(res:Response, data?: any) : Response {
        return res.status(codeStatus.INTERNAL_SERVER_ERROR).json({
            status: codeStatus.INTERNAL_SERVER_ERROR,
            statusMsg: "INTERNAL SERVER ERROR", 
            error: data,
        })
    }

    Forbiddenr(res:Response, data?: any) : Response {
        return res.status(codeStatus.FORBIDDEN).json({
            status: codeStatus.FORBIDDEN,
            statusMsg: "FORBIDDEN", 
            error: data,
        })
    }

    BadRequest(res:Response, data?: any) : Response {
        return res.status(codeStatus.BAD_REQUEST).json({
            status: codeStatus.BAD_REQUEST,
            statusMsg: "Bad Request", 
            error: data,
        })
    }
}