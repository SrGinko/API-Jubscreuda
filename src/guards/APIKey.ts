import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Observable } from "rxjs"

@Injectable()
export class APIKey implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const apiKey = request.headers["apikey"]

		const VALID_API_KEY = process.env.VALID_API_KEY

		if (!apiKey || apiKey !== VALID_API_KEY) {
			throw new UnauthorizedException("Chave API inválida")
		}

		return true
	}
}
