import { Response } from "express"

export enum codeStatus {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    FORBIDDEN = 403,
    UNAUTHORIZED = 401,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500
}

export class ResponseCodeStatus {

    success(res:Response, data?: any ): Response {
        return res.status(codeStatus.OK).json({
            status: true,
            statusMsg: "SUCCESS", 
            data: data,
        })
    }

    conflict(res:Response, data?: any ): Response {
        return res.status(codeStatus.CONFLICT).json({
            status: false,
            statusMsg: "Conflict Duplicated", 
            data: data,
        })
    }

    notFound(res:Response, data?: any ): Response {
        return res.status(codeStatus.NOT_FOUND).json({
            status: false,
            statusMsg: "NOT FOUND", 
            error: data,
        })
    }

    unauthorized(res:Response, data?: any) : Response {
        return res.status(codeStatus.UNAUTHORIZED).json({
            status: false,
            statusMsg: "UNAUTHORIZED", 
            error: data,
        })
    }

    serverError(res:Response, data?: any) : Response {
        return res.status(codeStatus.INTERNAL_SERVER_ERROR).json({
            status: false,
            statusMsg: "INTERNAL SERVER ERROR", 
            error: data,
        })
    }

    forbidden(res:Response, data?: any) : Response {
        return res.status(codeStatus.FORBIDDEN).json({
            status: false,
            statusMsg: "FORBIDDEN", 
            error: data,
        })
    }

    badRequest(res:Response, data?: any) : Response {
        return res.status(codeStatus.BAD_REQUEST).json({
            status: false,
            statusMsg: "Bad Request", 
            error: data,
        })
    }
}