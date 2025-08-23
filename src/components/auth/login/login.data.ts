export const loginFields = [
	{
		type: 'field',
		props: {
			labelText: 'Email',
			registerName: 'email',
			placeholderText: 'example@email.com',
			type: 'email',
		},
	},
];

export const loginPhonePasswordFields = [
  {
    type: 'field',
    props: {
      labelText: 'Phone',
      registerName: 'phone',
      placeholderText: '+15551234567',
      type: 'tel',
      inputMode: 'tel',
      autoComplete: 'tel',
    },
  },
  {
    type: 'field',
    props: {
      labelText: 'Password',
      registerName: 'password',
      placeholderText: 'Your password',
      type: 'password',
      autoComplete: 'current-password',
    },
  },
];
