import express from 'express';
import CheckAuth from '../../controllers/userManagement/CheckAuth.js';

const router = express.Router();

router.get('/', CheckAuth);

export default router;
