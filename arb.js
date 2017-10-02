export function getValidator(v){
  if(typeof(v) === 'function'){
    return v;
  }
  return Validate.validators[v];
}

function noop(){}

// opts : {data: {}, validation: {}}
function Validate(opts){
  this.data = opts.data;
  this.validation = opts.validation;
  this.onValidate = opts.onValidate || noop;
  this.init();
  return this;
}

Validate.validators = {};

Validate.prototype.getValidatorByName(){
  return getValidator(this.validation[name]);
}

Validate.prototype.init = function(){
    const {data, validation} = this;
    const validators = Object.keys(validation);


    const validateMap = {};
    const initErrors = {};
    let successTotal = 0;

    validators.forEach( i => {
      let fn = this.getValidatorByName(i);
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
Validate.prototype.showError = function() {
    for(let i in this.initErrors){
      this.update(i, this.data[i]);
    }
}
Validate.prototype.update = function(name, v){
  const {getValidatorByName,  validateMap, initErrors} = this;
  let validator = getValidatorByName(name);
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
