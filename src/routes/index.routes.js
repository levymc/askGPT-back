import { Router } from "express";
import { askController } from "../controllers/askGPT.controller.js";

const router = Router();

router.post('/askGPT', askController)
router.get('/askGPT')

router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Erro interno no servidor');
})

export default router;