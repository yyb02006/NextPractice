import { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

interface LoginForm {
	username: string;
	password: string;
	email: string;
}

export default function Forms() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<LoginForm>({ mode: 'onSubmit' });
	const onValid = (data: LoginForm) => {
		console.log(data);
	};
	const onInvalid = (errors: FieldErrors) => {
		console.log(errors);
	};
	useEffect(() => {
		setValue('username', 'hello');
	}, []);
	return (
		<form onSubmit={handleSubmit(onValid, onInvalid)}>
			<input
				{...register('username', {
					required: 'username is required',
					minLength: { message: '너 이름이 짧구나?', value: 5 },
				})}
				type='text'
				placeholder='Username'
			/>
			<input
				{...register('email', {
					required: true,
					validate: {
						notGmail: (value) =>
							!value.includes('@gmail.com') || 'gmail is suck',
					},
				})}
				type='email'
				placeholder='Email'
			/>
			{errors.email?.message}
			<input {...register('password')} type='password' placeholder='Password' />
			<input type='submit' value='Create Account' />
		</form>
	);
}
