import { Router } from 'express'
import { VeterinarianInterventionController } from '../controllers/VeterinarianInterventionController'

const router = Router()
const interventionController = new VeterinarianInterventionController()

router.get('/', async (req, res) => {
    const interventions = await interventionController.getAllInterventions()
    res.json(interventions)
})

router.get('/:id', async (req, res) => {
    const intervention = await interventionController.getInterventionById(parseInt(req.params.id))
    if (!intervention) {
        return res.status(404).json({ message: 'Intervention not found' })
    }
    res.json(intervention)
})

router.post('/', async (req, res) => {
    const newIntervention = await interventionController.createIntervention(req.body)
    res.status(201).json(newIntervention)
})

router.put('/:id', async (req, res) => {
    const updatedIntervention = await interventionController.updateIntervention(parseInt(req.params.id), req.body)
    if (!updatedIntervention) {
        return res.status(404).json({ message: 'Intervention not found' })
    }
    res.json(updatedIntervention)
})

router.delete('/:id', async (req, res) => {
    await interventionController.deleteIntervention(parseInt(req.params.id))
    res.status(204).send()
})

export default router 