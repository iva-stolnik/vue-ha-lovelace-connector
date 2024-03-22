<template>
  <div>
    <div ref="cardsContainer"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, onUnmounted } from 'vue';
import { devConfig } from '../devConfig';

export default defineComponent({
  props: {
    config: Object,
  },
  setup(props) {
    const cardsContainer = ref(); 
    const hass = ref(null);
    let configIn;

    const getHass = (event) => {
      if(!hass.value || (configIn.cards && cardsContainer.value?.childNodes.length))
      {
        hass.value = event.detail.hass;

        if(configIn.cards && configIn.cards.length !== cardsContainer.value?.childNodes.length)
        {
          const items = configIn.cards;

          items.forEach((cardConfig) => {        
            let tag = cardConfig.type;

            // adjust card type if needed
            if (tag.includes('custom:'))
            {
              // custom:mushroom-light-card --> mushroom-light-card
              tag = tag.replace('custom:', '');
            }
            else
            {
              // light --> hui-light-card
              tag = `hui-${tag}-card`
            }

            const cardElement = document.createElement(tag);
            cardElement.setConfig(cardConfig);
            cardElement.hass = hass.value;

            if(cardsContainer.value)
            {
              cardsContainer.value.appendChild(cardElement);
            }         
          });
        }      
      }
    };
    
    window.addEventListener('custom-event-for-vue-card', getHass);

    onMounted(() => {
      try {
        configIn = JSON.parse(props.config);  
      } catch {
        configIn = devConfig;  
      }
    });

    onUnmounted(() => {
      window.removeEventListener('custom-event-for-vue-card', getHass);
    });

    return {
      cardsContainer,
    };
  },
});
</script>
