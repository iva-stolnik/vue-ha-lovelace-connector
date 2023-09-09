
# Vue 3 Home Assistant Lovelace Custom Component AND Connector

### IMPORTANT NOTESS:
   * development is separated from HA server and vue cli is not required to be installed on HA server
   * /local/ is /config/www/ directory in HA
   * /config/www/ is exposed to lovelace dashboard, it's starting point on HA server
   * Idea is to use LitElement to get access it's setConfig method (lovelace requirement)
        - this retrieves config from lovelace card yaml
        - LitElement is othervise dumb and serves only as a wrapper for vue component that passes config
        - whole state management and comunication can be done in vue component
        - access Home Assistant state from HA api or socket...

#### Clone project anywhere you prefer and run:

```sh
   npm install
   npm run dev
```
* HACustomCard.vue is entry point. 


Build vue custom component:
```sh
   npm run build
```
   * output in dist/ dir will be used in Home Assistant

### Home Aassistant setup:
#### In HA /config/www/ create these 2 files:
   * lit-element-card.js. 
      * this is a wrapper element for vue custom component
      * here c/p content of /connectorHA/lit-custom-card.js and delete connectorHA dir from cloned repository, it wont be used here

   * vue-custom-card.js
      * here c/p output of HACustomCard.vue build from dist/main.js

#### Setup dashboard:
   * open dashboards -> 3 dots in right corner -> resources -> ADD RESOURCES
   * setup paths for both components: 
```sh
   /local/lit-element-card.js // for litElement component
   /local/vue-custom-card.js // for Vue component

   * /local/ is actually /config/www/ in HA
```

   * setup resource type to JS module for both components
   * on your dashboard create new card -> show code editor -> paste following:
   ```sh
      someProp: You did it legend :)
   ```
   * save card -> exit dashboard editor

## THATS IT!
