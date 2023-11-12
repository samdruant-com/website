import type { Request } from "express";
import type { UserDocument } from "../../data/user";

interface AuthenticatedRequest extends Request {
  user: UserDocument
}

export { AuthenticatedRequest };