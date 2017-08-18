function notEmpty(str){
  if(/^\s*$/.test(str)){
    return '该项不可为空'
  }
  return '';
}
const rules = {
  notEmpty
}
export default rules;

export function getValidator(v){
  if(typeof(v) === 'function'){
    return v;
  }
  return rules[v];
}

// export function extend(obj){
//   Object.assign(rules, obj);
// }
