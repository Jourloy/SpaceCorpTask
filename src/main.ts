import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import helmet from "helmet";
import pkg from "../package.json";
import {ValidationPipe} from "@nestjs/common";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require(`dotenv`).config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({origin: `*`});

	const config = new DocumentBuilder()
		.setTitle(`SpaceCorp`)
		.setDescription(`Junior FullStack test task`)
		.setExternalDoc(`Github`, `https://github.com/Jourloy/SpaceCorpTask`)
		.setVersion(pkg.version)
		.build();
	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup(`api`, app, document);

	app.use(helmet());
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(7372, `0.0.0.0`);
}

bootstrap().then();
