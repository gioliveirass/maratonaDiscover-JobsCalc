const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    async index(request, response) {
        const Jobs = await Job.get();
        const profile = await Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: Jobs.length
        }

        // total de horas por dia de cada job em progresso
        let jobTotalHours = 0

        const updatedJobs = Jobs.map((job) => {
            //  CALCULO DE TEMPO RESTANTE
            const remaining = JobUtils.remainingDays(job)
    
            // CALCULANDO STATUS
            const status = remaining <= 0 ? 'done' : 'progress' // If ternário
            
            // SOMANDO A QUANTIDADE DE STATUS
            statusCount[status] += 1;

            // total de horas por dia de cada job em progresso
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

            // RETORNANDO VALORES NO JOB
            return {
                ...job, // Pega tudo que tem no job já
                remaining,
                status,
                // CALCULANDO VALOR DO TRABALHO
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        // qtd de horas que quero trabalhar - qtd de horas/dia de cada job em progress
        const freeHours = profile["hours-per-day"] - jobTotalHours

        return response.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours})
    }
}