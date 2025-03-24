import express from 'express'
import mongoose from 'mongoose'
import productRoute from './routes/product.route.js'
import path from 'path';

const app = express()
const port = 5000

app.use(express.json()); // para que el servidor pueda procesar request tipo json
app.use('/api/products', productRoute)
app.use(express.static(path.join(process.cwd(), 'public'))); // archivos estaticos

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
mongoose.connect(
  "mongodb+srv://20161295:Q6S8YS8EifkVosUa@userback.ozqys.mongodb.net/Node-API?retryWrites=true&w=majority&appName=UserBack"  
).then(() => {
  console.log("Connected to database")
}).catch(() => {
  console.log("Connection failed")
})
