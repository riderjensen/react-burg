import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios-orders';


class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your address'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false,
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your ZIP'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				touched: false,
				valid: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				touched: false,
				valid: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [{
						value: 'fastest', displayValue: 'Fastest',
					},
					{
						value: 'cheapest', displayValue: 'Cheapest'
					}]
				},
				valid: true,
				validation: {},
				value: 'fastest'
			}
		},
		formIsValid: false,
		loading: false,
	}

	orderHandler = (event) => {
		event.preventDefault();

		this.setState({
			loading: true
		})
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData

		}
		axios.post('/orders.json', order)
			.then(resp => {
				console.log(resp);
				this.setState({
					loading: false,
				});
				this.props.history.push('/')
			})
			.catch(err => {
				console.log(err);
				this.setState({
					loading: false,
				});
			});
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

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm
		}
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		}
		updatedFormElement.touched = true;
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifiers in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
		}

		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });

	}

	render() {

		const formElementsAarry = [];
		for (let key in this.state.orderForm) {
			formElementsAarry.push({
				id: key,
				config: this.state.orderForm[key]
			})
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsAarry.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
						invalid={!formElement.config.valid}
						touched={formElement.config.touched}
						shouldValidate={formElement.config.validation} />
				))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}
export default ContactData;