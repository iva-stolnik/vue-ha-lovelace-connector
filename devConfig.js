export const devConfig = {
    type: 'custom:lit-custom-card',
    cards:[
       { 
            type: 'light',
            entity: 'light.living_room_lights_group',
        },
        {
            type: 'custom:mushroom-light-card',
            entity: 'light.office_lights_group',
            layout: 'horizontal',
            primary_info: 'none',
            secondary_info: 'none',
            use_light_color: true,
            show_brightness_control: true,
            show_color_control: true,
            show_color_temp_control: true,
            collapsible_controls: true,
            icon: 'mdi:lightbulb-group'
        }
    ]
    
}

// yaml
/* 
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