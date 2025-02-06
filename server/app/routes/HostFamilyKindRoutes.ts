import { Router } from 'express'
import { HostFamilyKindController } from '../controllers/HostFamilyKindController'

const router = Router()
const hostFamilyKindController = new HostFamilyKindController()

router.get('/', async (req, res) => {
    const kinds = await hostFamilyKindController.getAllHostFamilyKinds()
    res.json(kinds)
})

router.get('/:id', async (req, res) => {
    const kind = await hostFamilyKindController.getHostFamilyKindById(parseInt(req.params.id))
    if (!kind) {
        return res.status(404).json({ message: 'Host family kind not found' })
    }
    res.json(kind)
})

router.post('/', async (req, res) => {
    const newKind = await hostFamilyKindController.createHostFamilyKind(req.body)
    res.status(201).json(newKind)
})

router.put('/:id', async (req, res) => {
    const updatedKind = await hostFamilyKindController.updateHostFamilyKind(parseInt(req.params.id), req.body)
    if (!updatedKind) {
        return res.status(404).json({ message: 'Host family kind not found' })
    }
    res.json(updatedKind)
})

router.delete('/:id', async (req, res) => {
    await hostFamilyKindController.deleteHostFamilyKind(parseInt(req.params.id))
    res.status(204).send()
})

export default router 