'use client';

import Cookies from 'js-cookie';
import { create } from 'zustand';

interface AuthStore {
	isLoggedIn: boolean;
	login: (token: string) => void;
	logout: () => void;
	token: string | null;
}
export const useAuthStore = create<AuthStore>(set => ({
	isLoggedIn: false,
	token: null,
	login: (token: string) => {
		set({ isLoggedIn: true, token });

		Cookies.set('auth_token', token, {
			expires: 7,
			path: '/',
			sameSite: 'lax',
		});
	},

	logout: () => {
		set({ isLoggedIn: false, token: null });
		Cookies.remove('auth_token');
	},
}));
