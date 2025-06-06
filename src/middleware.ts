import { type NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { readPayloadJose } from "./libs/utils/jwt";


export const middleware = async (request: NextRequest) => {
	
	if (request.url.includes("/api")) {

		const cookieStorage = await cookies();
		const token = cookieStorage.get("token");


		if (!token) {
			return NextResponse.json({
				statusCode: 401,
				error: "Unauthorized",
			});
		}

		const tokenData = await readPayloadJose<{ id: string; email: string }>(
			token.value,
		);

    const requestHeaders = new Headers(request.headers);

		requestHeaders.set("x-user-id", tokenData.id);
		requestHeaders.set("x-user-email", tokenData.email);

		return NextResponse.next({
			headers: requestHeaders,
		});
	}

	return NextResponse.next();
};