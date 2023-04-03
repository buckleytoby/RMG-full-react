import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';

const Input = styled(MuiInput)`
  width: 42px;
`;
function calculateValue(value) {
  return 10 ** value;
}  

export default function InputSlider(props) {
  const [value, setValue] = React.useState(Math.log10(props.default));
  const [trueValue, setTrueValue] = React.useState(props.default);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    const newTrueVal = calculateValue(value)
    setTrueValue(newTrueVal)
    props.passToParent(newTrueVal)
  };

  const handleInputChange = (event) => {
    var newTrueVal = event.target.value === '' ? '' : Number(event.target.value)
    setTrueValue(newTrueVal);
    setValue(Math.log10(newTrueVal));
    props.passToParent(newTrueVal)
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <Box fullWidth>
      <Typography id="input-slider" gutterBottom>
        Number of Factories
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={value}
            onChange={handleSliderChange}
            scale={calculateValue}
            min={0}
            max={4}
          />
        </Grid>
        <Grid item>
          <Input
            value={trueValue}
            size="large"
            onChange={handleInputChange}
            onBlur={handleBlur}
            sx={{width: '100px'}}
            inputProps={{
              step: 10,
              min: 0,
              max: 10000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
