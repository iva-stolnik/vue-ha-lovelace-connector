<template>
  <ha-card style="padding:1em;">
    <h1>Configuration</h1>
    <pre>{{configIn}}</pre>
    <h2>Status: {{haStatus}}</h2>
    <div>
      <button @click="callService('light', 'toggle', { entity_id: 'light.wl_office_1'})">
        Toggle Light (call service)
      </button>
    </div>
    <div>
      <button @click="callWebSocket('call_service', 'light', 'toggle', { entity_id: 'light.wl_office_1' })">
        Toggle Light (call websocket)
      </button>
    </div>
  </ha-card>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { devConfig } from '../devConfig'

export default defineComponent({
props: {
  config: Object,
  hass: Object
},
setup(props) {  
  const configIn = ref({});
  const haStatus = ref('')
  // Method to call a service
  const callService = (domain, service, serviceData) => {
    if (props.hass && props.hass.callService) {
      props.hass.callService(domain, service, serviceData);
    } else {
      console.error("Home Assistant instance (hass) or callService method is not available.");
    }
  }
  // Method to call a WebSocket
  const callWebSocket = (type,domain,service,target,serviceData) => {
    if (props.hass && props.hass.callWS) {
      const message = {
          type: type,
          domain: domain,  
          service: service, 
          target: target,
          service_data: serviceData 
      };
      props.hass.callWS(message);
    }
    else {
      console.error("Home Assistant instance (hass) or callWS method is not available.");
    }
  }


  onMounted(()=>{
    try {
        configIn.value = ref(JSON.parse(props.config));  
    }
    catch {
        configIn.value = ref(devConfig);  
    }

    if(props.hass)
    {
      haStatus.value = 'HA Connected'
    }
  }) 

  return {
      configIn,
      haStatus,
      callService,
      callWebSocket
  };
},
});
</script>
