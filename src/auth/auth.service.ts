import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {sign, verify} from "jsonwebtoken";
import {IReturn, IUser} from "../../types";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	/**
	 * Generate access and refresh JWT tokens
	 * @param username
	 * @private
	 */
	private generateTokens(username: string): {access: string; refresh: string} {
		const refresh = sign({username}, process.env.SECRET, {expiresIn: `1w`});
		const access = sign({username}, process.env.SECRET, {expiresIn: `3d`});
		return {refresh, access};
	}

	/**
	 * Update JWT tokens
	 * @param refresh
	 */
	public async updateTokens(
		refresh: string
	): Promise<{access?: string; refresh?: string} & IReturn> {
		try {
			// Try to decode token
			const decoded = verify(refresh, process.env.SECRET);
			const user = await this.userService.get({
				username: (decoded as {username: string}).username,
			});

			// Check tokens
			if (!user.refreshTokens.includes(refresh)) throw new Error(`Token not valid`);

			// Generate new tokens
			const {refresh: newRefresh, access: newAccess} = this.generateTokens(
				user.username
			);

			// Update user's token
			const updateState = await this.userService.updateRefresh(
				refresh,
				newRefresh,
				user.username
			);
			if (updateState.error) throw new Error(`DB_ERR`);

			return {error: false, code: `OK`, refresh: newRefresh, access: newAccess};
		} catch (err) {
			throw new HttpException(err, HttpStatus.UNAUTHORIZED);
		}
	}

	/**
	 * Register user in system
	 * @param props
	 * @param role
	 */
	public async register(
		props: IUser,
		role: `user` | `admin`
	): Promise<{access?: string; refresh?: string} & IReturn> {
		const createState = await this.userService.create(props, role);

		// If error while create return state
		if (createState.error) {
			throw new HttpException(
				createState.code,
				createState.code === `DB_ERROR`
					? HttpStatus.INTERNAL_SERVER_ERROR
					: HttpStatus.BAD_REQUEST
			);
		}

		// Generate new tokens
		const {refresh: newRefresh, access: newAccess} = this.generateTokens(
			props.username
		);

		const user = await this.userService.get({
			username: props.username,
		});

		// Update user's token
		const updateState = await this.userService.updateRefresh(
			null,
			newRefresh,
			user.username
		);

		if (updateState.error) {
			throw new HttpException(
				updateState.code,
				updateState.code === `DB_ERROR`
					? HttpStatus.INTERNAL_SERVER_ERROR
					: HttpStatus.BAD_REQUEST
			);
		}

		return {error: false, code: `OK`, refresh: newRefresh, access: newAccess};
	}

	/**
	 * Login user in system
	 * @param props
	 */
	public async login(
		props: IUser
	): Promise<{access?: string; refresh?: string} & IReturn> {
		const loginState = await this.userService.login(props);

		// If error while login return state
		if (loginState.error)
			throw new HttpException(loginState.code, HttpStatus.BAD_REQUEST);

		// Check refresh tokens
		const user = await this.userService.get({username: props.username});

		// Generate new tokens
		const {refresh: newRefresh, access: newAccess} = this.generateTokens(
			props.username
		);

		// Update user's token
		const updateState = await this.userService.updateRefresh(
			null,
			newRefresh,
			user.username
		);

		if (updateState.error) {
			throw new HttpException(
				updateState.code,
				updateState.code === `DB_ERR`
					? HttpStatus.INTERNAL_SERVER_ERROR
					: HttpStatus.BAD_REQUEST
			);
		}

		return {error: false, code: `OK`, refresh: newRefresh, access: newAccess};
	}
}
