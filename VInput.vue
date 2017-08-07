<template lang="jade">
div(:class= 'className')
  input(v-if='isNormalInput', v-bind="$props",:value='value', v-model='data[name]')

  input(v-else-if='type==="radio"', :name='name', :value='value', type='radio',v-model='data[name]')

  input(v-else-if='type==="checkbox"' type='checkbox', :name='name', :value='value',  v-model='data[name]')

  textarea(v-else-if='type==="textarea"', v-bind="$props",
  v-model='data[name]')

  select(v-else-if='type==="select"', v-bind="$props", v-model='data[name]')
    slot
  div(v-if='validate' v-show='isShowError') {{validate.msg}}
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String
    }
  },
  data(){
    const validate = this.$parent.getItemValidate(this.name);
    const data = {
      data: this.$parent.data,
      validate
    }
    return data;
  },
  computed:{
    className(){
      let name = '';
      if(this.validate){
        name = 'hezedu-input-validate-';
        if(this.validate.isInit){
          name += 'init';
        }else{
          name += this.validate.status;
        }
      }
      return name;
    },
    isShowError(){
      return !this.validate.isInit && this.validate.status === 'error';
    },
    isNormalInput(){
      const {type} = this;
      return type === 'text' || type === 'number' || type === 'password'
    }
  }
}
</script>
