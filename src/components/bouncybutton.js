import * as React from 'react';
import { motion } from "framer-motion"
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';



// {...props} passes all input props into the returning component
export default function Bouncybutton(props) {
    return(
    <motion.button {...props}
      whileHover={{ scale: 1.05 }}
    //   whileTap={{ scale: 0.95 }}
      />
  )
}

export const BouncyFAB = (props) => (
<Fab {...props}
    variant="extended"
    component={motion.div}
    whileHover={{ scale: 1.05 }}
    sx={{width: 200}}
>
  <NavigationIcon sx={{ mr: 1 }} />
  <b>{props.name}</b>
</Fab>
)