import {Module} from "@nestjs/common";
import {AppController} from "./app/app.controller";
import {AppService} from "./app/app.service";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";
import {ThrottlerModule} from "@nestjs/throttler";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MoviesModule} from "./movies/movies.module";

@Module({
	imports: [
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 10,
		}),
		MongooseModule.forRootAsync({
			useFactory: async () => ({
				uri: `mongodb://${process.env.MONGO_HOST}/SpaceCorp`,
			}),
		}),

		AuthModule,
		UserModule,
		MoviesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
