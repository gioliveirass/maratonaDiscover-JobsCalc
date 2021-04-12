const Profile = require('../model/Profile')

module.exports = {
    async index(request, response) {
        return response.render("profile", { profile: await Profile.get() })
    },

    async update(request, response) {
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

        const profile = await Profile.get()

        await Profile.update({
            ...profile,
            ...request.body,
            "value-hour": valueHour
        }) 

        return response.redirect('/profile')
    }
}