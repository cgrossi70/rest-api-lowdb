import { Router } from "express"
import ctrl from "../controllers/controllers.js"

const router = Router()

router.get('/', ctrl.listAuthors)
router.get('/:id', ctrl.listAuthor)
router.post('/', ctrl.addAuthor)
router.put('/:id', ctrl.updateAuthor)
router.delete('/:id',ctrl.deleteAuthor)


export default router