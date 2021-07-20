module.exports = app => {
    app.get('/videos', (req, res) => res.send('Você está na rota de atendimentos e está realizando um get'));

    app.post('/videos',(req,res) => res.send('Você está na rota de atendimentos e está realizando um post'));

    app.put('/videos',(req,res) => res.send('Você está na rota de atendimentos e está realizando um put'));

    app.delete('/videos',(req,res) => res.send('Você está na rota de atendimentos e está realizando um delete'));
}