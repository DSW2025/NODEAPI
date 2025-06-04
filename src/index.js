const express = require("express");
const sequelize = require("./db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});

// rutas
const {
  colaboradorRoute,
  colorRoute,
  estanteRoute,
  marcaRoute,
  rolRoute,
  tallaRoute,
  calzadoRoute,
  calzadoEstanteRoute,
  calzadoColorRoute,
  calzadoTallaRoute,
  colaboradorRolRoute,
  logRoute,
  imagenRoute,
  assistantRoute,
  paymentRoute,
} = require("./routes/index");

// modelos
const {
  Colaborador,
  Color,
  Estante,
  Marca,
  Rol,
  Talla,
  Calzado,
  CalzadoEstante,
  CalzadoColor,
  CalzadoTalla,
  ColaboradorRol,
  Imagen,
} = require("./models/index");

// relaciones
const asignarRelaciones = require("./models/relaciones");

// middlewares
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const { validarToken } = require("./middlewares/validacionToken.middleware");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3000, () => {
  console.log("escuchando en el puerto 3000");
});

// endpoints
app.use("/api/colaboradores", colaboradorRoute);
app.use("/api", logRoute);
app.use("/api/colores", validarToken, colorRoute);
app.use("/api/estantes", validarToken, estanteRoute);
app.use("/api/marcas", validarToken, marcaRoute);
app.use("/api/roles", validarToken, rolRoute); // no sirve
app.use("/api/tallas", validarToken, tallaRoute);
app.use("/api/calzados", validarToken, calzadoRoute);
app.use("/api/relCaEs", validarToken, calzadoEstanteRoute);
app.use("/api/relCaCo", validarToken, calzadoColorRoute);
app.use("/api/relCaTa", validarToken, calzadoTallaRoute);
app.use("/api/relCoRo", validarToken, colaboradorRolRoute); // tampoco sirve
app.use("/api/imagenes", validarToken, imagenRoute);
app.use("/api/assistant", validarToken, assistantRoute);

app.use("/api/create_payment_intent", validarToken, paymentRoute);

sequelize
  .sync({ alter: true })
  .then(async () => {
    await Colaborador.sync();
    await Color.sync();
    await Estante.sync();
    await Marca.sync();
    await Rol.sync();
    await Talla.sync();
    await Calzado.sync();
    await CalzadoEstante.sync();
    await CalzadoColor.sync();
    await CalzadoTalla.sync();
    await ColaboradorRol.sync();
    await Imagen.sync();

    asignarRelaciones();
    console.log("base de datos sincronizada");
  })
  .catch((err) => console.error("error al sincronizar:", err));
