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
import { Box, Button,Alert, Stack} from '@mui/material';

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

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showSuccessAlert2, setShowSuccessAlert2] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [showWarningAlert2, setShowWarningAlert2] = useState(false);
  const [buttonChanger, setButtonChanger] = useState(true);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [VehicleName, setVehicleName] = useState("");
  const [VehicleFabricationYear, setVehicleFabricationYear] = useState("");
  const [VehicleValue, setVehicleValue] = useState("");
  const [Almount, setAlmount] = useState("");
  
  const onVehicleNameChange = e => setVehicleName(e.target.value)
  const onVehicleFabricationYearChange = e => setVehicleFabricationYear(e.target.value)
  const onVehicleValueChange = e => setVehicleValue(e.target.value)
  const onAlmountChange = e => setAlmount(e.target.value)
  
  useEffect(()=>{
    getData()
  },[])

const buttonCancel = () =>{
  setVehicleName("")
  setVehicleFabricationYear("")
  setVehicleValue("")
  setAlmount("")
  setShowSuccessAlert(false)
  setShowWarningAlert(false)
  setShowWarningAlert2(false)
  setButtonChanger(true)
  setShowSuccessAlert2(false)
}

const buttonSave = () =>{
   if (VehicleName || VehicleFabricationYear || VehicleValue || Almount === ""){
    setShowWarningAlert(true)
    showWarningAlertTimeOut()
   }else{

    axios.post('http://localhost:3055/agregar', {
      vehicleName:VehicleName,
      vehicleFabricationYear:VehicleFabricationYear,
      vehicleValue:VehicleValue,
      almount:Almount,
    }).then((response) => {
      console.log(response)
      setVehicleName("")
      setVehicleFabricationYear("")
      setVehicleValue("")
      setAlmount("")
      setShowSuccessAlert(true)
      showSuccessAlertTimeOut()
      getData()
    }).catch((error) => {
      console.log(error)
      setShowWarningAlert2(true)
      showWarningAlert2TimeOut()
    })
  }
 }

const getData = async () => {
  try{
    const {data: response} = await axios.get('http://localhost:3055/catalogo')
    setData(response)
    console.log(data);
  } catch (error) {
    console.log(error.message)
  }
}

const showData = ((getTableData) => {
  setButtonChanger(false)
  setId(getTableData.id)
  setVehicleName(getTableData.vehicleName)
  setVehicleFabricationYear(getTableData.vehicleFabricationYear)
  setVehicleValue(getTableData.vehicleValue)
  setAlmount(getTableData.almount)
})

const buttonUpdate = (() => {
  axios.put(`http://localhost:3055/actualizar/${id}`, {
    vehicleName:VehicleName,
    vehicleFabricationYear:VehicleFabricationYear,
    vehicleValue:VehicleValue,
    almount:Almount,
  }).then(()=>{
    getData()
    setId("")
    setVehicleName("")
    setVehicleFabricationYear("")
    setVehicleValue("")
    setAlmount("")
    setShowSuccessAlert2(true)
    showSuccessAlert2TimeOut()
  })

})

const showWarningAlertTimeOut = () => {
  setTimeout(() => {
    setShowWarningAlert(false);
  }, 3000);
}

const showWarningAlert2TimeOut = () => {
  setTimeout(() => {
    setShowWarningAlert2(false);
  }, 3000);
}

const showSuccessAlertTimeOut = () => {
  setTimeout(() => {
    setShowSuccessAlert(false);
  }, 3000);
}

const showSuccessAlert2TimeOut = () => {
  setTimeout(() => {
    setShowSuccessAlert2(false);
  }, 3000);
}

return (
<div>

  {showWarningAlert&&  <Alert severity="warning">debes de llenar los campos</Alert>}
  {showWarningAlert2 && <Alert severity="warning">ha ocurrido un error, revisa la consola para saber mas</Alert>}
  {showSuccessAlert && <Alert severity="success">Añadido correctamente</Alert>}
  {showSuccessAlert2 && <Alert severity="success">Actualizado correctamente</Alert>}

<Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Nombre del vehículo" variant="outlined" value={VehicleName} onChange={onVehicleNameChange}/>
      <TextField id="outlined-basic" label="Año de fabricacion del vehiculo(numeros)" variant="outlined" value={VehicleFabricationYear} onChange={onVehicleFabricationYearChange} type='number'/>
      <TextField id="outlined-basic" label="valor del vehículo(numeros)" variant="outlined" value={VehicleValue} onChange={onVehicleValueChange} type='number'/>
      <TextField id="outlined-basic" label="cantidad(numeros)" variant="outlined" value={Almount} onChange={onAlmountChange} type='number'/>
      
      {buttonChanger && <Button onClick={buttonSave} variant='outlined' color='secondary'>agregar</Button>}
      {!buttonChanger && <Button onClick={buttonUpdate} variant='outlined' color='secondary'>actualizar</Button>}
      <Button onClick={buttonCancel} variant='outlined' color='error'>cancelar</Button>
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
            <StyledTableRow key={row.name} onClick={() => {showData(row)}}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.vehicleName}</StyledTableCell>
              <StyledTableCell align="right">{row.vehicleFabricationYear}</StyledTableCell>
              <StyledTableCell align="right">{row.vehicleValue}</StyledTableCell>
              <StyledTableCell align="right">{row.almount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}