import {
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQueryDetalle } from "../../Queries/queryPerro";
import { LoremIpsum } from "lorem-ipsum";
import '../../App.css'
  
export default function Perros() {
  const [perros, setPerros] = useState([]);
  const [aceptados, setAceptados] = useState([]);
  const [rechazados, setRechazados] = useState([]);
  const {data: dog, isLoading: cargando, isSuccess, isError } = useQueryDetalle();

  const toggleHidden = (index) => {
    if(aceptados[index].hidden===true){
      if(aceptados.every(item => item.hidden === true) && rechazados.every(item => item.hidden === true)) {
        setAceptados((clon) => {
          const updatedAceptados = [...clon];
          updatedAceptados[index].hidden = !updatedAceptados[index].hidden;
          return updatedAceptados; 
        });
      }
    }else{
      setAceptados((clon) => {
        const updatedAceptados = [...clon];
        updatedAceptados[index].hidden = !updatedAceptados[index].hidden;
        return updatedAceptados; 
      });
    }
  }

  const toggleHidden2 = (index) => {
    if(rechazados[index].hidden===true){
      if(rechazados.every(item => item.hidden === true) && aceptados.every(item => item.hidden === true)) {
        setRechazados((clon) => {
          const updatedRechazados = [...clon];
          updatedRechazados[index].hidden = !updatedRechazados[index].hidden;
          return updatedRechazados; 
        });
      }
    }else{
      setRechazados((clon) => {
        const updatedRechazados = [...clon];
        updatedRechazados[index].hidden = !updatedRechazados[index].hidden;
        return updatedRechazados; 
      });
    }
  }

  const lorem = new LoremIpsum({
    wordsPerSentence: {
      max: 6,
      min: 3
    }
  });

  const [isCargando, setCargando] = useState(true);
  const [isBotonDisabled, setIsBotonDisabled] = useState(true);

  function handleImageLoad(){
    setCargando(false);
    setIsBotonDisabled(false);
  };

  function handleImageLoading() {
      setCargando(true);
      setIsBotonDisabled(true);
    };

  useEffect(()=>{
    isSuccess && setPerros(dog.message.map((url)=>({url, name: lorem.generateWords(1), descripcion: lorem.generateSentences(3), hidden: true})));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isSuccess, dog]);
  
  useEffect(()=>{
    isError&&console.log("error");
  },[isError]);

  function Aceptar(valor){
    if (!aceptados.includes(valor)) {
      setAceptados(aceptados => [valor, ...aceptados]);
      setRechazados(rechazados.filter((item) => item !== valor));
      setPerros(perros.filter((item) => item !== valor));
    }
  }

  function Rechazar(valor){
    if (!rechazados.includes(valor)) {
      setRechazados((rechazados) => [valor, ...rechazados]);
      setAceptados(aceptados.filter((item)=> item !== valor));
      setPerros(perros.filter((item) => item !== valor));
    }
  }
  
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Typography variant="h5" fontWeight="bold" align="center">Perro Candidato</Typography >
          <div style={{ display: "flex", justifyContent: "center" }}>
          <List>
            {perros.slice(0,1).map((item, index)=>(
              <>
              <Card key={index} sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{
                  height: isCargando? 0:240,
                  width: 345
                }}
                component="img"
                image={item.url}
                onLoad={handleImageLoad} 
                />
                {isCargando?
                <>
                <div style={{ display: "flex", justifyContent: "center", height:'240px'}}>
                  <CircularProgress size={'200px'}/>
                </div>
                <div class="barra-loop-nombre"/>
                <div class="barra-loop-desc"/>
                <div class="barra-loop-desc"/>
                </>
                :
                <>
                  <Typography variant="h5" fontWeight="bold" align="center">{item.name}</Typography>
                  <ListItemText primary={item.descripcion}/>
                </>
                }
                  <>
                  <Button
                    variant="outlined"
                    onClick={() => { Aceptar(item); handleImageLoading();}}
                    disabled={isBotonDisabled}
                    style={{ margin: '10px', marginLeft:'45px' }}
                  >Aceptar
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => { Rechazar(item); handleImageLoading();}}
                    disabled={isBotonDisabled}
                    style={{ margin: '10px' }}
                  >Rechazar
                  </Button>
                </>
              </Card>
            </> 
            ))}
          </List>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Typography variant="h5" fontWeight="bold" align="center">Aceptados</Typography >
          <div style={{ display: "flex", justifyContent: "center" }}>
          <List>
            {aceptados.map((item, index) => (
              <>
                <ListItem disablePadding key={index}>
                <Card key={index} sx={{ maxWidth: 345 }}>

                  <CardMedia 
                    sx={{height: 240, width: 345}}
                    component="img" 
                    image={item.url}
                  />

                  <Typography variant="h5" fontWeight="bold" align="center">{item.name}</Typography>
                  
                  <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button 
                    onClick={()=> toggleHidden(index)} 
                    size="small"
                    style={{ margin: '10px'}}
                  >Mostrar Descripcion
                  </Button>
                  </div>
                  
                  <ListItemText primary={item.descripcion} hidden={item.hidden}/>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="outlined"
                    onClick={() => Rechazar(item)}
                    style={{ margin: '10px'}}
                  >Cambie de opinion
                  </Button>
                  </div>

                </Card>
                </ListItem>
                <Divider></Divider>
              </>
            ))}
          </List>
          </div>
        </Grid>
  
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Typography variant="h5" fontWeight="bold" align="center">Rechazados</Typography >
          <div style={{ display: "flex", justifyContent: "center" }}>
          <List>
            {rechazados.map((item, index) => (
              <>
                <ListItem disablePadding key={index}>

                <Card key={index} sx={{ maxWidth: 345 }}>

                  <CardMedia 
                    sx={{height: 240, width: 345}}
                    component="img" 
                    image={item.url}
                  />

                  <Typography variant="h5" fontWeight="bold" align="center">{item.name}</Typography >

                  <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button 
                    onClick={()=> toggleHidden2(index)} 
                    size="small"
                    style={{ margin: '10px'}}
                  >Mostrar Descripcion
                  </Button>
                  </div>

                  <ListItemText primary={item.descripcion} hidden={item.hidden}/>

                  <div style={{ display: "flex", justifyContent: "center" }}>                  
                  <Button
                    variant="outlined"
                    onClick={() => Aceptar(item)}
                    style={{ margin: '10px'}}
                  >Cambie de opinion
                  </Button>
                  </div>

                </Card>
                </ListItem>
                <Divider></Divider>
              </>
            ))}
          </List>
          </div>
        </Grid>
      </Grid>
    </>
  );

}
  