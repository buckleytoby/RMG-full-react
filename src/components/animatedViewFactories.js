import { motion } from "framer-motion"
import Paper from '@mui/material/Paper';
import {DND} from './draggableDND'
import Draggable from 'react-draggable';
import React from 'react';
import Box from '@mui/material/Box';

import {get_factories, set_factory_priorities} from '../endpoints'
import DataContext, {AppContext} from '../data-context';


const variants = {
  open: { opacity: 1, y: "000%", zIndex: 10}, // zIndex:0
  closed: { opacity: 0, y: -"200%", zIndex: -1},
}

// helper to sort factories for props.planetName factories

export const AnimatedViewFactories = (props) => {
    const [factories, setFactories] = React.useState([])
    const [isdraggable, setisdraggable] = React.useState(true)
    const {b_render, set_render} = React.useContext(AppContext);

    let getter = () => (
        get_factories()
        .then(res => res.json())
        // .then(result => console.log(result) || JSON.parse(result))
    )
    let setter = (items) => { // items will be a list [[id, {obj}], ... ]
        // iterate through items, grab just the id's, priorities are just index of list
        let out = {}
        items.forEach((elm, indx) => (out[elm[0]] = indx))
        console.log("Factory Setter Items", out)
        set_factory_priorities(out)
        // must rerender the app
        set_render(true)
    }

    const update_state = () => (
        getter()
        .then((data) => {
            // convert data JSON-style object into a list with index as elm[0]
            let arr = Object.entries(data)
            // https://stackoverflow.com/questions/67750930/props-not-updating-in-child-component-after-parent-components-state-is-updated 
            setFactories(factories => [...arr]) // NEVER DIRECTLY CHANGE THE STATE, ELSE THE CHILD LOSES THE REFERENCE 
            // console.log("animatedViewFactories: Updated Factories", arr)
         }
         ,
         (error) => {
             console.log(error);
         })
    )

    // console.log("isdraggable: ", isdraggable)
    return (
            <motion.div
            style={{
            opacity: 0,
            position: 'absolute',
            top: 100,
            left: 100,
            width: 100,
            height: 100,
            color: 'rgba(0, 0, 0, 1)',
            }}
            animate={props.isOpen ? "open" : "closed"}
            variants={variants}
            onAnimationStart={update_state}
            >
                <Draggable
                    disabled={isdraggable ? false : true} handle='.handle'
                >
                <Box style={{width: '500px', backgroundColor: 'rgba(255, 255, 255, 1)'}}>
                    <DND items={factories} getter={getter} setter={setter} headertxt={'Factory Priority: Drag and drop to change'} setDraggable={setisdraggable}
                    />
                </Box>
                </Draggable>
            </motion.div>
    )
}