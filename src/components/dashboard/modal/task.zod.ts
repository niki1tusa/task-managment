import type { LucideIcon } from 'lucide-react';
import { z } from 'zod';

import type { TFormData } from '@/shared/types/task.types';

export const ZTaskScheme = z.object({
	title: z.string().min(1, 'Title is required (minimal one symbol)!'),
	due: z.date().min(new Date(), 'Due date must be in the future'),
	iconTheme: z.custom<LucideIcon>(val => typeof val === 'function', {
		message: 'Icon must be a valid function',
	}),
});
