const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/userdb',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.then(()=>console.log('Conexión a la base de datos establecida'))
.catch(err => console.log('Error con db', err));
