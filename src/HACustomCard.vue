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
},
setup(props) {  
  const configIn = ref({});
  const hass = ref(null);

  const getHass = (event) => {
        window.removeEventListener('custom-event-for-vue-card', getHass);
        // recieve whole hass object with its api, socket, services, entities...
        hass.value = event.detail.hass

        console.log(hass.value);
    };

    window.addEventListener('custom-event-for-vue-card', getHass);

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
