import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';


import axios from '../../../axios-orders';


class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();

		this.setState({
			loading: true
		})
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Bert Reynolds',
				address: {
					street: 'Test street',
					zipCode: '13245',
					country: 'U.S.'
				},
				email: 'test@test.com'
			},
			deliveryMethod: 'fastest'
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

	render() {
		let form = (
			<form>
				<input type="text" name="name" placeholder="Your name" />
				<input type="email" name="email" placeholder="Your email" />
				<input type="text" name="street" placeholder="Street" />
				<input type="text" name="postal" placeholder="Postal code" />
				<Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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