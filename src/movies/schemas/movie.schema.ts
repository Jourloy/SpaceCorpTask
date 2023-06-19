import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Types} from "mongoose";

export type MovieDocument = Movie & Document;

@Schema({timestamps: true})
export class Movie {
	_id?: Types.ObjectId;

	@Prop()
	title: string;

	@Prop()
	description: string;

	@Prop()
	rating: string;

	@Prop()
	image: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
