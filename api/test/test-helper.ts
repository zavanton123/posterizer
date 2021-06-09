import mongoose from "mongoose";

before(done => {
  console.log(`zavanton - before is called`);
  // const url = `mongodb://database:${DBPORT}/${DBNAME_TEST}`;
  const url = 'mongodb://zavanton:21665mylife@localhost:27017/posterizer_test?authSource=admin';
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  mongoose.connect(url, options);

  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
    .once('open', () => {
      console.log(`zavanton - connected to db!!!`);
      done();
    });
});

beforeEach(done => {
  console.log(`zavanton - beforeEach is called`);
  mongoose.connection.collections.users.drop(() => {
    mongoose.connection.collections.posts.drop(() => {
      mongoose.connection.collections.categories.drop(() => {
        mongoose.connection.collections.tags.drop(() => {
          console.log(`zavanton - all collections cleared`);
          done();
        });
      });
    });
  });
});
