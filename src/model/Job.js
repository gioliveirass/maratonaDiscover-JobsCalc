const Database = require('../db/config')

module.exports = {
    async get() {
        const db = await Database()

        const jobs = await db.all(`SELECT * FROM job`)

        await db.close()

        return jobs.map(job => ({
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            createdAt: job.createdAt
        }))
    },
    async update(updatedJob, jobId) {
        const db = await Database()

        await db.run(`UPDATE job SET
            name = "${updatedJob.name}",
            daily_hours = ${updatedJob["daily-hours"]},
            total_hours = ${updatedJob["total-hours"]}
            WHERE id = ${jobId}
        `)

        await db.close()
    },
    async delete(id) {
        const db = await Database()
        await db.run(`DELETE FROM job WHERE id = ${id}`)
        await db.close()
    },
    async create(newJob) {
        const db = await Database()

        await db.run(`INSERT INTO job (
            name,
            daily_hours,
            total_hours,
            createdAt
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.createdAt}
        )`)

        await db.close()
    }
}