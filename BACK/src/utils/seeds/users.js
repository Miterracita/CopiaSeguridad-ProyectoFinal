const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const User = require('../../api/models/User');
const Bono = require('../../api/models/bono');
const Evento = require('../../api/models/evento');
const Reserva = require('../../api/models/booking'); 
const Booking = require("../../api/models/booking");


// Conexión a la base de datos
const mongoURI = 'mongodb+srv://anadiseny:lJEBorFz0Va4tZcJ@bonobooking.72dzv.mongodb.net/?retryWrites=true&w=majority&appName=BonoBooking';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error conectando a la base de datos', error);
        process.exit(1);
    }
};

// Borra los datos anteriores y reinicia con datos nuevos
const clearData = async () => {
    try {
        await User.deleteMany({});
        await Bono.deleteMany({});
        await Evento.deleteMany({});
        await Booking.deleteMany({});
        console.log('Datos eliminados');
    } catch (error) {
        console.error('Error al eliminar datos', error);
    }
};

// Crear semillas de datos
const seedData = async () => {
    try {
        // Crear usuarios
        const users = await User.create([
            {
                userName: 'admin',
                email: 'admin@example.com',
                password: bcrypt.hashSync('password123', 10), // Hasheado con bcrypt
                rol: 'admin',
                imagenPerfil: '',
            },
            {
                userName: 'john_doe',
                email: 'john.doe@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'jane_smith',
                email: 'jane.smith@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'michael_brown',
                email: 'michael.brown@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'emily_jones',
                email: 'emily.jones@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'daniel_wilson',
                email: 'daniel.wilson@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'sarah_davis',
                email: 'sarah.davis@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'david_martinez',
                email: 'david.martinez@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'laura_garcia',
                email: 'laura.garcia@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'james_rodriguez',
                email: 'james.rodriguez@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'linda_miller',
                email: 'linda.miller@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'robert_moore',
                email: 'robert.moore@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'patricia_taylor',
                email: 'patricia.taylor@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'charles_anderson',
                email: 'charles.anderson@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'barbara_thomas',
                email: 'barbara.thomas@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'steven_jackson',
                email: 'steven.jackson@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'mary_white',
                email: 'mary.white@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'william_harris',
                email: 'william.harris@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'elizabeth_clark',
                email: 'elizabeth.clark@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
            {
                userName: 'joseph_lewis',
                email: 'joseph.lewis@example.com',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
            },
        ]);

        console.log('Usuarios creados:', users);

        // Crear bonos
        const bonos = await Bono.create([
            {
                name: 'Bono 20 usos',
                type: '20',
                user: users[2]._id,  // Relacionando el bono con el usuario
                totalUses: 20,
                availableUses: 0,
            },
            {
              name: 'Bono 10 usos',
              type: '10',
              user: users[0]._id,  // Relacionando el bono con el usuario
              totalUses: 10,
              availableUses: 10,
            },
            {
              name: 'Bono 5 usos',
              type: '5',
              user: users[1]._id,
              totalUses: 5,
              availableUses: 5,
            },
            {
                name: 'Bono 10 usos',
                type: '10',
                user: users[10]._id,
                totalUses: 10,
                availableUses: 0,
            },
            {
                name: 'Bono 10 usos',
                type: '10',
                user: users[10]._id,
                totalUses: 10,
                availableUses: 4,
            },
        ]);

        console.log('Bonos creados:', bonos);

        // Crear eventos
        const eventos = await Evento.create([
            {
                nombre: 'Entreno Funcional',
                descripcion: 'Entreno Funcional - tren superior',
                fecha: new Date(),
                hora:'10:30',
                duracion: 50,
                capacidad:8,
            },
            {
                nombre: 'Entreno Funcional Senior',
                descripcion: 'Entreno Funcional - tren superior',
                fecha: new Date(),
                hora:'11:30',
                duracion: 50,
                capacidad:8,
            },
        ]);

        console.log('Eventos creados:', eventos);

        // Crear reservas
        const reservas = await Reserva.create([
            {
                fecha: new Date(),
                bono: bonos[0]._id,
                // Otros campos de la reserva
            },
            {
                fecha: new Date(),
                bono: bonos[1]._id,
                // Otros campos de la reserva
            },
        ]);

        console.log('Reservas creadas:', reservas);

        process.exit(); // Termina el proceso al final
    } catch (error) {
        console.error('Error creando datos:', error);
        process.exit(1); // Termina con error
    }
};

// Ejecuta las funciones en orden
const runSeed = async () => {
    await connectDB();
    await clearData();
    await seedData();
};

// Llamamos a la función principal
runSeed();
