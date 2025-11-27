import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});
	const { pathname, searchParams } = request.nextUrl;
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
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options)
					);
				},
			},
		}
	);
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		const url = request.nextUrl.clone();
		url.pathname = '/login';

		const queryString = searchParams.size ? `?${searchParams}` : '';
		url.search = '';
		url.searchParams.set('redirectTo', pathname + queryString);
		console.log(url);
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
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
