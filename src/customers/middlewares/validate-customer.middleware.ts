import { NestMiddleware } from "@nestjs/common";

export class ValidateCustomerMiddleware implements NestMiddleware {

    use(req: any, res: any, next: (error?: any) => void) {
        console.log("Hello, world. I am inside ValidateCustomerMiddleware!")
        const { authorization } = req.headers;
        if (!authorization) {
            return res
            .status(403)
            .send({error: "You must be logged in to access this endpoint"});
        }

        if (authorization == "12345") {
            return next();
        } else {
            return res
            .status(403)
            .send({error: "Inlvalid Authentication Token Provided."});
        }
    }
}