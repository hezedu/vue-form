<style>
label>span{color: red}
.inline{display: inline-block;}
.dw-submit-disabled{color: #999}
.dw-input-validate-success>:nth-child(1){
  border-color: green;
}
.dw-input-validate-error>:nth-child(1){
  border-color: red;
}
.dw-input-validate-init>:nth-child(1){
  border-color: blue;
}
</style>
<template lang="jade">
VForm(:data='data', :validate='validate', :isInit='true')
  table
    tr
      td
        label
          span *
          | 姓名(text):
      td
        VInput(name='name')
    tr
      td
        label
          span *
          | 年龄(number):
      td
        VInput(name='age' type='number')
    tr
      td
        label 性别(radio):
      td(style='width: 200px;display:flex')

        label
          VInput(name='sex' class='inline' value='1' type='radio')
          |男
        label
          VInput(name='sex' class='inline' value='2' type='radio')
          |女
    tr
      td
        label 描述(textarea):
      td
        VInput(name='textarea' class='haha' type='textarea')
    tr
      td
        label 兴趣(checkbox):
      td
        label
          VInput(name='interest' class='inline' value='1' type='checkbox')
          |跑步
        label
          VInput(name='interest' class='inline' value='2' type='checkbox')
          |骑车
        label
          VInput(name='interest' class='inline' value='3' type='checkbox')
          |写代码
    tr
      td
        label
          span *
          |职业(select):
      td
        VInput(name='job' class='haha' type='select')
          option(value='') 请选择
          option(value='1') UI
          option(value='2') 前端
          option(value='3') 后端
  hr
  VSubmit(:success = 'success')
    |submit
    template(scope="props" slot='process')
      span {{props.successTotal}} / {{props.validateTotal}}
  pre {{result}}
</template>

<script>
import VForm from './cmpt/VForm.vue';
import VInput from './cmpt/VInput.vue';
import VSubmit from './cmpt/VSubmit.vue';
export default {
  components: {
    VForm,
    VInput,
    VSubmit
  },
  data(){
    return {
      data: {
        name: '',
        age: '2',
        textarea: '',
        job: '2',
        sex: '1',
        interest: ['1', '2']
      },
      validate: {
        name: 'notEmpty',
        age: 'notEmpty',
        job: 'notEmpty'
      },
      result: null
    }
  },
  methods: {
    success(data){
      this.result = data;
    }
  }
}
</script>
