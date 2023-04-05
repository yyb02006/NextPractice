interface ButtonProps {
	name: string;
	[key: string]: any;
}

export default function Button({ name, ...rest }: ButtonProps) {
	return (
		<button
			{...rest}
			className='w-full bg-green-600 rounded-sm py-2 hover:bg-emerald-500 font-medium focus:outline-none transition-color duration-100'
		>
			{name}
		</button>
	);
}
