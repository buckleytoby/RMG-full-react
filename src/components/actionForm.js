import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Bouncybutton, {BouncyFAB} from './bouncybutton';
import './actionForm.css'
import { styled } from '@mui/system';
import Backdrop from '@mui/material/Backdrop';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DataContext, {AppContext} from '../data-context';
import InputSlider from './nb_slider';
import {action_fetch_post} from '../endpoints'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import {AnimatedViewFactories} from './animatedViewFactories'
import {SetOperators} from './SetOperators'



function PaperComponent(props) {
    const nodeRef = React.useRef(null);
    return (
        <Draggable nodeRef={nodeRef}
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
        >
        <Paper {...props} ref={nodeRef}/>
        </Draggable>
    );
}

const Dropdown = (props) => {
    function handleChange(event) {
        props.handleChange(event)
      }

    return <FormControl fullWidth style={props.style}>
                <InputLabel id="demo-simple-select-label">{props.title}</InputLabel>
                <Select
                    name={props.name}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.value}
                    label={props.title}
                    onChange={props.handleChange}
                >
                    {props.choices.map( (element, indx) => <MenuItem key={indx} value={element}>{element}</MenuItem> 
                )}
                </Select>
            </FormControl>
}

const ActionModal = (props) => {
    // get the data context
    const {data, updateData} = React.useContext(DataContext); // updateData({...data, 'more': 'objects'})
    // set up the modal fields & choices
    const modalChoicesDataKey = {Origin: "locations", Type: 'infr'} // these are the keys for the data in data-context.js
    const modalFieldsDefaults = {Origin: props.planetname, Type: data.infr[0]} // props.modalFields
    const modalKeys = Object.keys(modalFieldsDefaults)
    const [modal_states, setModalStates] = React.useState(modalFieldsDefaults);
    const [nb_factories, setNbFactories] = React.useState(1)
    

    const onConfirm = (e) => {
        // console.log(e)
        props.handleClose()
        // pass data to parent
        props.modalconfirmed({...modal_states, nb_factories:nb_factories})
    };
    function passToParent(value){setNbFactories(value)}
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setModalStates((prevState) => {
            return {
              ...prevState,
              [name]: value,
            };
        });
    };      

    return(
        <Dialog
        open={props.open}
        onClose={props.handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        BackdropComponent={
            styled(Backdrop, { name: 'MuiModal', slot: 'Backdrop', overridesResolver: (props, styles) => { return styles.backdrop; }, })
            ({ backgroundColor: 'rgba(0, 0, 0, 0.0)', zIndex: -1, })
        }
        >
        <DialogTitle style={{cursor: 'move' }} id="draggable-dialog-title">{props.name}</DialogTitle>
        <DialogContent>
            <DialogContentText style={{marginBottom: '25px',}} >Fill in the form and press <b>Confirm</b> to carry out the action.</DialogContentText>
            {modalKeys.map( (element, indx) => ( 
                <Dropdown 
                name={element}
                style={{marginBottom: '10px'}} 
                choices={data[modalChoicesDataKey[element]]} 
                key={indx} 
                title={element} 
                value={modal_states[element]} 
                handleChange={handleChange}
                /> ))}
            <InputSlider default={nb_factories} passToParent={passToParent}/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onConfirm}>Confirm</Button>
          <Button onClick={props.handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    )
}

export function ActionButtonAndModal(props) {
    // must be separate function so that I could programmatically make as many as there are actions.
    const {b_render, setb_rerender} = React.useContext(AppContext);

    // need 1 action div per button/modal with separate callbacks
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const modalconfirmed = (values) => {
        console.log(values)
        // TODO: send the request to the server
        var bodyObj = {ActionType: props.name,
                    Fields: values,
        }
        console.log(bodyObj)
        action_fetch_post(bodyObj)
        // re-render
        setb_rerender(true)
    }
    // pass props to the button, not the div
    return (
        <div>
        <BouncyFAB style={{width: '200px', marginTop: '5px'}} {...props} variant="outlined" onClick={handleClickOpen}/>
        <ActionModal name={props.name} open={open} handleClose={handleClose} planetname={props.planetname} modalconfirmed={modalconfirmed}
        />
        </div>
    );
}

export const PlanetActions = (props) => {
    const {data, updateData} = React.useContext(DataContext); // updateData({...data, 'more': 'objects'})
    const [isOpenViewFactories, setIsOpenViewFactories] = React.useState(false)
    const [isOpenSetOperators, setIsOpenSetOperators] = React.useState(false)
    
    // set up open/closes
    const onClick1 = () => {
        // console.log("View Factories")
        setIsOpenViewFactories(isOpenViewFactories => !isOpenViewFactories)
        setIsOpenSetOperators(false)
    }
    const onClick2 = () => {
        // console.log("View Factories")
        setIsOpenViewFactories(false)
        setIsOpenSetOperators(isOpenSetOperators => !isOpenSetOperators)
    }

    return( <div>
            {/* make the actions */}
            {data.actions.map( (value, index) => (
                <ActionButtonAndModal 
                    name={value}
                    key={index}
                    className="action"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    planetname={props.planetname}
                />
            ))}
            
            <Fab style={{zIndex: 10}} variant="extended" onClick={onClick1} ><b>View Factories</b></Fab>
            <AnimatedViewFactories planetname={props.planetname} isOpen={isOpenViewFactories} />

            <Fab style={{zIndex: 10}} variant="extended" onClick={onClick2} ><b>Set Operators</b></Fab>
            <SetOperators planetname={props.planetname} isOpen={isOpenSetOperators} />
            </div>
    )
    }