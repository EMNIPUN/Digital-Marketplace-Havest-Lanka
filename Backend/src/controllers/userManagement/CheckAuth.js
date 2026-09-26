import jwt from 'jsonwebtoken'

const CheckAuth = (req, res) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ loggedIn: false })
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET)
        return res.status(200).json({ loggedIn: true })
    } catch (e) {
        return res.status(401).json({ loggedIn: false })
    }
}

export default CheckAuth