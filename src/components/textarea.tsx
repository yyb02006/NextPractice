interface TextAreaProps {
	label: string;
	name: string;
	placeholder: string;
	rows: number;
}

export default function TextArea({
	label,
	name,
	placeholder,
	rows = 4,
}: TextAreaProps) {
	return (
		<div className='select-none space-y-2'>
			<label htmlFor={name} className='font-normal text-xs'>
				{label}
			</label>
			<textarea
				rows={rows}
				id={name}
				className='appearance-none block text-gray-600 w-full bg-gray-200 rounded-sm placeholder-gray-400 outline-none focus:border-green-600 focus:ring-[2px] focus:ring-green-600'
				placeholder={placeholder}
			/>
		</div>
	);
}
