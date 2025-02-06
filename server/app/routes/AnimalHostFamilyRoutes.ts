import { Router } from 'express'
import { AnimalHostFamilyController } from '../controllers/AnimalHostFamilyController'
import { checkIfAuthenticated } from '../auth/auth-middleware'

const router = Router()
const animalHostFamilyController = new AnimalHostFamilyController()

router.get('/animal/:animalId', checkIfAuthenticated, async (req, res) => {
    const animalHostFamilies = await animalHostFamilyController.getWithAnimalId(parseInt(req.params.animalId))
    res.json(animalHostFamilies)
})

router.get('/hostFamily/:hostFamilyId', checkIfAuthenticated, async (req, res) => {
    const animalHostFamilies = await animalHostFamilyController.getWithHostFamilyId(parseInt(req.params.hostFamilyId))
    res.json(animalHostFamilies)
})

router.post('/', checkIfAuthenticated, async (req, res) => {
    const newAnimalHostFamily = await animalHostFamilyController.createAnimalHostFamily(req.body)
    res.status(201).json(newAnimalHostFamily)
})

router.put('/:id', checkIfAuthenticated, async (req, res) => {
    const updatedAnimalHostFamily = await animalHostFamilyController.updateAnimalHostFamily(parseInt(req.params.id), req.body)
    if (!updatedAnimalHostFamily) {
        return res.status(404).json({ message: 'AnimalHostFamily not found' })
    }
    res.json(updatedAnimalHostFamily)
})

router.delete('/:id', checkIfAuthenticated, async (req, res) => {
    await animalHostFamilyController.deleteAnimalHostFamily(parseInt(req.params.id))
    res.status(204).send()
})

export default router 