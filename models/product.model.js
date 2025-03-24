import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a product name"],
            trim: true, // Elimina espacios en blanco innecesarios
        },
        quantity: {
            type: Number,
            required: [true, "Please enter a quantity"],
            default: 0,
            min: [0, "Quantity cannot be negative"] // Evita cantidades negativas
        },
        price: {
            type: Number,
            required: [true, "Please enter a price"],
            default: 0,
            min: [0, "Price cannot be negative"] // Evita precios negativos
        },
        image: {
            type: String,
            required: false,
            trim: true
        }
    },
    {
        // Indica la fecha y hora en que se creó el documento y la otra marca la fecha de actualizacion
        timestamps: true // createdAt y updatedAt
    }
);

export default mongoose.model("Product", productSchema);