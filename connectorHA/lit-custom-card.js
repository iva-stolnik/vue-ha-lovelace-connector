const LitElement =
    window.LitElement ||
    Object.getPrototypeOf(
        customElements.get("ha-panel-lovelace") || customElements.get("hc-lovelace")
    );
const { html } = LitElement.prototype;

class VueWrapper extends LitElement {
    constructor() {
        super();
        this.hass = null;
        this.config = {};
    }

    setConfig(config) {
        /*
        config comes from card on HA lovelace dashboard
        yaml content for this example: 
            type: custom:lit-custom-card
            cards:
            - type: light
                entity: light.living_room_lights_group
            - type: custom:mushroom-light-card
                entity: light.office_lights_group
                layout: horizontal
                primary_info: none
                secondary_info: none
                use_light_color: true
                show_brightness_control: true
                show_color_control: true
                show_color_temp_control: true
                collapsible_controls: true
                icon: mdi:lightbulb-group
         */
        if (!config) {
            this.errorMessage = "You need to define config";
            console.log(this.errorMessage)
            return;
        }
        this.config = config;
    }

    connectedCallback() {
        super.connectedCallback();
        this.triggerCustomEvent()
    }
    
    async triggerCustomEvent() {
        const event = new CustomEvent('custom-event-for-vue-card', {
            detail: { hass: this.hass },
        });
        
        setTimeout(() => {
            window.dispatchEvent(event);                
        }, 0);
    }

    render() {
        return html`
        <div>
            ${this.config !== undefined ? html`
                <vue-custom-card
                .config=${JSON.stringify(this.config)}
                ></vue-custom-card>
            ` : html``}
        </div>
        `
    }
}

window.customCards = window.customCards || [];

window.customCards.push({
    type: 'lit-custom-card',
    name: 'LitElement Custom Card',
    preview: true,
    description: 'LitElement wrapper for vue.js component',
});

customElements.define("lit-custom-card", VueWrapper);
