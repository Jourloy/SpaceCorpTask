import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Types} from "mongoose";

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {
	_id?: Types.ObjectId;

	@Prop()
	username: string;

	@Prop()
	avatar: string;

	@Prop()
	password: string;

	@Prop()
	refreshTokens: string[];

	@Prop()
	role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
