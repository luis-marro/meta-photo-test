import { Request, Response } from "express";
import { InternalUserService } from "../../application/services";

const userService = new InternalUserService();

export class UserController {
  static async getEnrichedPhoto(req: Request, res: Response): Promise<void> {
    try {
      const photoId = parseInt(req.params.id);

      if (isNaN(photoId)) {
        res.status(400).json({ error: "Invalid photo ID" });
        return;
      }

      const result = await userService.getEnrichedPhoto(photoId);
      res.json(result);
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
