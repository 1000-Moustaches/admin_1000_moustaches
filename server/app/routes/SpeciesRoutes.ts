import { Router } from 'express'
import { SpeciesController } from '../controllers/SpeciesController'

const router = Router()
const speciesController = new SpeciesController()

router.get('/', async (req, res) => {
    const species = await speciesController.getAllSpecies()
    res.json(species)
})

router.get('/:id', async (req, res) => {
    const species = await speciesController.getSpeciesById(parseInt(req.params.id))
    if (!species) {
        return res.status(404).json({ message: 'Species not found' })
    }
    res.json(species)
})

router.post('/', async (req, res) => {
    const newSpecies = await speciesController.createSpecies(req.body)
    res.status(201).json(newSpecies)
})

router.put('/:id', async (req, res) => {
    const updatedSpecies = await speciesController.updateSpecies(parseInt(req.params.id), req.body)
    if (!updatedSpecies) {
        return res.status(404).json({ message: 'Species not found' })
    }
    res.json(updatedSpecies)
})

router.delete('/:id', async (req, res) => {
    await speciesController.deleteSpecies(parseInt(req.params.id))
    res.status(204).send()
})

export default router 