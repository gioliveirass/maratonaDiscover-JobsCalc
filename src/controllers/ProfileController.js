const Profile = require('../model/Profile')

module.exports = {
    index(request, response) {
        return response.render("profile", { profile: Profile.get() })
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

        Profile.update({
            ...Profile.get(),
            ...request.body,
            "value-hour": valueHour
        }) 

        return response.redirect('/profile')
    }
}