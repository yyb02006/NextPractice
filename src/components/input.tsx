interface InputProps {
	label: string;
	name: string;
	kind: 'text' | 'email' | 'price' | 'phone';
	placeholder: string;
	[key: string]: any;
}

export default function Input({
	kind = 'text',
	label,
	name,
	placeholder,
	...rest
}: InputProps) {
	return (
		<div className='flex flex-col item space-y-2 select-none'>
			<label htmlFor={name} className='font-medium text-xs text-gray-300'>
				{label}
			</label>
			{kind === 'text' ? (
				<input
					type='text'
					id={name}
					placeholder={placeholder}
					className='appearance-none text-gray-600 w-full bg-gray-200 rounded-sm placeholder-gray-400 outline-none focus:border-green-600 focus:ring-[2px] focus:ring-green-600'
					{...rest}
				/>
			) : null}
			{kind === 'email' ? (
				<input
					type='email'
					id={name}
					className='appearance-none w-full bg-gray-200 rounded-sm placeholder-gray-400 font-medium outline-none focus:border-green-600 focus:ring-[2px] focus:ring-green-600'
					placeholder={placeholder}
					{...rest}
				/>
			) : null}
			{kind === 'price' ? (
				<div className='relative flex items-center'>
					<div className='absolute pl-3 h-full flex items-center left-0 top-0 text-gray-500'>
						<span className='font-Roboto text-l font-medium'>￦</span>
					</div>
					<input
						type='number'
						id={name}
						placeholder={placeholder}
						className='appearance-none text-gray-600 pl-8 pr-12 w-full bg-gray-200 rounded-sm placeholder-gray-400 outline-none focus:border-green-600 focus:ring-[2px] focus:ring-green-600'
						{...rest}
					/>
					<span className='absolute font-Roboto pr-3 h-full flex items-center font-bold right-0 top-0 text-gray-500'>
						KRW
					</span>
				</div>
			) : null}
			{kind === 'phone' ? (
				<div className='flex'>
					<span className='flex justify-center items-center border border-r-0 border-gray-500 text-gray-400 text-sm px-3 rounded-l-sm select-none font-medium'>
						+82
					</span>
					<input
						className='appearance-none w-full bg-gray-200 border-gray-300 text-[#101010] placeholder-gray-400 font-medium focus:border-green-600 focus:ring-[2px] focus:ring-green-600 rounded-r-sm'
						type='number'
						id={name}
						placeholder={placeholder}
						{...rest}
					/>
				</div>
			) : null}
		</div>
	);
}
