const resolvers = {
    Query: {
      me: () => {
            return {
            username: 'CSCC09',
            };
        },
    },
};
  
module.exports = resolvers;