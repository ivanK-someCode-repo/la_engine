'use strict';
function throwError(text) {
	return {
		error: true, text
	};
}
class FIELD{
	constructor(){
			this.required = false;
	}
	check(val, key) // это проверка на модификацию по-хорошему. на поиск надо дело отдельно
	{
		if (val === undefined && this.required)
		{
			return throwError(`Required field ${key}`);
		}
		if (val !== undefined && !this.checkType(val))
		{
			return throwError(`Wrong type ${key}`);
		}
		return {error: false};
	}
	req()
	{
		this.required = true;
	}
}

class STRINGfield extends FIELD {
	constructor(params){
		super();
		this.len = params[0];
	}
	checkType(val)
	{
    return (Object.prototype.toString.call(val) === '[object String]');
  }
}
class INTfield extends FIELD {
	constructor(){
		super();
	}
	checkType(val)
	{
		return !isNaN(parseInt(val)) && val % 1 === 0;
	}
}
class FLOATfield extends FIELD {
	constructor(){
		super();
	}
	checkType(val)
	{
		return !isNaN(parseFloat(val)) && isFinite(val);
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
