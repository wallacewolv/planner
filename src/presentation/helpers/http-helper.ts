import { HttpResponse } from "../contracts/http";

export const badRequest = (error: any): HttpResponse => ({
    statusCode: 400,
    body: error
})

export const notFound = (error: any): HttpResponse => ({
    statusCode: 404,
    body: error
})

export const forbidden = (error: any): HttpResponse => ({
    statusCode: 403,
    body: error
})

export const conflict = (error: any): HttpResponse => ({
    statusCode: 409,
    body: error
})

export const serverError = (error: any): HttpResponse => ({
    statusCode: 500,
    body: error
})

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
})

export const created = (data: any): HttpResponse => ({
    statusCode: 201,
    body: data
})

export const noContent = (data: any): HttpResponse => ({
    statusCode: 204,
    body: data
})
