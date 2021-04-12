const Database = require('./config')

const initDb = {
    async init() {
        const db = await Database()
    
        await db.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_days INT,
            vacation_per_year INT,
            value_hour INT
        )`);
    
        await db.exec(`CREATE TABLE job (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            createdAt DATETIME
        )`);
    
        await db.run(`INSERT INTO profile (
            name, 
            monthly_budget, 
            days_per_week, 
            hours_per_days, 
            vacation_per_year
        ) VALUES (
            "Giovana",
            "https://avatars.githubusercontent.com/u/78885451?v=4",
            3000,
            5,
            5
        );`);
    
        await db.run(`INSERT INTO job (
            name, 
            daily_hours, 
            total_hours,
            createdAt
        ) VALUES (
            "Pizzaria Guloso",
            2,
            1,
            1617514376018
        );`);
    
        await db.run(`INSERT INTO job (
            name, 
            daily_hours, 
            total_hours,
            createdAt
        ) VALUES (
            "OneTwo Project",
            3,
            47,
            1617514376018
        );`);
    
        await db.close()
    }
}

initDb.init()