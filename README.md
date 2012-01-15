#Classes for credit card number fields

Currently only detects a card type and adds the appropriate class (for styling).

## What Changed:
-    1/14/12

	     Abstracted DOM handling and cc validation.
	     CreditCard functions like isLuhnVerified and getCreditCardType
	     can now be called anywhere at anytime!
	     Overall, things are just more de-coupled

##Usage:

    <script type="text/javscript">
        $(document).ready(function() {
            new CreditCardInput($('#cc-num'));
        });
    </script>

##TODO:

-   Misc. validation (card length, etc.)


---

Fork'd by jeffmicklos from jfarmer

Original repo: https://github.com/jfarmer/jquery-creditcard