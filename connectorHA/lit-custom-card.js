const LitElement =
    window.LitElement ||
    Object.getPrototypeOf(
        customElements.get("ha-panel-lovelace") || customElements.get("hc-lovelace")
    );
const { html } = LitElement.prototype;

class VueWrapper extends LitElement {
    constructor() {
        super();
        this.config = {};
    }

    setConfig(config) {
        /*
        config comes from card on HA lovelace dashboard
        yaml content for this examle:
            testProp: someValue
         */
        if (!config.testProp) {
            this.errorMessage = "You need to define testProp";
            console.log(this.errorMessage)
            return;
        }
        this.config = config;
    }

    render() {
        return html`
        <div id="iva-card">
            ${this.config.testProp !== undefined ? html`
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
    name: 'Room Card by Iva',
    preview: true,//todo check if needs to be - was first false
    description: 'LitElement wrapper element for vue.js to be used in Home Assistant',
});

customElements.define("lit-custom-card", VueWrapper);