<template>
  <ha-card style="padding:1em;">
    <h1>Configuration</h1>
    <pre>{{config}}</pre>
    <h2>Status: {{hass.connected ? 'HA Connected' : 'No HA Connection'}}</h2>
    <div>
      <button @click="callService('light', 'toggle', { entity_id: config.entity_id})">
        Toggle Light (call service)
      </button>
    </div>
    <div>
      <button @click="callWebSocket('call_service', 'light', 'toggle', { entity_id: config.entity_id })">
        Toggle Light (call websocket)
      </button>
    </div>
  </ha-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
props: {
  config: Object,
  hass: Object
},
setup(props) {  
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

  return {
      callService,
      callWebSocket
  };
},
});
</script>
