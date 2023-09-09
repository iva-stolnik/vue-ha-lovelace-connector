<template>
  <div>
      <div> {{configIn}} </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
props: {
  config: Object,
},
setup(props) {  
  const configIn = ref(JSON.parse(props.config));

  return {
      configIn
  };
},
});
</script>
