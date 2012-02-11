/**
 * Provides automatic class adjustments based on incoming
 * data to provided input
 * @param {jQuery} input credit card number input field
 * @param {Object} settings only 'callback' is supported
 * @param {Object.<function>} settings.callback
 * @param {function} settings.callback.fn function to call
 *     after we get an response about credit card type
 * @param {(Object=|function=)} settings.callback.context
 *     a context to call the function under (optional)
 * @constructor
 */
CreditCardInput = function(input, settings) {

	this.settings = settings || {};
	this.creditCardNames = CreditCard.getCreditCardNames();
	this.creditCardClassNames = [
		'visa',
		'amex',
		'discover',
		'mastercard',
		'dinersclub',
		'jcb'
	];
	
	this.creditCardNamesToClassNames = this.getCreditCardNamesToClassNames(
		this.creditCardNames,
		this.creditCardClassNames
	);
	
	input.bind('keyup', $.proxy(this.onKeyUp, this));

};

/**
 * Callback for user action on input
 * @this {CreditCardInput}
 * @param {jQuery} a jquery extended event
 */
CreditCardInput.prototype.onKeyUp = function(event) {

	var element = $(event.currentTarget),
		cardType = CreditCard.getCardType(element.val()),
		i,
		currentKey;

	if(cardType) {

		element
			.removeClass(this.creditCardClassNames.join(' '))
			.addClass(this.creditCardNamesToClassNames[cardType]);

		this.callbackFunction();

	} else {

		element.removeClass(this.creditCardClassNames.join(' '));

		this.callbackFunction();

	}

};

/**
 * Maps a credit card type to a css class name
 * A sort of naive implementation of
 * the classic 'Two Arrays to Hash'
 * @param {Array} names list of credit card name
 * @param {Array} classes list of css class names
 * @return {Object} mapping of name to css class name 
 */
CreditCardInput.prototype.getCreditCardNamesToClassNames = function(names, classes) {
	
	var map = {};
	
	$.each(names, function(idx, name) {
		map[name] = classes[idx]
	});

	return map;
	
};


/**
 * Calls a provided callback if any
 * If a context is provided, the function will
 * be fired under that context, which is helpful
 * when dealing with non-global functions.
 * @param {?string} arg usually card name
 */
CreditCardInput.prototype.callbackFunction = function(arg) {

	if(this.settings.callback) {
		
		if(this.settings.callback.context) {
			
			this.settings.callback.fn.call(
				this.settings.callback.context,
				arg
			);
			
		} else {
			
			this.settings.callback.fn(arg);
			
		}
		
	}

};