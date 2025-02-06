import { Router } from 'express'
import { VeterinarianController } from '../controllers/VeterinarianController'
import { checkIfAuthenticated } from '../auth/auth-middleware'

const router = Router()
const veterinarianController = new VeterinarianController()

router.get('/', checkIfAuthenticated, async (req, res) => {
    const vets = await veterinarianController.getAllVeterinarians()
    res.json(vets)
})

router.get('/:id', checkIfAuthenticated, async (req, res) => {
    const vet = await veterinarianController.getVeterinarianById(parseInt(req.params.id))
    if (!vet) {
        return res.status(404).json({ message: 'Veterinarian not found' })
    }
    res.json(vet)
})

router.post('/', checkIfAuthenticated, async (req, res) => {
    const newVet = await veterinarianController.createVeterinarian(req.body)
    res.status(201).json(newVet)
})

router.put('/:id', checkIfAuthenticated, async (req, res) => {
    const updatedVet = await veterinarianController.updateVeterinarian(parseInt(req.params.id), req.body)
    if (!updatedVet) {
        return res.status(404).json({ message: 'Veterinarian not found' })
    }
    res.json(updatedVet)
})

router.delete('/:id', checkIfAuthenticated, async (req, res) => {
    await veterinarianController.deleteVeterinarian(parseInt(req.params.id))
    res.status(204).send()
})

export default router 