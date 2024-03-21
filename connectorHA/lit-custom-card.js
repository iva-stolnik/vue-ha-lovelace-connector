const LitElement =
    window.LitElement ||
    Object.getPrototypeOf(
        customElements.get("ha-panel-lovelace") || customElements.get("hc-lovelace")
    );
const { html } = LitElement.prototype;

class VueWrapper extends LitElement {
    constructor() {
        super();
        // this.initialised = false; // for changed props option in updated()
        this.hass = null;
        this.config = {};
    }

    setConfig(config) {
        /*
        config comes from card on HA lovelace dashboard
        yaml content for this examle:
            testProp: someValue
         */
        if (!config) {
            this.errorMessage = "You need to define config";
            console.log(this.errorMessage)
            return;
        }
        this.config = config;
    }

     updated(/*changedProps*/) {
        // this works only if there are not changed props
        // triggered only once when hass is ready
        this.triggerCustomEvent()

        // this works for changed props
        /* if (!this.initialised && changedProps.has('hass') && this.hass) {
            // The hass object is now available and can be accessed here
            // You can perform actions using this.hass
            this.triggerCustomEvent()
            this.initialised = true
        }*/ 
    }

    async triggerCustomEvent() {
        const event = new CustomEvent('custom-event-for-vue-card', {
            detail: { hass: this.hass },
        });

        setTimeout(() => {
            window.dispatchEvent(event);                
        }, 1000);
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
