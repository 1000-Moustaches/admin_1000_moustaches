import { Router } from 'express'
import { PermissionController } from '../controllers/PermissionController'
import { checkIfAuthenticated, getAuthUser } from '../auth/auth-middleware'

const router = Router()
const permissionController = new PermissionController()

router.get('/', checkIfAuthenticated, getAuthUser, async (req, res) => {
  let userId = req.authUser.id
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const permissions = await permissionController.getCurrentUserPermissions(userId)
  res.json(permissions)
})

export default router
