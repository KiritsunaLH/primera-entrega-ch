import jwt from 'jsonwebtoken'
import {request, response} from 'express'

const isAdmin = (req = request, res = response, next) => {
    const {token} = req.headers
    const role = (token === '69420666') ? 'admin' : 'user'
    const user = {
        role: role
    }
    if (user.role !== 'admin') {
        return res.status(405).json({
            error: -1,
            msg: 'Unauthorized route'
        })
    }
    next()
}

export {isAdmin}