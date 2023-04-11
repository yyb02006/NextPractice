import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
	kind: 'text' | 'email' | 'price' | 'phone' | 'etc';
	name: string;
	label?: string;
	placeholder?: string;
	register: UseFormRegisterReturn;
	required?: boolean;
	err?: string;
	[key: string]: any;
}

export default function Input({
	kind = 'text',
	label,
	name,
	placeholder,
	register,
	/**required를 매개변수로 선언하고 실제 input element에는 넣지 않았을때?
	 * required가 매개변수에 포함되어있기 때문에 ...rest에 속하지 않게 됨 즉, 아래에 있는 input element에 전달되지 않음
	 */
	required,
	err,
	/**rest로 받는 parameter는 interface에 부합하는 범위에서 unlimited argument(무한인자)를 받을 수 있다.*/
	...rest
}: InputProps) {
	return (
		<div className='flex flex-col item space-y-2 select-none text-gray-200'>
			{label ? (
				<label htmlFor={name} className='font-medium text-xs text-gray-300'>
					{label}
				</label>
			) : null}
			{kind === 'text' ? (
				<div>
					<input
						type='text'
						id={name}
						placeholder={placeholder}
						className='appearance-none w-full bg-[#2a2a2a] border-none rounded-sm placeholder-gray-500 outline-none focus:border-green-600 focus:ring-[2px] focus:ring-green-600'
						required={required}
						{...register}
						{...rest}
					/>
					{err ? <p className='text-xs mt-1 text-red-400'>{err}</p> : null}
				</div>
			) : null}
			{kind === 'email' ? (
				<div>
					<input
						type='email'
						id={name}
						className='appearance-none w-full bg-[#2a2a2a] border-none rounded-sm placeholder-gray-500 font-medium outline-none focus:border-green-600 focus:ring-[2px] focus:ring-green-600'
						placeholder={placeholder}
						required={required}
						{...register}
						{...rest}
					/>
					{err ? <p className='text-xs mt-1 text-red-400'>{err}</p> : null}
				</div>
			) : null}
			{kind === 'price' ? (
				<div>
					<div className='relative flex items-center'>
						<div className='absolute pl-3 h-full flex items-center left-0 top-0'>
							<span className='font-SCoreDream text-base font-medium'>￦</span>
						</div>
						<input
							type='number'
							id={name}
							placeholder={placeholder}
							className='appearance-none pl-8 pr-12 w-full bg-[#2a2a2a] border-none rounded-sm placeholder-gray-500 outline-none focus:border-green-600 focus:ring-[2px] focus:ring-green-600'
							onWheel={(e) => e.currentTarget.blur()}
							required={required}
							{...register}
							{...rest}
						/>
						<span className='absolute font-Roboto pr-3 h-full flex items-center font-bold right-0 top-0'>
							KRW
						</span>
					</div>
					{err ? <p className='text-xs mt-1 text-red-400'>{err}</p> : null}
				</div>
			) : null}
			{kind === 'phone' ? (
				<div>
					<div className='flex'>
						<span className='flex justify-center items-center border border-r-0 border-[#404040] text-sm px-3 rounded-l-sm select-none font-medium'>
							+82
						</span>
						<input
							className='appearance-none w-full bg-[#2a2a2a] border-none placeholder-gray-500 font-medium focus:border-green-600 focus:ring-[2px] focus:ring-green-600 rounded-r-sm'
							type='number'
							id={name}
							placeholder={placeholder}
							required={required}
							//prevent change number on wheel move
							onWheel={(e) => e.currentTarget.blur()}
							{...register}
							{...rest}
						/>
					</div>
					{err ? <p className='text-xs mt-1 text-red-400'>{err}</p> : null}
				</div>
			) : null}
			{kind === 'etc' ? (
				<div>
					<input
						id={name}
						placeholder={placeholder}
						className='appearance-none w-full bg-[#2a2a2a] border-none rounded-sm placeholder-gray-400 outline-none focus:border-green-600 focus:ring-[2px] focus:ring-green-600'
						required={required}
						onWheel={(e) => e.currentTarget.blur()}
						{...register}
						{...rest}
					/>
					{err ? <p className='text-xs mt-1 text-red-400'>{err}</p> : null}
				</div>
			) : null}
		</div>
	);
}
