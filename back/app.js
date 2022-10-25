const express = require('express');
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const cors = require('cors');

require('dotenv').config(); 

app.use(cors()); 
app.use(express.json());

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,

{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use("/avatars", express.static(path.join(__dirname, "avatars"))); 
app.use("/images", express.static(path.join(__dirname, "images"))); 
app.use("/api/auth", userRoutes);
app.use("/api/auth", postRoutes); 

module.exports = app;
