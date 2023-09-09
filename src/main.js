import { defineCustomElement } from 'vue';
import HACustomCard from './HACustomCard.vue';

const element = defineCustomElement(HACustomCard);

window.customCards = window.customCards || [];

window.customCards.push({
    type: 'vue-custom-card',
    name: 'Room Card by Iva S.',
    preview: true,
    description: 'A Vue custom card for Home Assistant',
});

customElements.define('vue-custom-card', element);

