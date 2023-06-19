import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {ThrottlerGuard} from "@nestjs/throttler";
import {APP_GUARD} from "@nestjs/core";
import {UserModule} from "../user/user.module";

@Module({
	imports: [UserModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AuthModule {}
