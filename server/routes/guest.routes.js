import express from 'express'
import guestCtrl from '../controllers/guest.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/guests')
  .get(guestCtrl.list)
  .post(guestCtrl.create)

 router.route('/api/guests/:guestId')
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, guestCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, guestCtrl.remove)

router.param('guestId', guestCtrl.guestByID) 

export default router