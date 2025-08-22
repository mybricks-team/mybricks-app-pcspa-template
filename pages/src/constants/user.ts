export enum UserStatus {
	/** 删除 */
	DELETE = -1,
	/** 禁用 */
	DISABLED = 0,
	/** 生效中 */
	EFFECT = 1,
}

export const COOKIE_LOGIN_USER = 'mybricks-login-user';