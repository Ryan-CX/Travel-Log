import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createLogEntry } from './API';

const LogEntryForm = ({ onClose, location }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const { register, handleSubmit } = useForm();

	const onSubmit = async (data) => {
		try {
			setLoading(true);
			data.latitude = location.latitude;
			data.longitude = location.longitude;
			await createLogEntry(data);

			onClose(); //call the onClose prop
		} catch (error) {
			console.error(error);
			setError(error.message);
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='entry-form'>
			{error ? <h3 className='error'>{error}</h3> : null}
			{/* 
			<label htmlFor='apiKey'>API KEY</label>
			<input type='password' name='apiKey' required {...register('apiKey')} /> */}

			<label htmlFor='title'>Title</label>
			<input name='title' required {...register('title')} autoComplete='off' />
			<label htmlFor='comments'>Comments</label>
			<textarea name='comments' rows={3} {...register('comments')}></textarea>
			<label htmlFor='description'>Description</label>
			<textarea
				name='description'
				rows={3}
				{...register('description')}
			></textarea>
			<label htmlFor='image'>Image Url:</label>
			<input name='image' {...register('image')} />
			<label htmlFor='visitDate'>Visit Date</label>
			<input name='visitDate' type='date' required {...register('visitDate')} />
			<button disabled={loading}>
				{loading ? 'Loading...' : 'Create Travel History'}
			</button>
		</form>
	);
};

export default LogEntryForm;
