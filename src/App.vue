<template>
  <div>
      <div> {{configIn}} </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { devConfig } from '../devConfig'

export default defineComponent({
props: {
  config: Object,
  hass: Object
},
setup(props) {  
  const configIn = ref({});

  try {
        configIn.value = ref(JSON.parse(props.config));  
    }
    catch {
        configIn.value = ref(devConfig);  
    }

  return {
      configIn
  };
},
});
</script>
