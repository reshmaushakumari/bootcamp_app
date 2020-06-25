const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
// Store all potentially malicious values in an array. 
const values = [`%${cohortName}%`];

const queryString = `SELECT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
GROUP BY teachers.name, cohorts.name
ORDER BY teacher;`

pool.query(queryString,values)
.then(res =>  {
   res.rows.forEach(user => {
   console.log(`${user.cohort}: ${user.teacher}`);
})})
.catch(err => console.error('query error', err.stack));