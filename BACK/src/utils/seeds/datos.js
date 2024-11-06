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
                email: 'john.doe@example.com',
                userName: 'JohnDoe',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'jane.smith@example.com',
                userName: 'JaneSmith',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'michael.brown@example.com',
                userName: 'MichaelBrown',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'emily.jones@example.com',
                userName: 'EmilyJones',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'david.wilson@example.com',
                userName: 'DavidWilson',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'sarah.miller@example.com',
                userName: 'SarahMiller',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'daniel.moore@example.com',
                userName: 'DanielMoore',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'laura.taylor@example.com',
                userName: 'LauraTaylor',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'james.anderson@example.com',
                userName: 'JamesAnderson',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'emma.thomas@example.com',
                userName: 'EmmaThomas',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'robert.jackson@example.com',
                userName: 'RobertJackson',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'olivia.white@example.com',
                userName: 'OliviaWhite',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'charles.harris@example.com',
                userName: 'CharlesHarris',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'sophia.martin@example.com',
                userName: 'SophiaMartin',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'william.lee@example.com',
                userName: 'WilliamLee',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'mia.walker@example.com',
                userName: 'MiaWalker',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'henry.hall@example.com',
                userName: 'HenryHall',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'isabella.young@example.com',
                userName: 'IsabellaYoung',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'jack.king@example.com',
                userName: 'JackKing',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'amelia.wright@example.com',
                userName: 'AmeliaWright',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'alexander.scott@example.com',
                userName: 'AlexanderScott',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'charlotte.green@example.com',
                userName: 'CharlotteGreen',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'benjamin.adams@example.com',
                userName: 'BenjaminAdams',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'ella.baker@example.com',
                userName: 'EllaBaker',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'lucas.carter@example.com',
                userName: 'LucasCarter',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'grace.mitchell@example.com',
                userName: 'GraceMitchell',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'ethan.perez@example.com',
                userName: 'EthanPerez',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'chloe.roberts@example.com',
                userName: 'ChloeRoberts',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'mason.turner@example.com',
                userName: 'MasonTurner',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            },
            {
                email: 'zoe.phillips@example.com',
                userName: 'ZoePhillips',
                password: bcrypt.hashSync('password123', 10),
                rol: 'user',
                imagenPerfil: '',
                bonos: []
            }
        ]);

        console.log('Usuarios creados:', users);

        // Crear bonos
        const bonos = await Bono.create([
            
                {
                  name: 'Bono 5 usos',
                  type: '5',
                  user: users[0]._id,
                  totalUses: 5,
                  availableUses: 5,
                },
                {
                  name: 'Bono 10 usos',
                  type: '10',
                  user: users[1]._id,
                  totalUses: 10,
                  availableUses: 10,
                },
                {
                  name: 'Bono 20 usos',
                  type: '20',
                  user: users[2]._id,
                  totalUses: 20,
                  availableUses: 20,
                },
                {
                  name: 'Bono 5 usos',
                  type: '5',
                  user: users[3]._id,
                  totalUses: 5,
                  availableUses: 5,
                },
                {
                  name: 'Bono 10 usos',
                  type: '10',
                  user: users[4]._id,
                  totalUses: 10,
                  availableUses: 10,
                },
                {
                  name: 'Bono 20 usos',
                  type: '20',
                  user: users[5]._id,
                  totalUses: 20,
                  availableUses: 20,
                },
                {
                  name: 'Bono 5 usos',
                  type: '5',
                  user: users[6]._id,
                  totalUses: 5,
                  availableUses: 5,
                },
                {
                  name: 'Bono 10 usos',
                  type: '10',
                  user: users[7]._id,
                  totalUses: 10,
                  availableUses: 10,
                },
                {
                  name: 'Bono 20 usos',
                  type: '20',
                  user: users[8]._id,
                  totalUses: 20,
                  availableUses: 20,
                },
                {
                  name: 'Bono 5 usos',
                  type: '5',
                  user: users[9]._id,
                  totalUses: 5,
                  availableUses: 5,
                },
                {
                  name: 'Bono 10 usos',
                  type: '10',
                  user: users[10]._id,
                  totalUses: 10,
                  availableUses: 10,
                },
                {
                  name: 'Bono 20 usos',
                  type: '20',
                  user: users[11]._id,
                  totalUses: 20,
                  availableUses: 20,
                },
                {
                  name: 'Bono 5 usos',
                  type: '5',
                  user: users[12]._id,
                  totalUses: 5,
                  availableUses: 5,
                },
                {
                  name: 'Bono 10 usos',
                  type: '10',
                  user: users[13]._id,
                  totalUses: 10,
                  availableUses: 10,
                },
                {
                  name: 'Bono 20 usos',
                  type: '20',
                  user: users[14]._id,
                  totalUses: 20,
                  availableUses: 20,
                },
                {
                  name: 'Bono 5 usos',
                  type: '5',
                  user: users[15]._id,
                  totalUses: 5,
                  availableUses: 5,
                },
                {
                  name: 'Bono 10 usos',
                  type: '10',
                  user: users[16]._id,
                  totalUses: 10,
                  availableUses: 10,
                },
                {
                  name: 'Bono 20 usos',
                  type: '20',
                  user: users[17]._id,
                  totalUses: 20,
                  availableUses: 20,
                },
                {
                  name: 'Bono 5 usos',
                  type: '5',
                  user: users[18]._id,
                  totalUses: 5,
                  availableUses: 5,
                },
                {
                  name: 'Bono 10 usos',
                  type: '10',
                  user: users[19]._id,
                  totalUses: 10,
                  availableUses: 10,
                },
                {
                  name: 'Bono 20 usos',
                  type: '20',
                  user: users[20]._id,
                  totalUses: 20,
                  availableUses: 20,
                },
                {
                  name: 'Bono 5 usos',
                  type: '5',
                  user: users[21]._id,
                  totalUses: 5,
                  availableUses: 5,
                },
                {
                  name: 'Bono 10 usos',
                  type: '10',
                  user: users[22]._id,
                  totalUses: 10,
                  availableUses: 10,
                },
                {
                  name: 'Bono 20 usos',
                  type: '20',
                  user: users[23]._id,
                  totalUses: 20,
                  availableUses: 20,
                },
                {
                  name: 'Bono 5 usos',
                  type: '5',
                  user: users[24]._id,
                  totalUses: 5,
                  availableUses: 5,
                }
              
        ]);

        console.log('Bonos creados:', bonos);

        
        // Asocia los bonos a los usuarios
        for (const bono of bonos) {
            await User.findByIdAndUpdate(bono.user, { $push: { bonos: bono._id } });
        }

        console.log('Usuarios actualizados con bonos');

        // Crear eventos
    const eventos = await Evento.create([
            {
                name: 'Entreno Funcional',
                description: 'Entreno Funcional - tren inferior',
                date: new Date(),
                hour: '12:30',
                capacity: 8,
                bookins: []
            },
            {
                name: 'Entreno Funcional - Senior',
                description: 'Entreno Funcional - tren superior',
                date: new Date(),
                hour: '10:30',
                capacity: 8,
                bookins: []
            },
            {
                name: 'Yoga para principiantes',
                description: 'Clase de yoga para principiantes',
                date: new Date(),
                hour: '09:00',
                capacity: 15,
                bookins: []
            },
            {
                name: 'Pilates avanzado',
                description: 'Clase de pilates para nivel avanzado',
                date: new Date(),
                hour: '11:00',
                capacity: 10,
                bookins: []
            },
            {
                name: 'Zumba',
                description: 'Clase de zumba para todos los niveles',
                date: new Date(),
                hour: '18:00',
                capacity: 20,
                bookins: []
            },
            {
                name: 'Spinning',
                description: 'Clase de spinning de alta intensidad',
                date: new Date(),
                hour: '19:00',
                capacity: 12,
                bookins: []
            },
            {
                name: 'Boxeo',
                description: 'Clase de boxeo para principiantes',
                date: new Date(),
                hour: '17:00',
                capacity: 10,
                bookins: []
            },
            {
                name: 'CrossFit',
                description: 'Entrenamiento de CrossFit para todos los niveles',
                date: new Date(),
                hour: '16:00',
                capacity: 15,
                bookins: []
            },
            {
                name: 'HIIT',
                description: 'Entrenamiento de intervalos de alta intensidad',
                date: new Date(),
                hour: '07:00',
                capacity: 10,
                bookins: []
            },
            {
                name: 'Meditación',
                description: 'Sesión de meditación guiada',
                date: new Date(),
                hour: '08:00',
                capacity: 20,
                bookins: []
            },
            {
                name: 'Tai Chi',
                description: 'Clase de Tai Chi para todos los niveles',
                date: new Date(),
                hour: '14:00',
                capacity: 15,
                bookins: []
            },
            {
                name: 'Entreno Funcional - Avanzado',
                description: 'Entreno Funcional - nivel avanzado',
                date: new Date(),
                hour: '13:00',
                capacity: 8,
                bookins: []
            },
            {
                name: 'Ballet Fit',
                description: 'Clase de Ballet Fit para todos los niveles',
                date: new Date(),
                hour: '15:00',
                capacity: 12,
                bookins: []
            },
            {
                name: 'Aqua Gym',
                description: 'Clase de Aqua Gym en la piscina',
                date: new Date(),
                hour: '10:00',
                capacity: 20,
                bookins: []
            },
            {
                name: 'Entreno Funcional - Intermedio',
                description: 'Entreno Funcional - nivel intermedio',
                date: new Date(),
                hour: '11:30',
                capacity: 8,
                bookins: []
            },
            {
                name: 'Kickboxing',
                description: 'Clase de kickboxing para todos los niveles',
                date: new Date(),
                hour: '18:30',
                capacity: 10,
                bookins: []
            },
            {
                name: 'Entreno Funcional - Cardio',
                description: 'Entreno Funcional - enfoque en cardio',
                date: new Date(),
                hour: '12:00',
                capacity: 8,
                bookins: []
            },
            {
                name: 'Entreno Funcional - Fuerza',
                description: 'Entreno Funcional - enfoque en fuerza',
                date: new Date(),
                hour: '13:30',
                capacity: 8,
                bookins: []
            },
            {
                name: 'Entreno Funcional - Resistencia',
                description: 'Entreno Funcional - enfoque en resistencia',
                date: new Date(),
                hour: '14:30',
                capacity: 8,
                bookins: []
            },
            {
                name: 'Entreno Funcional - Flexibilidad',
                description: 'Entreno Funcional - enfoque en flexibilidad',
                date: new Date(),
                hour: '15:30',
                capacity: 8,
                bookins: []
            },
            {
                name: 'Entreno Funcional - Movilidad',
                description: 'Entreno Funcional - enfoque en movilidad',
                date: new Date(),
                hour: '16:30',
                capacity: 8,
                bookins: []
            },
            {
                name: 'Entreno Funcional - Equilibrio',
                description: 'Entreno Funcional - enfoque en equilibrio',
                date: new Date(),
                hour: '17:30',
                capacity: 8,
                bookins: []
            },
            {
                name: 'Entreno Funcional - Potencia',
                description: 'Entreno Funcional - enfoque en potencia',
                date: new Date(),
                hour: '18:30',
                capacity: 8,
                bookins: []
            },
            {
                name: 'Entreno Funcional - Agilidad',
                description: 'Entreno Funcional - enfoque en agilidad',
                date: new Date(),
                hour: '19:30',
                capacity: 8,
                bookins: []
            },
            {
                name: 'Entreno Funcional - Velocidad',
                description: 'Entreno Funcional - enfoque en velocidad',
                date: new Date(),
                hour: '20:30',
                capacity: 8,
                bookins: []
            },
            {
                name: 'Entreno Funcional - Coordinación',
                description: 'Entreno Funcional - enfoque en coordinación',
                date: new Date(),
                hour: '21:30',
                capacity: 8,
                bookins: []
            },
            {
                name: 'Entreno Funcional - Recuperación',
                description: 'Entreno Funcional - enfoque en recuperación',
                date: new Date(),
                hour: '22:30',
                capacity: 8,
                bookins: []
            },
            {
                name: 'Entreno Funcional - Balance',
                description: 'Entreno Funcional - enfoque en balance',
                date: new Date(),
                hour: '23:30',
                capacity: 8,
                bookins: []
            },
            {
                name: 'Entreno Funcional - Core',
                description: 'Entreno Funcional - enfoque en core',
                date: new Date(),
                hour: '06:30',
                capacity: 8,
                bookins: []
            },
            {
                name: 'Entreno Funcional - HIIT',
                description: 'Entreno Funcional - enfoque en HIIT',
                date: new Date(),
                hour: '07:30',
                capacity: 8,
                bookins: []
            }
              
        ]);

        console.log('Eventos creados:', eventos);

        // // Crear reservas
        // const reservas = await Reserva.create([
        //     {
        //         fecha: new Date(),
        //         bono: bonos[0]._id,
        //         // Otros campos de la reserva
        //     },
        //     {
        //         fecha: new Date(),
        //         bono: bonos[1]._id,
        //         // Otros campos de la reserva
        //     },
        // ]);

        // console.log('Reservas creadas:', reservas);

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
