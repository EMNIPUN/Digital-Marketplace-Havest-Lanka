import express from 'express';

const CheckAuth = (req, res) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ loggedIn: false });
    }

    return res.status(200).json({ loggedIn: true });
};

export default CheckAuth;
