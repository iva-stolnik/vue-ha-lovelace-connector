import { defineCustomElement } from 'vue';
import MyApp from './App.vue';

if (!customElements.get('vue-custom-card-ce')) {
    const VueCustomElement = defineCustomElement(MyApp);
    customElements.define('vue-custom-card-ce', VueCustomElement);
}

class VueCustomCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.vueElement = null;
        this.config = {};
    }

    set hass(hass) {
        if (this.vueElement) {
            this.vueElement.hass = hass;
        }
    }

    setConfig(config) {
        if (!config) {
            return;
        }

        this.config = config;
        if (this.vueElement) {
            this.vueElement.config = this.config;
        }
    }

    createVueApp() {
        this.vueElement = document.createElement('vue-custom-card-ce');
        this.shadowRoot.appendChild(this.vueElement);
        this.vueElement.config = this.config;
    }

    connectedCallback() {
        if (!this.vueElement) {
            this.createVueApp();
        }
    }

    disconnectedCallback() {
        if (this.vueElement) {
            this.shadowRoot.removeChild(this.vueElement);
            this.vueElement = null;
        }
    }
}


window.customCards = window.customCards || [];

if (!window.customCards.some(card => card.type === 'vue-custom-card')) {
    window.customCards.push({
        type: 'vue-custom-card',
        name: 'Vue Custom Card',
        preview: true,
        description: 'A custom card created in Vue 3',
    });
}

if (!customElements.get('vue-custom-card')) {    
    customElements.define('vue-custom-card', VueCustomCard);
}
