import {Module} from "@nestjs/common";
import {MoviesService} from "./movies.service";
import {MoviesController} from "./movies.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Movie, MovieSchema} from "./schemas/movie.schema";
import {APP_GUARD} from "@nestjs/core";
import {ThrottlerGuard} from "@nestjs/throttler";

@Module({
	imports: [MongooseModule.forFeature([{name: Movie.name, schema: MovieSchema}])],
	controllers: [MoviesController],
	providers: [
		MoviesService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class MoviesModule {}
