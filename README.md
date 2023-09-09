
# Vue 3 Home Assistant Lovelace custom component 

### IMPORTANT NOTESS:
   * development is separated from HA server and vue cli is not required to be installed on server
   * /local/ is /config/www/ directory in HA
   * /config/www/ is exposed to lovelace dashboard, it's starting point on HA server

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
   * vue-custom-card.js
      * here c/p output of HACustomCard.vue build from dist/main.js

#### In HA /config/www/ create these 2 files:
   * open dashboards -> 3 dots in right corner -> resources -> ADD RESOURCES
   * setup paths for both components: 
```sh
   /local/lit-element-card.js // for litElement component
   /local/vue-custom-card.js // for Vue component
```

   * setup resource type to JS module for both components
   * on your dashboard create new card -> show code editor and paste:
   ```sh
      someProp: You did it legend :)
   ```
   * save card -> exit dashboard editor
