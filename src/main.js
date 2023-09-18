import { defineCustomElement } from 'vue';
import HACustomCard from './HACustomCard.vue';

const element = defineCustomElement(HACustomCard);

window.customCards = window.customCards || [];

window.customCards.push({
    type: 'vue-custom-card',
    name: 'Vue Custom Card',
    preview: true,
    description: 'A custom card created in Vue 3',
});

customElements.define('vue-custom-card', element);

