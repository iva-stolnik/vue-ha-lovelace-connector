<template>
  <div>
      <div ref="cardsContainer"></div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, ref } from 'vue';
import { devConfig } from '../devConfig'

export default defineComponent({
props: {
  config: Object,
},
setup(props) {  
  let configIn;
  const hass = ref(null);
  const cardsContainer = ref(); 

  const getHass = (event) => {
        window.removeEventListener('custom-event-for-vue-card', getHass);
        // recieve whole hass object with its api, socket, services, entities...
        hass.value = event.detail.hass

        // create elements from config.cards
        if(configIn.value.cards)
        {
          const items = createNativeCards(configIn.value.cards);
          items.forEach(card => {
            cardsContainer.value.appendChild(card);
          });
        }
    };

    window.addEventListener('custom-event-for-vue-card', getHass);   


    const createNativeCards = (cardsConfig) => {
      return cardsConfig.map((cardConfig) => {
            let tag = cardConfig.type;

            // adjust if needed
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

            return cardElement;
        });
    }  

    onBeforeMount(()=>{
      try {
          configIn = ref(JSON.parse(props.config));  
      }
      catch {
          configIn = ref(devConfig);  
      }
    })
  return {
      cardsContainer
  };
},
});
</script>
