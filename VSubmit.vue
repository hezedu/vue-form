<template lang="jade">
button(:class="{'hezedu-submit-disabled': isDisabled}", @click='handleClick')
  slot
  slot(name='process', :successTotal="$parent.successTotal",  :validateTotal="$parent.validateTotal")
</template>

<script>
export default {
  props: {
    success: {
      type: Function,
      required: true
    }
  },
  computed: {
    verifyLen(){
      return this.$parent.verifyLen;
    },
    isDisabled(){
      return this.$parent.successTotal !== this.$parent.validateTotal;
    }
  },
  methods: {
    handleClick(e){
      if(this.isDisabled){
        return this.$parent.showError();
      }
      this.success(this.$parent.data);
    }
  }
}
</script>
