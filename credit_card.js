/**
 * Provides utility functions for credit cards
 */
CreditCard = {

	cardTypes: [
		{name: 'Visa', lengths: [13,16], pattern: new RegExp(/^4/)},
		{name: 'AmEx', lengths: [15], pattern: new RegExp(/^3[4,7]/)},
		{name: 'Discover', lengths: [16], pattern: new RegExp(/^6011/)},
		{name: 'MasterCard', lengths: [16], pattern: new RegExp(/^5[1-5]/)},
		{name: 'DinersClub', lengths: [14,16], pattern: new RegExp(/^3[0,6,8]/)},
		{name: 'JCB', lengths: [16], pattern: new RegExp(/^35/)}
	],
	
	/**
	 * Determine credit card type based on stub
	 * of credit card number
	 * @param {Number} cardNumber
	 * @return {?string} name of credit card or false
	 */
	getCardType: function(cardNumber) {
	
		if(isNaN(cardNumber)) {
			return false;
		}

		var numberOfCreditCardTypes = this.cardTypes.length,
			i;

		cardNumberClean = cardNumber.replace(/\D/g, '');

		for(i = 0; i < numberOfCreditCardTypes; i++) {

			if(this.cardTypes[i].pattern.test(cardNumberClean)) {
				return this.cardTypes[i].name;
			}

		}
		
		return false;
		
	},

	/**
	 * Get all valid credit card names
	 * @return {Array} list of valid credit card names
	 */
	getCreditCardNames: function() {

		return $.map(this.cardTypes, function(cardType) {

			return cardType.name;

		});

	},

	/**
	 * Determine if a credit card number passes
	 * validation based on the Luhn algorithm
	 * This is borderline inane but accepted
	 * http://en.wikipedia.org/wiki/Luhn_algorithm
	 * NOTE: Cannot be used on an incomplete number
	 * @param {number} creditCardNumber
	 */
	isLuhnVerified: function(creditCardNumber) {

		var number = creditCardNumber,
			sum = 0,
			alt = false,
			i = number.length - 1,
			num;

		if (number.length < 13 || number.length > 19) {
			return false;
		}

		while (i >= 0) {

			num = parseInt(number.charAt(i), 10);

			if (alt) {
				num *= 2;
				if (num > 9) {
					num = (num % 10) + 1;
				}
			}

			alt = !alt;
			sum += num;
			i--;

		}

		return (sum % 10 === 0);

	}

};