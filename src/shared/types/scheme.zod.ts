import { z } from 'zod';

import { ICON_NAMES } from '../data/icon.data';

export const ZTaskEditScheme = z.object({
	title: z.string().min(1, 'Title is required (minimal one symbol)!'),
	due_date: z
		.date({ required_error: 'Due date is required' })
		.min(new Date(), 'Due date must be in the future'),

	start_time: z.date().optional(),
	end_time: z.date().optional(),
	icon: z.enum(ICON_NAMES, { errorMap: () => ({ message: 'Invalid icon!' }) }),
});

export const ZSubTaskScheme = z.object({
	title: z.string().min(1, 'Title is required (minimal one symbol)!'),
});

export const ZRegistrationScheme = z.object({
	name: z.string().min(1, 'Name is required!'),
	email: z.string().min(1, 'Email is required.').email(),
	password: z.string().min(1, 'Password is reuired.'),
});
export const ZLoginScheme = z.object({
	email: z.string().min(1, 'Email is required.').email(),
});
export type TRegistrationForm = z.infer<typeof ZRegistrationScheme>;
export type TFormData = z.infer<typeof ZTaskEditScheme>;
export type TSubTaskForm = z.infer<typeof ZSubTaskScheme>;
export type TLoginForm = z.infer<typeof ZLoginScheme>;
