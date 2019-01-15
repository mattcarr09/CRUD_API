//always import library
const {GraphQLObjectType, GraphQLString} = require('graphql');

//this is deconstructing. Same as:
//const GraphQLObjectType = graphql.GraphObjectType
//const GraphQLString = graphql.GraphQLString

// const {GraphQLObjectType, GraphQLString} = graphql;

const PaintingType = new GraphQLObjectType ({
    name: 'Painting',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        url: {type: GraphQLString},
        techique:{type: GraphQLString}
    })
});

module.exports = PaintingType;