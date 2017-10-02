<template lang="jade">
div
  slot
</template>

<script>
import {getValidator} from './rules';

export default {
  props: ['data', 'validate'],
  data (){
    const {data, validate} = this;
    const isInit = true;
    const validateMap = {};
    const initErrors = {};
    let successTotal = 0;

    for(let i in validate){
      let fn = this.getValidatorByName(i);
      let msg = fn(data[i]);
      const validate = {
        isInit
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

      this.$watch('data.' + i, function(v){
        this.updateInputStatus(i, v);
      });
    }

    return {
      validateTotal: Object.keys(validate).length,
      successTotal,
      initErrors,
      validateMap
    }
  },
  methods: {
    showError(){
      for(let i in this.initErrors){
        this.updateInputStatus(i, this.data[i]);
      }
    },
    updateInputStatus(name, v){
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
    },
    getItemValidate(name){
      const data = this.validateMap[name]
      return data;
    },
    getValidatorByName(name){
      return getValidator(this.validate[name])
    }
  }
}
</script>
