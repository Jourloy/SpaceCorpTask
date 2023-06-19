import {Injectable, Logger} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Movie, MovieDocument} from "./schemas/movie.schema";
import {Model} from "mongoose";

@Injectable()
export class MoviesService {
	constructor(
		@InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>
	) {}

	private readonly logger = new Logger(MoviesService.name);

	/**
	 * Find all movies
	 * @param sort = sorting by rating
	 */
	async findAll(sort?: `asc` | `desc`): Promise<Movie[]> {
		return this.movieModel
			.find()
			.sort({rating: sort && sort === `asc` ? -1 : 1})
			.exec();
	}

	/**
	 * Find one movie by id
	 * @param id
	 */
	async findOne(id: string): Promise<Movie> {
		return this.movieModel.findById(id).exec();
	}

	/**
	 * Create movie
	 * @param movie
	 */
	async create(movie: Movie): Promise<Movie> {
		return this.movieModel.create(movie);
	}

	/**
	 * Update movie by id
	 * @param id
	 * @param movie
	 */
	async update(id: string, movie: Movie): Promise<Movie> {
		return this.movieModel.findByIdAndUpdate(id, movie, {new: true}).exec();
	}

	/**
	 * Remove movie by id
	 * @param id
	 */
	async remove(id: string): Promise<Movie> {
		return this.movieModel.findByIdAndRemove(id).exec();
	}
}
