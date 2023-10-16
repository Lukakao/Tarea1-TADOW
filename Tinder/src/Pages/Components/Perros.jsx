import {
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
  } from "@mui/material";
  import axios from "axios";
  import { useEffect, useState } from "react";
  
  export default function Pokemon() {
    const [pokemones, setPokemones] = useState([]);
    const [listaAux, setListaAux] = useState([]);
    const [listaSeleccionados, setListaSeleccionados] = useState([]);
  
    function cargarListado() {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((response) => {
          setPokemones(response.data.results);
        });
    }
  
    useEffect(() => {
      cargarListado();
    }, []);

    function Aceptar(valor){
        if (!listaAux.includes(valor)) {
            setListaAux(listaAux => [...listaAux, valor]);
            setPokemones(pokemones.filter((item) => item !== valor));
            setListaSeleccionados(listaSeleccionados.filter(item => item !== valor));
        }
    }

    function Rechazar(valor){
        if (!listaSeleccionados.includes(valor)) {
            setListaSeleccionados((listaSeleccionados) => [...listaSeleccionados,valor]);
            setPokemones(pokemones.filter((item) => item !== valor));
            setListaAux(listaAux.filter((item)=> item !== valor));
        }
    }
  
  
    console.log(listaSeleccionados);
    return (
      <>
        <Grid container spacing={1}>
          <Grid item md={4} xs={6}>
            <List>
              {pokemones.map((item, index) => (
                <>
                  <ListItem disablePadding key={index}>
                    <ListItemText primary={item.name} />
                    <Button
                      variant="outlined"
                      onClick={() => Aceptar(item)}
                    >Aceptar
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => Rechazar(item)}
                    >Rechazar
                    </Button>
                  </ListItem>
                  <Divider></Divider>
                </>
              ))}
            </List>
          </Grid>
  
          <Grid item md={4} xs={6}>
            <List>
              {listaAux.map((item, index) => (
                <>
                  <ListItem disablePadding key={index}>
                    <ListItemText primary={item.name} />
                    <Button
                      variant="outlined"
                      onClick={() => Rechazar(item)}
                    >Rechazar
                    </Button>
                  </ListItem>
                  <Divider></Divider>
                </>
              ))}
            </List>
          </Grid>
  
          <Grid item md={4} xs={6}>
            <List>
              {listaSeleccionados.map((item, index) => (
                <>
                  <ListItem disablePadding key={index}>
                    <ListItemText primary={item.name} />
                    <Button
                      variant="outlined"
                      onClick={() => Aceptar(item)}
                    >Aceptar
                    </Button>
                  </ListItem>
                  <Divider></Divider>
                </>
              ))}
            </List>
          </Grid>
        </Grid>
      </>
    );
  }
  