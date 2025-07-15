import type { FormElement } from '../../../ui/form/form.types';

export const SUB_TASK_ADD_FIELDS: FormElement[] = [
    {
        type: 'field',
        props: {
            labelText: 'Title',
            registerName: 'title',
            placeholderText: 'Enter title',
            type: 'text',
        },
    },
];
