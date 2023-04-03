import logo from './logo.svg';
import './App.css';
import DataTable from './components/table';
import { Grid } from '@mui/material';
import Game from './components/game';
import React from 'react';
import {DataContext, AppContext} from './data-context';
import {ViewFactories} from './components/viewFactories'




function App() {
  const [b_rerender, setb_rerender] = React.useState(false)

  // Similar to componentDidMount and componentDidUpdate:
  React.useEffect(() => {
    // want to sneakily reset the b_rerender variable WITHOUT re-rendering
    // b_rerender = false
    console.log("App Use Effect")
  });

  const updateData = (key, data) => {
    // could make data part of the state, using this.setState instead, and then all renders would be re-called
    data[key] = data
  };


  // Context Provider value has to be of the same form as DataContext default-value
  return (
    <AppContext.Provider
        value={{
          b_rerender: b_rerender,
          setb_rerender: setb_rerender
        }}
    >
    <div className="App" >
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="stretch"
      >
        <Grid item xs={6}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <DataTable name="resources" />
            </Grid>
            <Grid container direction={'row'}>
              <Grid item xs={12}><DataTable name="opexs" /></Grid>
            </Grid>
            <Grid item xs={12}>
              {/* <DataTable name="attributes" /> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid style={{ height: "100%" }}>
            <Game />
          </Grid>
        </Grid>
      </Grid>
      
      
    </div>
    </AppContext.Provider>
  );
}

export default App;
