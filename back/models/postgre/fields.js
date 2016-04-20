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
	STRING: STRINGfield, 
	INT: INTfield,
	FLOAT: FLOATfield,
	BOOLEAN: BOOLEANfield // 0/1
};

// проверка. Например, что целое число  - это целое число. 

module.exports = FIELDS;