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
        <div>
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
    name: 'LitElement Custom Card',
    preview: true,
    description: 'LitElement wrapper for vue.js component',
});

customElements.define("lit-custom-card", VueWrapper);
