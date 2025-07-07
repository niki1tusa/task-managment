import { z } from 'zod';

import { ICON_NAMES } from './icon.data';

export const ZTaskScheme = z.object({
	title: z.string().min(1, 'Title is required (minimal one symbol)!'),
	due: z.date().min(new Date(), 'Due date must be in the future'),
	iconTheme: z.enum(ICON_NAMES, { errorMap: () => ({ message: 'Invalid icon!' }) }),
});

export const ZSubTaskScheme = z.object({
	title: z.string().min(1, 'Title is required (minimal one symbol)!'),
});
