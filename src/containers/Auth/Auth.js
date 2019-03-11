import React, { Component } from 'react'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.css';

export default class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false,
			},
		}
	}


	checkValidity(value, rules) {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	render() {
		const formElementsAarry = [];
		for (let key in this.state.controls) {
			formElementsAarry.push({
				id: key,
				config: this.state.controls[key]
			})
		}

		const form = formElementsAarry.map(formElem => (
			<Input key={formElem.id}
				elementType={formElem.config.elementType}
				elementConfig={formElem.config.elementConfig}
				value={formElem.config.value}
				changed={(event) => this.inputChangedHandler(event, formElem.id)}
				invalid={!formElem.config.valid}
				touched={formElem.config.touched}
				shouldValidate={formElem.config.validation} />
		))
		return (
			<div>
				<form className={classes.Auth}>
					{form}
					<Button btnType="success">Submit</Button>
				</form>
			</div>
		)
	}
}
