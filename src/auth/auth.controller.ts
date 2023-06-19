import {Body, Controller, Get, Logger, Post, Res, Headers} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Request, Response} from "express";
import {IReturn} from "../../types";
import {Role} from "../enums/role.enum";
import {UserDto} from "./dto/user.dto";

@ApiTags(`Auth`)
@Controller(`auth`)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	private logger = new Logger(AuthController.name);

	private sendResponse(
		state: {access?: string; refresh?: string} & IReturn,
		response: Response
	) {
		const status = state.error ? 400 : 200;
		response.status(status).json(state);
	}

	@Post(`/register`)
	@ApiOperation({summary: `Create user`})
	@ApiResponse({
		status: 200,
		description: `User successfully created, access and refresh in body`,
	})
	@ApiResponse({status: 400, description: `Error, look code for get more info`})
	@ApiResponse({status: 500, description: `Error, look code for get more info`})
	async register(@Body() body: UserDto, @Res() response: Response) {
		const state = await this.authService.register(body, Role.USER);
		this.sendResponse(state, response);
	}

	@Post(`/login`)
	@ApiOperation({summary: `Login user`})
	@ApiResponse({
		status: 200,
		description: `User successfully login, access and refresh in body`,
	})
	@ApiResponse({status: 400, description: `Error, look code for get more info`})
	@ApiResponse({status: 500, description: `Error, look code for get more info`})
	async login(@Body() body: UserDto, @Res() response: Response) {
		const state = await this.authService.login(body);
		this.sendResponse(state, response);
	}

	@Get(`/tokens`)
	@ApiOperation({summary: `Update tokens`})
	@ApiResponse({
		status: 200,
		description: `Tokens successfully updates, access and refresh in body`,
	})
	@ApiResponse({status: 401, description: `Error, need to generate new tokens`})
	async updateTokens(@Headers() headers, @Res() response: Response) {
		const state = await this.authService.updateTokens(headers[`refresh`]);
		this.sendResponse(state, response);
	}
}
