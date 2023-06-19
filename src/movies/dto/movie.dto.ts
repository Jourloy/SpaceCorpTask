import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class MovieDto {
	@ApiProperty({example: `DUNE`})
	@IsNotEmpty()
	@IsString()
	title: string;

	@ApiProperty({example: `I like it`})
	@IsNotEmpty()
	@IsString()
	description: string;

	@ApiProperty({example: `10`})
	@IsNotEmpty()
	@IsString()
	rating: string;

	@ApiProperty({
		example: `https://avatars.mds.yandex.net/get-kinopoisk-image/1898899/80e5fb45-f00d-47aa-bb2f-0cdb3a363f4e/3840x`,
	})
	@IsNotEmpty()
	@IsString()
	image: string;
}
