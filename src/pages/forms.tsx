import { useState } from 'react';

export default function Forms() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			currentTarget: { value },
		} = event;
		setUsername(value);
	};
	const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			currentTarget: { value },
		} = event;
		setUsername(value);
	};
	const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			currentTarget: { value },
		} = event;
		setUsername(value);
	};
	return (
		<form>
			<input
				onChange={onUsernameChange}
				value={username}
				type='text'
				placeholder='Username'
			/>
			<input
				onChange={onEmailChange}
				value={email}
				type='email'
				placeholder='Email'
			/>
			<input
				onChange={onPasswordChange}
				value={password}
				type='password'
				placeholder='Pasword'
			/>
		</form>
	);
}
