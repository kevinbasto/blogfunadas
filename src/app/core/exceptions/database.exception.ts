import { Exception } from "../ports/exception.port";

export class DatabaseException extends Error implements Exception{
    private exception : any;
    
    constructor(exception : any){
        super()
        this.exception = exception
    }

    getException(){
        return this.exception;
    }
}