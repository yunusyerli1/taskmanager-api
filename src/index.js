const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => {
    console.log('Server is up on port', +port);
})










//Without middleware : new request => run route handler

//With middleware: new request => do sth => run route handler

//Middleware kullanımı. Detay için middleware klasörüne bak
// app.use((req, res, next)=>{
//     if(req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

//Siteyi maintanence moda aldığımızda kullanabiliriz.
// app.use((req, res, next)=>{
//     res.status(503).send('site is currently down. Check back soon!')
// })