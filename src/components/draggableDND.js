import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';


// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 10px ${grid}px 10px`,

  // change background colour if dragging
  background: isDragging ? "grey" : "white",

  // styles we need to apply on draggables
  ...draggableStyle,
  top: 'auto !important',
  left: 'auto !important',
});

const getListStyle = isDraggingOver => ({
  background: "lightgrey",
  padding: grid,
  width: 500
});

//   ############################################# DND Class #############################################
export class DND extends Component {
    constructor(props) {
        super(props);
        this.state = {
        items: props.items 
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    onDragEnd(result) {
        // allow parent to be draggable
        this.props.setDraggable(true)
        // dropped outside the list
        if (!result.destination) {
        return;
        }

        const items = reorder(
        this.state.items,
        result.source.index,
        result.destination.index
        );

        this.setState({
        items: items
        });
    }

    onConfirm = (e) => { // only arrow functions have correct access to this, otherwise you have to bind them (like above)
        // console.log(e)
        this.props.setter(this.state.items)
    };

    // https://stackoverflow.com/questions/41233458/react-child-component-not-updating-after-parent-state-change 
    componentWillReceiveProps(nextProps) {
        this.setState({ items: nextProps.items });
    }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    // console.log("DND re-rendering", this.state.items)
    // debugger
    return (
    
      <DragDropContext 
            onDragStart={() => (this.props.setDraggable(false))}
            onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            
            <Paper className="handleDiv"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
            <h2 style={{cursor: 'grab'}} className='handle' >{this.props.headertxt}</h2>
            {/* <div className="handleDiv" style={{cursor: 'grab', padding: "10px"}}></div> */}
              {this.state.items.map((row, index) => (
                <Draggable key={row[0]} draggableId={row[0]} index={index}>
                  {(provided, snapshot) => (
                    <Paper elevation={4}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                    <DragIndicatorIcon />
                    {Object.keys(row[1]).map((elm, indx) => (
                        <TextField key={indx} sx={{margin: '5px', width: '90px'}} disabled defaultValue={row[1][elm]} label={elm} variant="outlined" />
                    ))}
                      {/* {JSON.stringify(row)} */}
                    </Paper>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            <Button autoFocus onClick={this.onConfirm}>Confirm</Button>
            </Paper>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
