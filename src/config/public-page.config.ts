class PublicPagesConfig {
	HOME = '/';
	AUTH = '/auth';
	LOGIN = `/login`;
	REGISTER = `/register`;
	AUTH_CALLBACK = `${this.AUTH}/callback`
}

export const PUBLIC_PAGES = new PublicPagesConfig();
