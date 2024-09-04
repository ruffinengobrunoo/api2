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
        fs.writeFileSync('.data/datos.json', JSON.stringify(datos)) //json.stringify convierte el objeto js a un json
    }catch{
        console.log(error)
    }
}


// rutas

app.get('/productos', (req, res) =>{

    res.send('listado de productos');

})


app.post('/productos', (req, res) =>{

    res.send('producto agregado')
})


app.get('/productos/:id', (req, res) =>{

    console.log(req.params.id)
    console.log(req.body)

    res.send('producto pedido')
})


app.put('/productos/:id', (req, res) =>{
    console.log(req.params.id)
    console.log(req.body)

    res.send('producto editado')
})


app.delete('/productos/:id', (req, res) =>{
    console.log(req.params.id)
    console.log(req.body)

    res.send('producto eliminado')
})
