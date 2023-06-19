import {Controller, Get, Res} from "@nestjs/common";
import {Response} from "express";
import {AppService} from "./app.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller(`/`)
@ApiTags(`App`)
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get(`/`)
	@ApiOperation({summary: `Live check`})
	@ApiResponse({status: 200, description: `Will return true in body`})
	live(@Res() r: Response) {
		r.status(200).json({status: true});
	}
}
