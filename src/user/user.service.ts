import {Injectable, Logger} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {Model} from "mongoose";
import crypto from "crypto";
import {IReturn, IUser} from "../../types";

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
		this._checkAdmin().then(data => this.logger.debug(data));
	}

	private readonly logger = new Logger(UserService.name);

	/**
	 * Check admin on exist and create if it needs
	 * @private
	 */
	private async _checkAdmin() {
		const username = process.env.ADMIN_USERNAME;
		const password = process.env.ADMIN_PASSWORD;

		const user = await this.get({username: username.toLowerCase()});
		if (user) return `✅ Admin exist`;

		const state: string | null = await new this.userModel({
			username: username.toLowerCase(),
			password: crypto.createHash(`sha256`).update(password).digest(`hex`),
			avatar: `https://avatars.dicebear.com/api/identicon/${username}.svg`,
			emailVerified: true,
			role: `admin`,
		})
			.save()
			.catch(e => e)
			.then(() => null);

		if (state) return `❌ Admin error | ${state}`;
		return `✅ Admin created`;
	}

	/**
	 * Find and return user
	 * @param props
	 * @param isAdmin
	 */
	public async get(props: IGet, isAdmin?: boolean) {
		const user = await this.userModel.findOne({...props}).exec();
		if (!user) return null;
		if (!isAdmin) delete user.password;
		return user;
	}

	/**
	 * Create user if not exist
	 * @param props
	 * @param role
	 */
	public async create(props: IUser, role: `user` | `admin`): Promise<IReturn> {
		const user = await this.get({username: props.username}, true);
		if (user) return {error: true, code: `USER_EXIST`};

		const state = await new this.userModel({
			password: crypto.createHash(`sha256`).update(user.password).digest(`hex`),
			username: user.username.toLowerCase(),
			avatar: `https://avatars.dicebear.com/api/identicon/${user.username}.svg`,
			role: role,
		})
			.save()
			.catch(e => e)
			.then(() => null);

		if (state) return {error: true, code: `DB_ERROR`, description: state};
		return {error: false, code: `OK`};
	}

	/**
	 * Check user for login
	 * @param props
	 */
	public async login(props: IUser): Promise<IReturn> {
		const user = await this.get({username: props.username}, true);
		if (!user) return {error: true, code: `USER_NOT_FOUND`};

		const password = crypto.createHash(`sha256`).update(props.password).digest(`hex`);
		if (password !== user.password) return {error: true, code: `PASSWORD_INCORRECT`};
		return {error: false, code: `OK`};
	}

	/**
	 * Update user model
	 * @param _user
	 */
	public async updateUser(_user: IFullUser): Promise<IReturn> {
		const user = await this.get({username: _user.username}, true);
		if (!user) return {error: true, code: `USER_NOT_FOUND`};
		const state = await user
			.updateOne({..._user})
			.exec()
			.catch(e => e)
			.then(() => ``);

		if (state) return {error: true, code: `DB_ERROR`, description: state};
		return {error: false, code: `OK`};
	}

	/**
	 * Update refresh token for user
	 * @param oldRefresh
	 * @param refresh
	 * @param username
	 */
	public async updateRefresh(
		oldRefresh: string | null,
		refresh: string,
		username: string
	): Promise<IReturn> {
		const user = await this.get({username: username}, true);
		if (!user) return {error: true, code: `USER_NOT_FOUND`};

		if (!oldRefresh) {
			user.refreshTokens.push(refresh);
		} else {
			const newTokens: string[] = [];
			for (const token of user.refreshTokens) {
				if (token !== oldRefresh) newTokens.push(token);
				else newTokens.push(refresh);
			}
			user.refreshTokens = newTokens;
		}

		const state = await user
			.updateOne({$set: {...user}})
			.exec()
			.catch(e => e)
			.then(() => ``);

		if (state) return {error: true, code: `DB_ERROR`, description: state};
		return {error: false, code: `OK`};
	}
}

interface IGet {
	username?: string;
	role?: string;
	tracker?: string | null;
}

export interface IFullUser {
	username: string;
	avatar: string;
	password: string;
	refreshToken: string;
	role: string;
}
