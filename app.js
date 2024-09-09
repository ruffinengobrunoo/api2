// servidor

const express = require('express')
const app = express();
const fs = require('fs') // File System: permite trabajar con otros archivos; viene incluido en node (no se instala)
const port = 3000;

// middleware (siempre arriba, antes de las peticiones)
app.use(express.json())
app.use(express.urlencoded({extended:false})) 

app.listen(port, () => {
    console.log(`corriendo en puerto ${port}`)
})


// funcion para leer los datos del archivo .json: pide los datos de la cadena json, los pasa a un objeto de js (de ser posible) y los retorna

const leerDatos = () =>{
    try{ //intenta buscar la cadena json
    const datos = fs.readFileSync('./data/datos.json');
    return JSON.parse(datos); // el metodo json.parse convierte una cadena json en un objeto js
    // console.log(JSON.parse(datos)) prueba de funcionamiento
    }catch{ //si falla, muestra el error
        console.log(error)
    }
}
// leerDatos(); prueba de funcionamiento


// funcion para escribir en el archivo json: pide el objeto, lo pasa a json y edita el archivo
const escribirDatos = (datos) =>{
    try{
        fs.writeFileSync('data/datos.json', JSON.stringify(datos)) //json.stringify convierte el objeto js a un json
    }catch(error){
        console.log(error)
    }
}


// rutas

app.get('/productos', (req, res) =>{

    const datos = leerDatos();
    res.json(datos.productos);

})


app.post('/productos', (req, res) =>{

    const datos = leerDatos();
    
    console.log(datos.productos.length)
    nuevoProd = {id : datos.productos.length + 1, ...req.body} // ... se llama spread
    // genera un id y le agrega una copia en req.body

    datos.productos.push(nuevoProd)
    escribirDatos(datos);
    // sube el producto 
    res.json({
              "mensaje": 'nuevo producto agregado',
              "producto": nuevoProd})
})


app.get('/productos/:id', (req, res) =>{

    const datos = leerDatos();

    console.log(req.params.id)

   const prodEncontrado = datos.productos.find((p) => p.id==req.params.id)
    if(!prodEncontrado){
      return  res.status(404).json('no se encuentra el producto')
    }
    res.json({
            "mensaje": "producto encontrado",
            "prod": prodEncontrado})
})



app.put('/productos/:id', (req, res) =>{

    

})


app.delete('/productos/:id', (req, res) =>{
    console.log(req.params.id)
    console.log(req.body)

    res.send('producto eliminado')
})
