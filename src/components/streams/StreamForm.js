import React from 'react';
import { Field, reduxForm } from 'redux-form';

const StreamForm = (props) => {
	const { handleSubmit, onFormSubmit, edit } = props;
	const renderInput = ({ input, meta, label }) => {
		return (
			<div className={`field ${meta.touched && meta.error ? 'error' : ''}`}>
				<label>{label}</label>
				<input {...input} type="text" />
				<div className="ui message error">{meta.touched && meta.error}</div>
			</div>
		);
	};

	return (
		<form onSubmit={handleSubmit(onFormSubmit)} className="ui form error">
			<Field name="title" component={renderInput} label="Title" />
			<Field name="description" component={renderInput} label="Description" />
			<button className={`ui button ${edit ? 'primary' : 'positive'}`} type="submit">
				{edit ? 'UPDATE' : 'SUBMIT'}
			</button>
		</form>
	);
};

const validate = (values) => {
	const errors = {};
	if (!values.title) {
		errors.title = 'You must enter a title';
	}

	if (!values.description) {
		errors.description = 'You must enter a description';
	}
	return errors;
};

export default reduxForm({ form: 'streamForm', validate })(StreamForm);
