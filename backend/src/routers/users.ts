// src/routers/users.ts
import { Router, RequestHandler } from "express";
import enforceAuth from "../middlewares/enforce-auth";
import User from "../models/user";

const router = Router();

// Ensure this association exists in your model:
// User.belongsToMany(Vacation, { through: 'VacationTags', as: 'followedVacations' });

const getFollowedVacations: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findByPk(userId, {
      include: [
        {
          association: "followedVacations",
        },
      ],
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user.followedVacations || []);
  } catch (err) {
    next(err);
  }
};

router.get("/me/vacations", enforceAuth, getFollowedVacations);

export default router;
