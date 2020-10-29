import express from 'express'
import guestCtrl from '../controllers/guest.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/guests')
  .get(guestCtrl.list)
  .post(guestCtrl.create)
  //.post(guestCtrl.postGuest)


/** this route for testing only */
  router.route('/api/guests/:id')
  .get(guestCtrl.read)
  .put(guestCtrl.update)
  .delete(guestCtrl.remove) 
router.param('id', guestCtrl.guestByID)  

/** script below used with ui */
/* router.route('/api/guests/:guestId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, guestCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, guestCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, guestCtrl.remove) */

router.param('id', guestCtrl.guestByID)

export default router