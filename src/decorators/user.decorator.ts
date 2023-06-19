import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
	const locals = context.switchToHttp().getResponse().locals;
	const username = locals.username;
	const role = locals.role;
	return {username: username, role: role, access: locals.access};
});