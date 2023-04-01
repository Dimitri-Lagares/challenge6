import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { Box} from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function App() {
  const [data, setData] = useState([]);

useEffect(()=>{
  getData()
},[])

const getData = async () => {
  try{
    const {data: response} = await axios.get('http://localhost:3055/catalogo')
    setData(response)
    console.log(data);
  } catch (error) {
    console.log(error.message)
  }
}


return (
<div>

<Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

      <TextField id="outlined-basic" label="Nombre del vehículo" variant="outlined" />
      <TextField id="outlined-basic" label="Año de fabricacion del vehiculo" variant="outlined" />
      <TextField id="outlined-basic" label="valor del vehículo" variant="outlined" />
      <TextField id="outlined-basic" label="cantidad" variant="outlined" />

    </Box>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Nombre del vehículo</StyledTableCell>
            <StyledTableCell align="right">Año de fabricacion del vehiculo</StyledTableCell>
            <StyledTableCell align="right">valor del vehículo</StyledTableCell>
            <StyledTableCell align="right">cantidad</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.vehicleName}</StyledTableCell>
              <StyledTableCell align="right">{row.fabricationYear}</StyledTableCell>
              <StyledTableCell align="right">{row.vehicleValue}</StyledTableCell>
              <StyledTableCell align="right">{row.cantidad}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}