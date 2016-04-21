'use strict';

class FIELD{
	constructor(){

	}
	required()
	{
		this.required = true;
	}
}

class STRINGfield extends FIELD {
	constructor(){
		super();
	}
}
class INTfield extends FIELD {
	constructor(){
		super();
	}
}
class FLOATfield extends FIELD {
	constructor(){
		super();
	}
}
class BOOLEANfield extends FIELD {
	constructor(){
		super();
	}
}


const FIELDS = {
	STRING: function () {
		return new STRINGfield(arguments)
	},
	INT: function () {
		return new INTfield(arguments)
	},
	FLOAT: function () {
		return new FLOATfield(arguments)
	},
	BOOLEAN: function () {
		return new BOOLEANfield(arguments)
	}
};

// проверка. Например, что целое число  - это целое число. 

module.exports = FIELDS;