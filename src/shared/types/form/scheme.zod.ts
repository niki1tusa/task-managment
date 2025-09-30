import { z } from 'zod';

// task
export const ZTaskEditScheme = z.object({
	title: z.string().min(1, 'Title is required (minimal one symbol)!'),
	due_date: z
		.date({ required_error: 'Due date is required' })
		.min(new Date(), 'Due date must be in the future'),

	start_time: z.date().optional(),
	end_time: z.date().optional(),
	icon: z.string().optional(),
});

export const ZSubTaskScheme = z.object({
	title: z.string().min(1, 'Title is required (minimal one symbol)!'),
});

// auth
export const ZRegistrationScheme = z.object({
	name: z.string().min(1, 'Name is required!'),
	email: z.string().min(1, 'Email is required').email(),
	password: z.string().min(1, 'Password is required'),
});
export const ZLoginScheme = z.object({
	email: z.string().min(1, 'Email is required.').email(),
});
export const ZLoginPhonePasswordScheme = z.object({
	phone: z
		.string()
		.trim()
		.regex(/^\+[1-9]\d{7,14}$/, 'Use E.164 format, e.g. +15551234567'),
	password: z.string().min(1, 'Email is required.').email(),
});
export const ZDropPasswordScheme = z.object({
	email: z.string().min(1, 'Email is required').email(),
});
export const ZResetPasswordScheme = z
	.object({
		password: z.string().min(1, 'Password is required'),
		passwordAgain: z.string().min(1, 'Password again is required'),
	})
	.refine(v => v.password === v.passwordAgain, {
		path: ['passwordAgain'],
		message: 'Passwords do not match',
	});
//  settings
export const ZSettingsScheme = z.object({
	name: z.string().min(1, 'Name is required!'),
	occupation: z.string().default('guest'),
	email: z.string().min(1, 'Email is required').email(),
	phone: z.string().trim().regex(/^\+[1-9]\d{7,14}$/, 'Use E.164 format, e.g. +15551234567'),
});
// schedule
export const ZScheduleScheme = z.object({
  title: z.string().min(1, 'Name is required!'),
  event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date (YYYY-MM-DD)'),
  event_start: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Invalid time (HH:MM or HH:MM:SS)'),
  event_end: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Invalid time (HH:MM or HH:MM:SS)'),
});

export type TScheduleForm = z.infer<typeof ZScheduleScheme>
export type TSettingsForm = z.infer<typeof ZSettingsScheme>;
export type TRegistrationForm = z.infer<typeof ZRegistrationScheme>;
export type TTaskUpdateForm = z.infer<typeof ZTaskEditScheme>;
export type TSubTaskRowForm = z.infer<typeof ZSubTaskScheme>;
export type TLoginForm = z.infer<typeof ZLoginScheme>;
export type TLoginPhonePasswordForm = z.infer<typeof ZLoginPhonePasswordScheme>;
export type TDropPasswordForm = z.infer<typeof ZDropPasswordScheme>;
export type TResetPasswordForm = z.infer<typeof ZResetPasswordScheme>;
