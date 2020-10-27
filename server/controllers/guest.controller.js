import Guest from '../models/guest.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
//import defaultImage from './../../client/assets/images/default.png'

const create = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      })
    }
    let guest = new Guest(fields)
  
    if (files.image) {
      guest.image.data = fs.readFileSync(files.image.path)
      guest.image.contentType = files.image.type
    }
    try {
      let result = await guest.save()
      res.json(result)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
} 



const guestByID = async (req, res, next, id) => {
  try {
    let guest = await Guest.findById(id)
    if (!guest)
      return res.status('400').json({
        error: "Guest not found"
      })
    req.profile = guest
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve guest"
    })
  }
}

const list = async (req, res) => {
  try {
    let guests = await Guest.find().select('firstName lastName email phoneNumber')
    res.json(guests)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  try {
    let guest = req.profile
    guest = extend(guest, req.body)
    guest.updated = Date.now()
    await guest.save()
    res.json(guest)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let guest = req.profile
    let deletedGuest = await guest.remove()
    res.json(deletedGuest)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  create,
  guestByID,
  list,
  remove,
  update
}