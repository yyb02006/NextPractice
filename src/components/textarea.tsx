import { UseFormRegisterReturn } from 'react-hook-form';

interface TextAreaProps {
	label?: string;
	name?: string;
	placeholder?: string;
	rows: number;
	register: UseFormRegisterReturn;
	required: boolean;
	[key: string]: any;
}

export default function TextArea({
	label,
	name,
	placeholder,
	rows = 4,
	register,
	required,
	...rest
}: TextAreaProps) {
	return (
		<div className='select-none space-y-2'>
			<label htmlFor={name} className='font-normal text-xs'>
				{label}
			</label>
			<textarea
				rows={rows}
				id={name}
				className='appearance-none resize-none block text-gray-200 border-none w-full bg-[#2a2a2a] rounded-sm placeholder-gray-500 focus:border-green-600 focus:ring-[1px] focus:ring-green-600'
				placeholder={placeholder}
				required={required}
				{...register}
				{...rest}
			/>
		</div>
	);
}
