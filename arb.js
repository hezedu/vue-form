


// opts : {data: {}, validations: {}}
function Validate(opts){
  this.data = opts.data;
  this.validations = opts.validations;
  this.onValidate = opts.onValidate || function(){};
  this._init();
  return this;
}

function notEmpty(str){
  if(/^\s*$/.test(str)){
    return '该项不可为空'
  }
  return '';
}
// static
Validate.validators = {
  notEmpty: notEmpty
};

Validate.addValidator = function(key, value){
  if(typeof key === 'object'){
    Object.assign(this.validators, key);
  }else{
    this.validators[key] = value;
  }
}

Validate._getValidator = function(v){
  if(typeof(v) === 'function'){
    return v;
  }
  return this.validators[v];
}

// prototype
Validate.prototype._getValidatorByName = function(name){
  if(!this.validations){
    console.log('!this.validations', this)
  }
  return Validate._getValidator(this.validations[name]);
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
        if(validate.isInit){
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
      this.trigger(i, this.data[i]);
    }
}

Validate.prototype.trigger = function(name, v){
  let validator = this._getValidatorByName(name);
  let msg = validator(v);
  const data = this.validateMap[name];
  const status = data.status;
  //console.log('msg', msg)
  if(data.isInit){
    data.isInit = false;
    delete(this.initErrors[name]);
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
      delete(data.msg);
    }
  }

  this.onValidate({
    name,
    value: v,
    status: data.status,
    errormsg: msg,
    validateTotal: this.validateTotal,
    successTotal: this.successTotal
  })
}

var demo = new Validate({
  data: {
    a: ''
  },
  validations: {
    a: 'notEmpty'
  },
  onValidate(data){
    console.log('onValidate', data);
  }
})
demo.trigger('a' , 'b');
