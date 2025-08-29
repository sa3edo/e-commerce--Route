export interface User {
	name: string;
	email: string;
	role: string;
}

export interface IRegisterUserResponse {
	message: string;
	user: User;
	token: string;
}