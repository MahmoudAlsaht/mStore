import { NextRequest, NextResponse } from 'next/server';
const { SECRET_2 } = process.env;

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const mode = searchParams.get('hub.mode');
	const challenge = searchParams.get('hub.challenge');
	const token = searchParams.get('hub.verify_token');

	if (mode && token) {
		if (mode === 'subscribe' && token === SECRET_2) {
			return new NextResponse(challenge, { status: 200 });
		} else {
			return new NextResponse('', { status: 403 });
		}
	}
}
