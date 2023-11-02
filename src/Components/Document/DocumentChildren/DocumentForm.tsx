import { IDocumentForm, IFormInput } from '@naviair/node-shared-interfaces';
import { Button, Form, Input, Result } from 'antd';
import React, { useState } from 'react';
import { Icon, EIconTypes } from '../../Icon';

export type TFormValues = { [key: string]: string | number };

export interface ISubmitFormResponse extends IDocumentForm {
	values: TFormValues;
}

/* Form document type, used in extension of document */
export const DocumentForm: React.FC<{
	/* The Application form object. */
	form: IDocumentForm;
	/* Fetch Call onSend prop. Values defines the values returned on form submission. */
	onSubmit: (form: ISubmitFormResponse) => Promise<void>;
}> = (props) => {
	const [getFormState, setFormState] = useState({ error: false, submitted: false, loading: false });

	const onSubmit = (values?: TFormValues) => {
		setFormState({ ...getFormState, loading: true });
		props
			.onSubmit({ values: values, ...props.form })
			.then(() => setFormState({ error: false, submitted: true, loading: false }))
			.catch(() => setFormState({ error: true, submitted: false, loading: false }));
	};

	/* Prefix Icons should be deep imported manually for specific project, as Icons are defined by names in configuration. They will not appear, if not added to icon library. */
	const FormInput: React.FC<IFormInput> = (formInputProps) => {
		return (
			<Form.Item
				name={formInputProps.inputId}
				rules={[{ required: formInputProps.required, message: `${formInputProps.onInputErrorMessage}`, type: formInputProps.inputType }]}>
				<Input
					required={formInputProps.required}
					placeholder={formInputProps.placeholder}
					autoFocus={formInputProps.autoFocus}
					addonBefore={formInputProps.addonBefore}
					key={formInputProps.inputId}
					prefix={formInputProps.prefixIcon && <Icon name={formInputProps.prefixIcon} type={EIconTypes.REGULAR} />}
				/>
			</Form.Item>
		);
	};

	return (
		<>
			{getFormState.error && <Result status={'error'} title={props.form.onFormErrorMessage.title} subTitle={props.form.onFormErrorMessage.subtitle} />}
			{getFormState.submitted && (
				<Result status={'success'} title={props.form.onFormSuccessMessage.title} subTitle={props.form.onFormSuccessMessage.subtitle} />
			)}
			{!getFormState.error && !getFormState.submitted && (
				<Form name={'applicationForm'} className={'scDocumentForm'} onFinish={onSubmit}>
					{props.form.input.map((input, i) => (
						<FormInput key={`FormInput_${i}`} {...input} />
					))}
					<Form.Item className={'button'}>
						<Button loading={getFormState.loading} type={'primary'} htmlType={'submit'}>
							{props.form.submitButtonText}
						</Button>
					</Form.Item>
				</Form>
			)}
		</>
	);
};
