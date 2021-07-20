const conexao = require('../infraestrutura/conexao');
const moment = require('moment')
class Atendimento {

    adiciona(atendimento, res){
        const sql = 'INSERT INTO ATENDIMENTOS SET ?'
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5
      
        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)

        const existemErros = erros.length

            if(existemErros) {

                res.status(400).json(erros)

            } else {

            console.log(data)
            const atendimentoDatado = {...atendimento, dataCriacao, data}

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(201).json({atendimento})
                }
            })
        }

    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) =>{
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos where id = ${id}`

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]

            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res) {
        const sql = 'UPDATE atendimentos SET ? WHERE id =?'
        
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }    

        conexao.query(sql, [valores, id], (erro, resultados) => {

            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id,res){

        const sql = `DELETE FROM atendimentos WHERE id = ${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
}

     
module.exports = new Atendimento