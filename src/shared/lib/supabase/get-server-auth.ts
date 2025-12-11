import { createFromServer } from './server';

export async function getServerAuth() {
	const server = await createFromServer();
	const {
		data: { user },
	} = await server.auth.getUser();
	return user ?? null;
}
