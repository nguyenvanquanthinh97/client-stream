import React from 'react';
import { Field, reduxForm } from 'redux-form';

const StreamCreate = (props) => {
	const { handleSubmit } = props;
	const renderInput = ({ input, meta, label }) => {
		console.log(meta);
		return (
			<div className={`field ${meta.touched && meta.error ? 'error' : ''}`}>
				<label>{label}</label>
				<input {...input} type="text" />
				<div className="ui message error">{meta.touched && meta.error}</div>
			</div>
		);
	};

	const onSubmitClick = (props) => {
		console.log(props);
	};

	return (
		<form onSubmit={handleSubmit(onSubmitClick)} className="ui form error">
			<Field name="title" component={renderInput} label="Title" />
			<Field name="description" component={renderInput} label="Description" />
			<button className="ui button" type="submit">
				Submit
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

export default reduxForm({ form: 'streamCreate', validate })(StreamCreate);
