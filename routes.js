const express = require('express');
const {Router}= express;

const router = Router();

//--------------------------------------Productos--------------------------------------------

const productos=[];

let admin = false;

const fecha = ()=>{
    let fecha= new Date();
    let dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    let numeroDia = fecha.getDay();
    let nombreDia = dias[numeroDia];
    let horas= fecha.getHours();
    let minutos= fecha.getMinutes();
    let segundos= fecha.getSeconds();
    let fechaActual = `${nombreDia} ${horas}:${minutos}:${segundos}`;

    return fechaActual
}

router.get('/productos', (req, res) => {
    res.send(productos);
})

router.get('/productos/:id', (req, res) => {
    const id = req.params.id;
    const producto = productos.find(producto => producto.id == id);
    res.send(producto);

});

router.post('/productos', (req, res) => {

    admin = true

    if(admin){
        const randomId = Math.floor(Math.random() * 10000);
        productos.includes(randomId) ? randomId++ : randomId;
    
        const producto = req.body;
        const productoConId = {
            ...producto,
            timestamp: fecha(),
            id: randomId
        };
        productos.push(productoConId);
        res.send('Producto agregado')}
       
        else{
            res.send('No tienes permiso para acceder a esta información')}
        
    admin = false;

    })



router.put('/productos/:id', (req, res) => {
    admin = true;
    if(admin){
        const id = req.params.id;
        const randomId = Math.floor(Math.random() * 10000);
        productos.includes(randomId) ? randomId++ : randomId;
       
        const producto = req.body;
        const productoConId = {
            ...producto,
            timestamp: fecha(),
            id: randomId
        };
    
        const productoAReemplazar = productos.find(producto => producto.id == id);
    
        productos.splice(productoAReemplazar, 1, productoConId);
        res.send(`Se ha actualizado el producto con id ${id} exitosamente`);}
        else{
            res.send('No tienes permiso para acceder a esta información')};

    admin = false;
    });



router.delete('/productos/:id', (req, res) => {

    admin = true;
    if(admin){
    const id = req.params.id;
    const producto = productos.find(producto => producto.id == id);
    productos.splice(productos.indexOf(producto), 1);
    res.json({message:'Producto eliminado'})}
    else{
        res.send('No tienes permiso para acceder a esta información')};
        
    admin = false;
    });

//----------------------------------Carrito----------------------------------------

let carritos = [];

router.post('/carrito', (req, res) => {

    const carrito=[];
    
    const numRandom = Math.floor(Math.random() * 10000);
    const letraRandom = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    const carritoId= letraRandom+numRandom;
    carrito.push(
        {cartId : carritoId,
        timestamp: fecha(),
        productos: productos}
        );
    
    carritos.push(carrito)

    res.send(`Se creo el carrito con id ${carritoId}`);
    });

router.delete('/carrito/:id', (req,res)=>{
    const carritoId = req.params.id;

    const carritoAEliminar = carritos.find(carrito => carrito.id==carritoId);

    carritoAEliminar.splice(0);

   carritos.splice(productos.indexOf(carritoAEliminar), 1);

   res.send(`Se ha eliminado el carrito con id ${carritoId}`)

});

router.get('/carrito/:id/productos', (req,res)=>{
    const carritoId=req.params.id;

    const carrito = carritos.find(cart=>cart.id==carritoId);

    res.send(carrito);
});

router.post('/carrito/:id/productos', (req,res)=>{
    const carritoId=req.params.id;
    const producto= req.body;
    const carrito = carritos.find(cart => cart.id==carritoId);

    carrito.productos.push(producto);

    res.send(`Producto agregado al carrito con id ${carritoId}`);
})




module.exports=router;