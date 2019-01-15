const graphql = require('graphql');
const PaintingType = require('./PaintingType');
const Painting = require('./../models/Painting');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql;

//this will interact with the server
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        painting:{
            type: PaintingType,
            args: {id:{type: GraphQLString}},
            //parent is thrown to handle nesting within arrays
            //args is for other
            resolve(parent, args){
                //logic for serving data (Will it
                // be a CRUD / REST API implementation?)
                return Painting.findById(args.id)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})