// src/middleware/verifyToken.ts

// === IMPORTS ===

// == Types ==
import { NextFunction, Request, Response } from 'express'

// == Security libraries ==
import jwt from 'jsonwebtoken' // For verifying JSON Web Tokens

/** === VERIFY ACCESS TOKEN MIDDLEWARE ===
 *
 * - Checks if an access token (JWT) exists in the cookies
 * - Verifies the token using the server's JWT_SECRET
 * - If valid, allows the request to proceed to the protected route
 * - If missing or invalid, returns 401 (Unauthorized) or 403 (Forbidden)
 *
 * @param req - Express request object (must include cookies)
 * @param res - Express response object
 * @param next - Express next function
 * @returns 401 Unauthorized: token missing, 403 Forbidden: token invalid, next - Token valid: move to next middleware/handler
 *
 */
export function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.accessToken

  if (!token) {
    res.sendStatus(401)
    return
  }

  jwt.verify(token, process.env.JWT_SECRET || '', (error: jwt.VerifyErrors | null) => {
    if (error) {
      console.log('❌ Token verification failed:', error)
      res.sendStatus(403)
      return
    }

    next()
  })
}
