import { motion } from "framer-motion"
import Paper from '@mui/material/Paper';
import {DND} from './draggableDND'
import Draggable from 'react-draggable';
import React from 'react';
import Box from '@mui/material/Box';

import {get_factories, set_factory_priorities} from '../endpoints'


const variants = {
  open: { opacity: 1, y: "000%", zIndex: 10}, // zIndex:0
  closed: { opacity: 0, y: -"200%", zIndex: -1},
}

// helper to sort factories for props.planetName factories

export const ViewFactories = (props) => {
    const [factories, setFactories] = React.useState([])

    let getter = () => (
        get_factories()
        .then(res => res.json())
        // .then(result => JSON.parse(result))
    )
    let setter = (items) => { // items will be a list [[id, {obj}], ... ]
        // iterate through items, grab just the id's, priorities are just index of list
        let out = {}
        items.forEach((elm, indx) => (out[elm[0]] = indx))
        console.log("Factory Setter Items", out)
        set_factory_priorities(out)
    }

    React.useEffect(() => {
        getter()
        .then((data) => {
            // convert data JSON-style object into a list with index as elm[0]
            let arr = Object.entries(data)
            // https://stackoverflow.com/questions/67750930/props-not-updating-in-child-component-after-parent-components-state-is-updated 
            setFactories(factories => [...arr]) // NEVER DIRECTLY CHANGE THE STATE, ELSE THE CHILD LOSES THE REFERENCE 
            console.log("ViewFactories: Updated Factories", arr)
         }
         ,
         (error) => {
             console.log(error);
         })
    }, []) // must set dependency as factories to prevent infinite loop!

    return (
        <Box>
            <Box>
                <h2>Factory Priority: Drag and drop to change </h2>
            </Box>
            <DND items={factories} getter={getter} setter={setter}/>
        </Box>
    )
}