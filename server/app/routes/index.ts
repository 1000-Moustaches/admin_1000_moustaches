import { Router } from 'express'
import animalRoutes from './AnimalRoutes'
import hostFamilyRoutes from './HostFamilyRoutes'
import hostFamilyKindRoutes from './HostFamilyKindRoutes'
import veterinarianRoutes from './VeterinarianRoutes'
import veterinarianInterventionRoutes from './VeterinarianInterventionRoutes'
import speciesRoutes from './SpeciesRoutes'

const router = Router()

router.use('/animals', animalRoutes)
router.use('/host-families', hostFamilyRoutes)
router.use('/host-family-kinds', hostFamilyKindRoutes)
router.use('/veterinarians', veterinarianRoutes)
router.use('/veterinarian-interventions', veterinarianInterventionRoutes)
router.use('/species', speciesRoutes)

export default router 