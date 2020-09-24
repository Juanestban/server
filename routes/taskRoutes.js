const { Router } = require('express')
const router = Router()

const pool = require('../database')


router.get('/', (req, res) => res.send('Hello World'))

router.get('/api/tasks', async (req, res) => {
    const query = await pool.query('SELECT * FROM notes')
    res.json(query)
})

router.get('/api/tasks/:id', async (req, res) => {
    const { id } = req.params
    const data = await pool.query('SELECT * FROM notes WHERE id = ?', [id])
    if (data.length > 0) {
        return res.json(data[0])
    }
    res.status(404).json({text: 'the task doesn\'t exists'})
})

router.post('/api/tasks', async (req, res) => {
    await pool.query('INSERT INTO notes set ?', [req.body])
    res.json({ message: 'created task' })
})

router.put('/api/tasks/:id', async (req, res) => {
    const { id } = req.params
    await pool.query('UPDATE notes set ? WHERE id = ?', [req.body, id])
    res.json({ message: 'updated task' })
})

router.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params
    await pool.query('DELETE FROM notes WHERE id = ?', [id])
    res.json({ message: 'deleted task' })
})

module.exports = router