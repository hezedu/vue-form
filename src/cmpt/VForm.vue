<template lang="jade">
div
  slot
</template>

<script>
import {getValidator} from '../lib/rules';

export default {
  props: ['data', 'validate', 'isInit'],
  data (){
    const {data, validate, isInit} = this;
    let len = 0;
    let successTotal = 0;
    const validateMap = {};
    const initErrors = {};

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
      verifyLen: len,
      initErrors,
      validateMap
    }
  },
  methods: {
    showError(){
      for(let i in this.initErrors){
        console.log(i)
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

      // if(msg){
      //   if(status !== 'error'){
      //     data.status = 'error';
      //     data.msg = msg;
      //     if(status !== 'init'){
      //       this.afterVerify(1);
      //     }
      //   }
      // }else{
      //   if(status !== 'success'){
      //     data.status = 'success';
      //     this.afterVerify(-1);
      //   }
      // }
    },
    getItemValidate(name){
      const data = this.validateMap[name]
      return data;
    },
    getValidatorByName(name){
      return getValidator(this.validate[name])
    },
    afterVerify(num){
      let {verifyLen} = this;
      let len = verifyLen + num;
      if(len < 0) return;
      this.verifyLen = len;
    }
  }
}
</script>
