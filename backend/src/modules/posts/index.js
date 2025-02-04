const posts = require('./service');

module.exports = {
  configure(app) {

    app.get('/posts', posts.findAll);
    app.get('/posts/list/:num', posts.findList);
    app.get('/myposts', posts.findMyAll);
    app.post('/posts', posts.create);

    app.get('/posts/:id', posts.find);
    app.patch('/posts/:id', posts.update);
    app.delete('/posts/:id', posts.destroy);
  }
};
