import Button from '@/components/button';
import Input from '@/components/input';
import Layout from '@/components/layout';
import useMutation from '@/libs/client/useMutation';
import useUser from '@/libs/client/useUser';
import type { NextPage } from 'next';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ValidationDataProps } from '../api/profiles/own';
import { imageUrl } from '@/libs/client/utils';

interface EditFormErrors {
	emptyForm?: string;
	phoneOverlap?: string;
	emailOverlap?: string;
}

interface EditForm extends EditFormErrors {
	name: string;
	email?: string;
	phone?: string;
	avatar?: FileList;
}

interface EditedResponse {
	success: boolean;
	results: { errors?: ValidationDataProps; values: ValidationDataProps };
}

interface PrevForm {
	name?: string;
	email?: string;
	phone?: string;
	avatar?: FileList;
}

const EditProfile: NextPage = () => {
	const { user } = useUser();
	const [preview, setPreview] = useState('');

	const {
		register,
		handleSubmit,
		setValue,
		setError,
		formState: { errors },
		setFocus,
		clearErrors,
		watch,
	} = useForm<EditForm>();

	const [sendEdited, { data, loading }] =
		useMutation<EditedResponse>('/api/profiles/own');

	useEffect(() => {
		if (user?.email) {
			setValue('email', user.email);
		}
		if (user?.name) {
			setValue('name', user.name);
		}
		if (user?.phone) {
			setValue('phone', user.phone);
		}
		/**fileObject는 db에서 불러온 값과 어떻게 비교할 것인지? */
	}, [user, setValue]);

	useEffect(() => {
		if (data?.results?.errors?.email) {
			setError('emailOverlap', { message: data.results.errors.email });
		}
		if (data?.results?.errors?.phone) {
			setError('phoneOverlap', { message: data.results.errors.phone });
		}
	}, [data, setError]);

	const onValid = async ({ email, name, phone, avatar }: EditForm) => {
		if (loading) return;
		if (!email && !phone) {
			setFocus('email');
			return setError('emptyForm', {
				message: '님폰없? 님메없?!',
			});
		}

		if (
			[email, name, phone].every(
				(value, idx) => value === [user.email, user.name, user.phone][idx]
			) &&
			avatar &&
			avatar.length === 0
		) {
			return console.log('overlap');
		}

		if (avatar && avatar.length > 0) {
			const { uploadURL } = await (await fetch(`/api/files`)).json();
			const form = new FormData();
			form.append('file', avatar[0], user.id.toString());
			const {
				result: { id },
			} = await (await fetch(uploadURL, { method: 'POST', body: form })).json();

			sendEdited({ email, name, phone, avatarImageId: id });
		} else {
			sendEdited({ email, name, phone });
		}
	};

	const onEmptyErrorChange = () => {
		const emptyErrors: 'emptyForm'[] = ['emptyForm'];
		emptyErrors.forEach((arr) => clearErrors(arr));
	};

	const onEmailOverlapChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (
			data?.results?.errors &&
			e.target.value === data?.results.values.email
		) {
			return setError('emailOverlap', { message: data.results.errors.email });
		}
		clearErrors('emailOverlap');
	};
	const onPhoneOverlapChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (
			data?.results?.errors &&
			e.target.value === data?.results.values.phone
		) {
			return setError('phoneOverlap', { message: data.results.errors.phone });
		}
		clearErrors('phoneOverlap');
	};
	const avatar = watch('avatar');
	useEffect(() => {
		if (avatar && avatar.length > 0) {
			setPreview(URL.createObjectURL(avatar[0]));
		} else if (user?.avatar) {
			setPreview(imageUrl(user.avatar, 'public'));
		}
	}, [avatar]);
	return (
		<Layout canGoBack={true}>
			<form
				onSubmit={handleSubmit(onValid)}
				className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12 space-y-4'
			>
				<div className='flex'>
					<label
						htmlFor='picture'
						className='w-32 relative group cursor-pointer'
					>
						{preview ? (
							<img
								src={preview}
								className='object-cover w-32 aspect-square rounded-lg'
							/>
						) : (
							<div className='bg-pink-400 w-32 aspect-square rounded-lg' />
						)}
						<div className='absolute -bottom-1 -right-1 bg-green-600 rounded-full p-1 shadow-md shadow-green-900 justify-center items-center text-gray-200 text-xs mt-1 transition-color group-hover:bg-indigo-500 group-hover:shadow-indigo-800 transition'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={2}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
								/>
							</svg>
						</div>
						<input
							type='file'
							id='picture'
							accept='image/*'
							className='hidden'
							{...register('avatar')}
						/>
					</label>
					<div className='flex-1 flex justify-center items-center font-light'>
						<span className='font-medium text-green-400'>{user?.name}</span>님
						ㅎㅇㅎㅇ^^
					</div>
				</div>
				<div className='pt-4 space-y-4'>
					<Input
						kind='text'
						label='닉-네임'
						name='name'
						placeholder='선생님의 존함'
						register={register('name', { required: '이름이 없습니다...' })}
						required
					/>
					<Input
						kind='email'
						label='이-메일'
						name='email'
						placeholder='abcd@efuandyour.car'
						register={register('email', {
							onChange: (e) => {
								onEmptyErrorChange();
								onEmailOverlapChange(e);
							},
						})}
						err={errors.emailOverlap ? errors.emailOverlap?.message : ''}
					/>
					<Input
						kind='phone'
						label='폰-남바'
						name='phone'
						placeholder='010-1234-5678'
						register={register('phone', {
							onChange: (e) => {
								onEmptyErrorChange();
								onPhoneOverlapChange(e);
							},
						})}
						err={errors.phoneOverlap ? errors.phoneOverlap?.message : ''}
					/>
				</div>
				{errors.emptyForm ? (
					<div className='text-red-400 text-sm'>{errors.emptyForm.message}</div>
				) : null}
				<Button name={loading ? '수정 중...' : '수정 완료'}></Button>
			</form>
		</Layout>
	);
};

export default EditProfile;
