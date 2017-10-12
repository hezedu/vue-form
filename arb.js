
function getValidator(v){
  if(typeof(v) === 'function'){
    return v;
  }
  return Validate.validators[v];
}

// opts : {data: {}, validations: {}}
function Validate(opts){
  this.data = opts.data;
  this.validations = opts.validations;
  this.onValidate = opts.onValidate || function(){};
  this._init();
  return this;
}

// static
Validate.validators = {};

Validate.addValidator = function(key, value){
  if(typeof key === 'object'){
    Object.assign(this.validators, key);
  }else{
    this.validators[key] = value;
  }
}


Validate.prototype._getValidatorByName(){
  return getValidator(this.validations[name]);
}

Validate.prototype._init = function(){
    const {data, validations} = this;
    const validators = Object.keys(validations);
    const validateMap = {};
    const initErrors = {};
    let successTotal = 0;

    validators.forEach( i => {
      let fn = this._getValidatorByName(i);
      let msg = fn(data[i]);
      const validate = {
        isInit : true
      };

      if(msg){
        validate.status = 'error';
        validate.msg = msg;
        if(isInit){
          initErrors[i] = true;
        }
        //len++;
      }else{
        successTotal ++;
        validate.status = 'success';
        validate.msg = null;
      }
      validateMap[i] = validate;
    })

    Object.assign(this, {
      validateTotal: validators.length,
      successTotal,
      initErrors,
      validateMap
    });
}

Validate.prototype.showAllError = function() {
    for(let i in this.initErrors){
      this.update(i, this.data[i]);
    }
}

Validate.prototype.update = function(name, v){
  const {_getValidatorByName,  validateMap, initErrors} = this;
  let validator = _getValidatorByName(name);
  let msg = validator(v);
  const data = validateMap[name];
  const status = data.status;

  if(data.isInit){
    data.isInit = false;
    delete(initErrors[name]);
  }
  if(msg){
    if(status === 'success'){
      this.successTotal --;
      data.status = 'error';
      data.msg = msg;
    }
  }else{
    if(status !== 'success'){
      this.successTotal ++;
      data.status = 'success';
    }
  }

  this.onValidate({
    name,
    value: v,
    result: data
  })
}
