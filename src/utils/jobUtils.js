module.exports = {
    // Calculo de dias restantes
    remainingDays(job) {
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() // to.Fixed() para arrendodar
        const createdDate = new Date(job.createdAt) // Pegando a data que o job foi criado
        const dueDay = createdDate.getDate() + Number(remainingDays) // Calculando o dia do futuro
        const dueDateInMs = createdDate.setDate(dueDay) // Calculando a data do futuro
        const timeDiffInMs = dueDateInMs - Date.now()
        const dayInMs = 1000 * 60 * 60 * 24 // Transformas ms em days
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs) // Calculando a diferença de dias, o Math.floor arredonda o número para baixo 
        // Restam x dias...
        return dayDiff
    },

    calculateBudget: (job, valueHour) => valueHour* job["total-hours"]
}