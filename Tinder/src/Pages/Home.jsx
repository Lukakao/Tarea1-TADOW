import React from "react"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Perros from './Components/Perros'

export default function Home(){
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = React.useState(0);

  return(
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h5" fontWeight="bold" align="center">Tinder Dog</Typography>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Perros></Perros>
        </CustomTabPanel>
      </Box>
    </>
  ) 
}

function CustomTabPanel(props) {
  // eslint-disable-next-line react/prop-types
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}