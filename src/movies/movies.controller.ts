import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Res,
	Query,
	Param,
	HttpException,
	Body,
	UseGuards,
} from "@nestjs/common";
import {MoviesService} from "./movies.service";
import {ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Response} from "express";
import {MovieDto} from "./dto/movie.dto";
import {JwtGuard} from "../guards/jwt.guard";

@Controller(`movies`)
@ApiTags(`Movies`)
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@Get(`/`)
	@ApiOperation({summary: `Get all movies`})
	@ApiParam({name: `sort`, enum: [`asc`, `desc`], description: `Sort by asc or desc`})
	@ApiResponse({
		status: 200,
		description: `Always 200, return array with movies`,
	})
	async findAll(@Query() query: {sort?: `asc` | `desc`}, @Res() response: Response) {
		const movies = await this.moviesService.findAll(query.sort);
		response.status(200).json({movies: movies});
	}

	@Get(`/:id`)
	@ApiOperation({summary: `Get one movie by id`})
	@ApiResponse({
		status: 200,
		description: `Movie object`,
	})
	@ApiResponse({
		status: 404,
		description: `Movie not found`,
	})
	async findOne(@Param(`id`) id: string, @Res() response: Response) {
		const movie = await this.moviesService.findOne(id);
		if (!movie) throw new HttpException(`Movie not found`, 404);
		response.status(200).json({movie: movie});
	}

	@Post(`/`)
	@UseGuards(JwtGuard)
	@ApiOperation({summary: `Create movie`})
	@ApiResponse({
		status: 201,
		description: `Movie created`,
	})
	async create(@Body() movie: MovieDto, @Res() response: Response) {
		const movieCreated = await this.moviesService.create(movie);
		response.status(201).json({movie: movieCreated});
	}

	@Put(`/:id`)
	@UseGuards(JwtGuard)
	@ApiOperation({summary: `Edit movie by id`})
	@ApiResponse({
		status: 200,
		description: `Movie edited`,
	})
	@ApiResponse({
		status: 404,
		description: `Movie not found`,
	})
	async update(
		@Param(`id`) id: string,
		@Body() movie: MovieDto,
		@Res() response: Response
	) {
		const movieUpdated = await this.moviesService.update(id, movie);
		if (!movieUpdated) throw new HttpException(`Movie not found`, 404);
		response.status(200).json({movie: movieUpdated});
	}

	@Delete(`/:id`)
	@UseGuards(JwtGuard)
	@ApiOperation({summary: `Remove movie by id`})
	@ApiResponse({
		status: 200,
		description: `Movie removed`,
	})
	@ApiResponse({
		status: 404,
		description: `Movie not found`,
	})
	async remove(@Param(`id`) id: string, @Res() response: Response) {
		const movieDeleted = await this.moviesService.remove(id);
		if (!movieDeleted) throw new HttpException(`Movie not found`, 404);
		response.status(200).json({movie: movieDeleted});
	}
}
