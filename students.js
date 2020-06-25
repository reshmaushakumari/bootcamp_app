const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id, students.name, cohort_id, cohorts.name as cohort_name
FROM students
JOIN cohorts
ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
LIMIT ${process.argv[3] || 5};
`)
.then(res => {
  res.rows.forEach(user => {
  console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_id} cohort ${user.cohort_name}`);
})})
.catch(err => console.error('query error', err.stack));