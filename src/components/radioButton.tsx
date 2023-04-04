import { clsNm } from '@/libs/client/utils';
import { Dispatch, MouseEvent, SetStateAction } from 'react';

interface RadioButtonProps {
	title: string;
	buttonValues: string[];
	category: string;
	setCategory: Dispatch<SetStateAction<string>>;
}

export default function RadioButton({
	title,
	buttonValues,
	category,
	setCategory,
}: RadioButtonProps) {
	const onSelect = (e: MouseEvent<HTMLInputElement>) => {
		if (category === e.currentTarget.value) {
			setCategory((p) => (p = ''));
			return;
		}
		setCategory(e.currentTarget.value);
	};
	return (
		<div className='space-y-3'>
			<div className='font-medium text-xs text-gray-300'>{title}</div>
			{buttonValues.map((_, index) => (
				<label
					htmlFor={buttonValues[index]}
					className={clsNm(
						category === buttonValues[index]
							? 'bg-indigo-600 shadow-indigo-800'
							: 'bg-green-600 shadow-green-800 hover:bg-indigo-500 hover:shadow-indigo-600',
						'inline-block mr-3 shadow-md active:bg-indigo-600 font-medium text-sm rounded-sm px-4 py-2'
					)}
				>
					<input
						id={buttonValues[index]}
						onClick={onSelect}
						type='radio'
						value={buttonValues[index]}
						className='hidden'
					/>
					{buttonValues[index]}
				</label>
			))}
		</div>
	);
}
