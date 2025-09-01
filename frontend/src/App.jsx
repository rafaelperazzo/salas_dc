import { useState,useEffect } from 'react'
import './App.css'
import { createClient } from "@supabase/supabase-js";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

function App() {
  const [salas, getSalas] = useState([])
  const [filtro, setFiltro] = useState("")
  useEffect(() => {
    const fetchSalas = async () => {
      const { data, error } = await supabase.from("salas_2025_2").select("*").ilike('disciplina', `%${filtro}%`)
      if (error) {
        console.error("Error fetching salas:", error)
      } else {
        getSalas(data)
      }
    }
    fetchSalas()
  }, [filtro])

  return (
    <>
      <div>
        <h1>Salas do DC</h1>
        <TextField id="outlined-basic" label="Disciplina" variant="outlined" 
          onChange={
            (e) => {
              setFiltro(e.target.value);
            }
          }
        />
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Turma</TableCell>
                <TableCell align="right">Disciplina</TableCell>
                <TableCell align="right">Departamento</TableCell>
                <TableCell align="right">Horário</TableCell>
                <TableCell align="right">Sala</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salas.map((sala) => (
                <TableRow key={sala.id}>
                  <TableCell component="th" scope="row">
                    {sala.turma}
                  </TableCell>
                  <TableCell align="right">{sala.disciplina}</TableCell>
                  <TableCell align="right">{sala.departamento}</TableCell>
                  <TableCell align="right">{sala.horario}</TableCell>
                  <TableCell align="right">{sala.sala}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <p className="read-the-docs">
        Salas do DC
      </p>
    </>
  )
}

export default App
