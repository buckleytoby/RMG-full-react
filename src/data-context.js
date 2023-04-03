import React from 'react';

// can't give it a name because it's default
// const DataContext = ...

// honestly at this point there isn't much difference from just using a global ...
// but at least this way I can easily convert it into a proper context later (using app.js)
let global_data = {actions: ["Make Factory", "Make Shipment", "Make Shipment Schedule"],
                    locations: 'Mercury,Venus,Earth,Mars,Jupiter,Saturn,Uranus,Neptune,Pluto'.split(','),
                    resources: 'Humans, Food, Animal Feed, Logs and lumber, Fabric, Coal, Petroleum, Fuel oil, Plastics, Steel'.split(','),
                    infr: ['Hospital', 'Basic Farmland', 'Modern Farmland', 'Power Plant']
}

// input is the default value
export default React.createContext({
    data: global_data,
    updateData: (key, value) => {global_data[key]=value},
});

export const AppContext = React.createContext('app');