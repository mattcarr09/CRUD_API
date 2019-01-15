'use strict';
//establish the requirements
const Hapi = require('hapi');
const mongoose = require('mongoose');
const Painting = require('./models/Painting');
const { graphqlHapi, graphiqlHapi} = require('apollo-server-hapi');
const schema = require('./graphql/schema');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

//create the server with port authentication (socket connection?)
const server = Hapi.server({
    port: 4000,
    host: 'localhost'
});

//here we are creating routes which handle methods
//using handlers
const init = async () => {

    await server.register({
        plugin: graphiqlHapi,
        options:{
            path: '/graphiql',
            graphiqlOptions:{
                endpointURL:'graphql'
            },
            route:{
                cors: true
            }
        },
    });
    
	await server.register({
		plugin: graphqlHapi,
		options: {
			path: '/graphql',
			graphqlOptions: {
				schema
			},
			route: {
				cors: true
			}
		}
	});

await server.register([
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options:{
            info:{
                title:"Paintings API Documentation",
                version: Pack.version
            }
        }
    }
]);
    server.route([
        {
            path: '/',  
            method: 'GET',
            handler: function(req, reply){
                return 'Hello World';
            }
        },
        {
            path: '/api/v1/paintings',
            method: 'GET',
            config:{
                description: 'Returns every painting in the database',
                tags: ['api', 'v1', 'painting']
            },  
            handler: (req, reply) => {
                return Painting.find();
            }
        },
        {
            path:'/api/v1/paintings',
            method:'POST',
            config:{
                description: 'Saving a painting to database',
                tags:['save', 'update']
            },
            handler: (req, reply) => {
                const {name, url, techniques} = req.payload;
                const painting = new Painting({
                    name,
                    url,
                    technique
                });
            // console.log(req.payload);  will send back the POST-ed request
            return painting.save();
            }
        }
    ]);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();

//connecting to a database (mongodb hosted through mlab)
mongoose.connect('mongodb://username:password!@dm<mlad string>mlab.com:<string given by m lab>/<database-name>');
mongoose.connection.once('open', () => {
    console.log('connected to database');
})