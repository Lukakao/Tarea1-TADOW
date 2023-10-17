import {
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
//import { useBuscarInfoQuery } from "../../Queries/queryList";
import { useQueryDetalle } from "../../Queries/queryPerro";
import { LoremIpsum } from "lorem-ipsum";
  
export default function Perros() {
  const [perros, setPerros] = useState([]);
  const [aceptados, setAceptados] = useState([]);
  const [rechazados, setRechazados] = useState([]);
  //const [params, setParams]= useState({limit: 10 , page: 1})
  //const [num, setNum]=useState({valor: ''})
  //const {data: dog, isLoading: cargando, isSuccess, isError }  = useBuscarInfoQuery(params); 
  const {data: dog, isLoading: cargando, isSuccess, isError } = useQueryDetalle();

  const lorem = new LoremIpsum({
    wordsPerSentence: {
      max: 6,
      min: 3
    }
  });

  useEffect(()=>{
    isSuccess && setPerros(dog.message.map((url)=>({url, name: lorem.generateWords(1)})));
  },[isSuccess, dog]);
  
  useEffect(()=>{
    isError&&console.log("error");
  },[isError]);

  function Aceptar(valor){
    if (!aceptados.includes(valor)) {
      setAceptados(aceptados => [...aceptados, valor]);
      setRechazados(rechazados.filter((item) => item !== valor));
      setPerros(perros.filter((item) => item !== valor));
      console.log(aceptados);
    }
  }

  function Rechazar(valor){
    if (!rechazados.includes(valor)) {
      setRechazados((rechazados) => [...rechazados,valor]);
      setAceptados(aceptados.filter((item)=> item !== valor));
      setPerros(perros.filter((item) => item !== valor));
      console.log(rechazados);
    }
  }
  
  console.log(perros);
  return (
    <>
      <Grid container spacing={1}>
        <Grid item md={4} xs={6}>
          <List>
            {perros.map((item, index)=>(
              <>
              {cargando &&<LinearProgress/>}
              <Card key={index} sx={{ maxWidth: 345 }}>
                <CardMedia sx={{height: 240}} component="img" image={item.url} />
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
              </Card>
            </>
            ))}
            
          </List>
        </Grid>
  
          <Grid item md={4} xs={6}>
            <List>
              {aceptados.map((item, index) => (
                <>
                  <ListItem disablePadding key={index}>
                  <Card key={index} sx={{ maxWidth: 345 }}>
                    <CardMedia sx={{height: 240}} component="img" image={item.url} />
                    <ListItemText primary={item.name} />
                    <Button
                      variant="outlined"
                      onClick={() => Rechazar(item)}
                    >Rechazar
                    </Button>
                  </Card>
                  </ListItem>
                  <Divider></Divider>
                </>
              ))}
            </List>
          </Grid>
  
          <Grid item md={4} xs={6}>
            <List>
              {rechazados.map((item, index) => (
                <>
                  <ListItem disablePadding key={index}>
                  <Card key={index} sx={{ maxWidth: 345 }}>
                    <CardMedia sx={{height: 240}} component="img" image={item.url} />
                    <ListItemText primary={item.name} />
                    <Button
                      variant="outlined"
                      onClick={() => Aceptar(item)}
                    >Aceptar
                    </Button>
                  </Card>
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
  