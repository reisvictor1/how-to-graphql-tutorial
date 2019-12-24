const { GraphQLServer } = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.favurl.com.br',
    description: 'My favorite URL'
},{
    id: 'link-1',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}
]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => "Welcome!!",
    feed: () => links,
    link: (parent,args) => {

        const idLink = args.id;
        const chosen = idLink[idLink.length - 1];
        return links[chosen];
          
    }
  },
  Mutation: {
      post: (parent,args) => {
          const link = {
              id: `link-${idCount++}`,
              description: args.description,
              url: args.url
          }
          links.push(link)
          return link;

      },
      updateLink: (parent,args) => {
        const idLink = args.id;
        const idchosen = idLink[idLink.length - 1];

        if(args.url != null)
          links[idchosen].url = args.url;
        
        if(args.description != null)
          links[idchosen].description = args.description;

      },
      deleteLink: (parent,args) => {
        
        const idLink = args.id;
        const idchosen = idLink[idLink.length - 1];

        if(idchosen > -1)
          links.splice(idchosen,1);


          idCount--;
        
      }
     
  },
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))