class PublicPagesConfig {
	HOME = '/';
	AUTH = '/auth';
	LOGIN = '/login';
	REGISTER = '/register';
	NEW_PASSWORD = '/reset-password';
	DROP_PASSWORD = '/drop-password';
	AUTH_CALLBACK = `${this.AUTH}/callback`;
}

export const PUBLIC_PAGES = new PublicPagesConfig();
