import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	const token = req.cookies.get('token');
	if (token == null || token?.value === '')
		return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
	matcher: ['/admin/:path*', '/account/:path*'],
};
