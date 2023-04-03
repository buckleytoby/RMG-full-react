import React, { useState } from 'react';
import './game.css';
import { DataGrid } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import background from "../data/engr_paper.jpg";
import sun from "../data/sun.svg";
import earth from "../data/earth.svg";
import mars from "../data/mars.svg";
import neptune from "../data/neptune.svg";
import saturn from "../data/saturn.svg";
import { motion, AnimatePresence } from "framer-motion"
import ActionDiv, { PlanetActions } from './actionForm';
import Bouncybutton from './bouncybutton';
import ActionButton from './actionForm';
import {gameRestart} from '../endpoints'
import {BouncyFAB} from './bouncybutton';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';


  
export const Planet = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    return(
    <div
      className="planetDiv"
      style={{...props.style}}
    >
        <Bouncybutton 
        className="planet"
        style={{backgroundImage: `url(${props.name})`}}
        onClick={() => {setIsOpen(isOpen => !isOpen)}}
        />
        {/* make other buttons with opacity variant */}
        <AnimatePresence>
            {isOpen && !props.unclickable ? <PlanetActions planetname={props.planetname} />: undefined}
        </AnimatePresence>
    </div>
    )
}

function Game() {
    // set up states
    const [isOpenViewOPEX, setIsOpenViewOPEX] = useState(false)
    
    const onClickViewOPEX = () => {
        console.log("View OPEX")
        setIsOpenViewOPEX(isOpenViewOPEX => !isOpenViewOPEX)
    }

    // restart button callback
    const handleClickOpen = () => {
        console.log("Restarting")
        gameRestart()
    }

    // backgroundImage: `url(${background})`
    return (
    <React.Fragment>
        <Box sx={{position: 'relative', width: 600, '& > :not(style)': { m: 1 } }}>
            <Fab variant="extended" onClick={handleClickOpen}><b>Restart</b></Fab>

            <Fab variant="extended" onClick={onClickViewOPEX}><b>View OPEX Distribution</b></Fab>
            {/* <ViewOPEX isOpen={isOpenViewOPEX}  /> */}
        </Box>
        <Paper className="game" elevation={5} style={{zIndex: 0, backgroundColor: 'black', }}>
            <Planet planetname='Sun' name={sun} unclickable={true} style={{top: '-250px', left: '250px', height: 500, width:500}}/>
            <Planet planetname='Earth' name={earth} style={{top: '200px', left: '200px'}}/>
            <Planet planetname='Mars' name={mars} style={{top: '400px', left: '750px'}}/>
            <Planet planetname='Neptune' name={neptune} style={{top: '600px', left: '300px'}}/>
            <Planet planetname='Saturn' name={saturn} style={{top: '800px', left: '800px'}}/>

        </Paper>
    </React.Fragment>
    );
}
export default Game