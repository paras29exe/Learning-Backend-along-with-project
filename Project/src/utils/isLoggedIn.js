import { User } from "../models/user.model.js"
import jwt from 'jsonwebtoken'

export default async function isLoggedIn(req) {
    const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if (accessToken) {
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        if (decodedToken) {
            const user = await User.findById(decodedToken._id)
            if (!user) {
                throw new ApiError(404, "Access token expired , Please login again");
            }
            return user
        }
    }
    return null
}