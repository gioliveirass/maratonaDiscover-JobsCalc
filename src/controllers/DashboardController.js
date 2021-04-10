const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    index(request, response) {
        const Jobs = Job.get();
        const profile = Profile.get();
        const updatedJobs = Jobs.map((job) => {
            //  CALCULO DE TEMPO RESTANTE
            const remaining = JobUtils.remainingDays(job)
    
            // CALCULANDO STATUS
            const status = remaining <= 0 ? 'done' : 'progress' // If ternário
    
            // RETORNANDO VALORES NO JOB
            return {
                ...job, // Pega tudo que tem no job já
                remaining,
                status,
                // CALCULANDO VALOR DO TRABALHO
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })
        return response.render("index", { jobs: updatedJobs })
    }
}