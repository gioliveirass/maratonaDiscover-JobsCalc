const express = require('express')
// É uma parte do express que gera os caminhos
const routes = express.Router()

// O .ejs já lê por padrão a pasta views, então não precisa das duas linhas comentadas abaixo, e o basePatch pode sair do routes.get
// __dirname é uma variável que pega o caminho do projeto em sua máquina
// const basePatch = __dirname + '/views'
// O routes.get estava assim:
// routes.get('/index', (request, response) => response.render(basePatch + "/index.html"))

const views = __dirname + '/views/' // Como o ejs não achava o local da pasta, foi necessário criar essa constante

// Dados para enviar pro perfil
const Profile = {
    data: {
        name: "Giovana",
        avatar: "https://avatars.githubusercontent.com/u/78885451?v=4",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },

    controllers: {
        index(request, response) {
            return response.render(views + "profile", { profile: Profile.data })
        },

        update(request, response) {
            // req.body para pegar os dados
            const data = request.body

            // definir quantas semanas tem um ano
            const weeksPerYear = 52

            // remover as semanas de férias do ano, para pegar quantas semanas estou trabalhando no mês
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

            // quantas horas por semana estou trabalhando
            const weeksTotalHours = data["hours-per-day"] * data["days-per-week"]

            // horas trabalhadas no mês
            const monthlyTotalHours = weeksTotalHours * weeksPerMonth

            // qual será o valor da minha hora
            const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...request.body,
                "value-hour": valueHour
            }

            return response.redirect('/profile')
        }
    }
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 1,
            createdAt: Date.now() // Atribuí data de hoje
        },
        {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 3,
            "total-hours": 47,
            createdAt: Date.now() // Atribuí data de hoje
        }
    ],

    controllers: {
        index(request, response) {
                const updatedJobs = Job.data.map((job) => {
                    //  CALCULO DE TEMPO RESTANTE
                    const remaining = Job.services.remainingDays(job)
            
                    // CALCULANDO STATUS
                    const status = remaining <= 0 ? 'done' : 'progress' // If ternário
            
                    // RETORNANDO VALORES NO JOB
                    return {
                        ...job, // Pega tudo que tem no job já
                        remaining,
                        status,
                        // CALCULANDO VALOR DO TRABALHO
                        budget: Profile.data["value-hour"] * job["total-hours"]
                    }
                })
                return response.render(views + "index", { jobs: updatedJobs })
        },

        create(request, response) {
            return response.render(views + "job")
        },

        save(request, response) {
            const lastId = Job.data[Job.data.length - 1]?.id || 1;
            Job.data.push({
                id: lastId + 1,
                name: request.body.name,
                "daily-hours": request.body["daily-hours"],
                "total-hours": request.body["total-hours"],
                createdAt: Date.now() // Atribuí data de hoje
            })
            return response.redirect('/index')
        }
    },

    services: {
        // Calculo de dias restantes
        remainingDays(job) {
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() // to.Fixed() para arrendodar
            const createdDate = new Date(job.createdAt) // Pegando a data que o job foi criado
            const dueDay = createdDate.getDate() + Number(remainingDays) // Calculando o dia do futuro
            const dueDateInMs = createdDate.setDate(dueDay) // Calculando a data do futuro
            const timeDiffInMs = dueDateInMs - Date.now()
            const dayInMs = 1000 * 60 * 60 * 24 // Transformas ms em days
            const dayDiff = Math.floor(timeDiffInMs / dayInMs) // Calculando a diferença de dias, o Math.floor arredonda o número para baixo 
            // Restam x dias...
            return dayDiff
        }
    }
}

// Criando rotas: Request, Response
routes.get('/index', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/edit', (request, response) => response.render(views + "job-edit"))
routes.get('/profile', Profile.controllers.index) // Envia também o objeto Perfil
routes.post('/profile', Profile.controllers.update)

// Exporta as rotas para serem utilizadas no server.js
module.exports = routes;