import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper } from '@mui/material';

import DataContext from '../data-context';


class DataTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            columnsLoaded: false,
            columns: [],
            rows: []
         }
        // timer to update every 5 seconds
        setInterval( () => this.fetchRemoteItems(), 2500); 
     }
    setColumns(inp) {
        if (this.state.columnsLoaded) return;
        let columns = [{ field: "id"}];
        Object.keys(inp).forEach(key => columns.push({field: key}));
        this.setState({ ...this.state,
            columnsLoaded: true,
            columns: columns,
        });
        // This line is fucking up my program........
        // this.context.updateData(this.props.name, columns);
        // console.log(columns);
      }
    setRows(rowsJSON) {
        // must convert json to rows without headers
        // get row keys
        let columnsKeys = Object.keys(rowsJSON)
        let rowKeys = Object.keys( rowsJSON[columnsKeys[0]] );

        // iterate through all columns
        let rows = []
        rowKeys.forEach( (rowKey, index) => {
                let row = {id: index}
                columnsKeys.forEach( (columnKey) =>{
                        row[columnKey] = rowsJSON[columnKey][rowKey];
                    }
                )
                rows.push(row)
            }
        )
        
        this.setState({...this.state,
            isLoaded: true,
            rows: rows
        });
        // console.log(rows);
     }
    fetchRemoteItems() {
        fetch("http://localhost:5000/game/get_tables/"+this.props.name+'/')
           .then(res => res.json())
           .then((result) => {
                let data = JSON.parse(result);
                this.setColumns(data);
                this.setRows(data);
            }
            ,
            (error) => {
                console.log(error);
            }
           )
        }
    componentDidMount() {
        this.fetchRemoteItems()
    }
    render(){
        return (
                <div style={{ height: 500, width: '100%' }}>
                    <Paper sx={{color: 'white', bgcolor: 'black'}}><b>{this.props.name.toUpperCase()}</b></Paper>
                    <DataGrid
                        rows={this.state.rows}
                        columns={this.state.columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                    />
                </div>
        );
    }
}
DataTable.contextType = DataContext;
export default DataTable