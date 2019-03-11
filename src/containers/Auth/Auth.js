import React, { Component } from 'react'
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
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
					type: 'password',
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
		},
		isSignUp: true
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

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true
			}
		}
		this.setState({
			controls: updatedControls
		})
	}

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
	}

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return { isSignUp: !prevState.isSignUp }
		})
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
				<form className={classes.Auth} onSubmit={this.submitHandler}>
					{form}
					<Button btnType="success">Submit</Button>
				</form>
				<Button clicked={this.switchAuthModeHandler} btn-type="danger">Switch to {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
	}
}

export default connect(null, mapDispatchToProps)(Auth);