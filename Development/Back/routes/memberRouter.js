import express from 'express';
import { MemberController } from "../controllers/index.js";
import { createMemberValidation } from '../validations/member.js';
import { handleValidationErrors, checkAuth } from "../utils/index.js";

const memberRouter = express.Router();

// CRD Members
memberRouter.get('/', MemberController.getAll);
memberRouter.get('/members/:userId/:projectId', MemberController.getById);
memberRouter.post('/members/create', checkAuth, createMemberValidation, handleValidationErrors, MemberController.create);
memberRouter.delete('/members/:userId/:projectId', checkAuth, MemberController.remove);

export default memberRouter;