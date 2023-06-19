// General

export interface IReturn {
	error: boolean;
	code: string;
	description?: string;
}

// User and Auth

export interface IUser {
	username: string;
	password: string;
}

interface IGoogleAuthProfile {
	id: string;
	displayName: string;
	emails: string[];
	photos: {value: string}[];
}

interface IGoogleProfile {
	googleId: string;
	displayName: string;
	email: string;
	photos: {value: string}[];
}
