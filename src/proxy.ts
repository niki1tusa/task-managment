import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export default async function proxy(request: NextRequest) {
	const { pathname, searchParams } = request.nextUrl;
	let response = NextResponse.next();

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
					cookiesToSet.forEach(({ name, value, options }) =>
						response.cookies.set(name, value, options)
					);
				},
			},
		}
	);
// можно заменить на getUser
	const { data, error } = await supabase.auth.getUser();
	const user = data.user

	if (!user || error) {
		const url = request.nextUrl.clone();
		url.pathname = '/login';
		const queryString = searchParams.size ? `?${searchParams}` : '';
		url.search = '';
		url.searchParams.set('redirectTo', pathname + queryString);
		return NextResponse.redirect(url);
	}

	return response;
}

export const config = {
	matcher: [
		'/dashboard/:path*',
		'/messages/:path*',
		'/notification/:path*',
		'/schedule/:path*',
		'/team/:path*',
		'/settings/:path*',
	],
};
