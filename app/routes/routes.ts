import { Router } from "express"

export class basicRouter<T> {
    public router: Router
    public controller: T 

    constructor(TController: {new (): T}) {
        this.router = Router()
        this.controller = new TController()
    }
}