import express from "express";
import ProductManager from "./ProductManager.js"

const manager= new ProductManager("./Productos.json")

const app= express()


app.get("/products", async(req, res)=>{
    let limite = req.query.limite
    const productLimitados = await manager.getProducts()

    const prueba = productLimitados.filter(producto => producto.id <= Number(limite))
  
    if(!limite) res.send(await manager.getProducts())
    else{
         res.send(prueba)
    }
})

app.get('/products/:id', async (req,res)=>{
    const id = req.params.id

    res.send(await manager.getProductById(Number(id)))
})

// express escucha atento en puerto 8080
app.listen(8080, ()=>console.log("server up"))

