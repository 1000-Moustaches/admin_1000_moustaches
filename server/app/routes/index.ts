import { Router } from 'express'
import animalRoutes from './AnimalRoutes'
import animalHostFamilyRoutes from './AnimalHostFamilyRoutes'
import hostFamilyRoutes from './HostFamilyRoutes'
import hostFamilyKindRoutes from './HostFamilyKindRoutes'
import veterinarianRoutes from './VeterinarianRoutes'
import veterinarianInterventionRoutes from './VeterinarianInterventionRoutes'
import speciesRoutes from './SpeciesRoutes'
import userRoutes from './UserRoutes'
const router = Router()

router.use('/animals', animalRoutes)
router.use('/animal-host-families', animalHostFamilyRoutes)
router.use('/host-families', hostFamilyRoutes)
router.use('/host-family-kinds', hostFamilyKindRoutes)
router.use('/veterinarians', veterinarianRoutes)
router.use('/veterinarian-interventions', veterinarianInterventionRoutes)
router.use('/species', speciesRoutes)
router.use('/users', userRoutes)

export default router 