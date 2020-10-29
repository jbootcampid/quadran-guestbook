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
const postGuest = async (req, res) => {
  const guest = new Guest(req.body)
  try {
    await guest.save()
    return res.status(200).json({
      message: "Guest successfully added!",guest
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}



const guestByID = async (req, res, next, id) => {
  console.log('geust by id'+id)
  try {
    let guest = await Guest.findById(id)
    if (!guest)
      return res.status('400').json({
        error: "Guest not found"
      })
    console.log(guest)
    req.profile = guest
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve guest"
    })
  }
}

const read = (req, res) => {
  req.profile.__v=undefined
  req.profile.created=undefined
  return res.json(req.profile)
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
    return res.status(200).json({
      message: "Guest successfully updated!", guest
    })
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
    res.status(200).json({
      message: "Guest successfully deleted!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  create,
  postGuest,
  read,
  guestByID,
  list,
  remove,
  update
}