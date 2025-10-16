import { ZodError } from 'zod'

/**
 * Queryframe error codes
 *
 */
export enum QUERYFRAME_ERROR {
  BAD_INPUT = 'BAD_INPUT',
  BAD_OUTPUT = 'BAD_OUTPUT',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  API_ERROR = 'API_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  TIMEOUT = 'TIMEOUT',
}

export const NETWORK_ERROR = {
  400: QUERYFRAME_ERROR.BAD_REQUEST,
  401: QUERYFRAME_ERROR.UNAUTHORIZED,
  403: QUERYFRAME_ERROR.FORBIDDEN,
  404: QUERYFRAME_ERROR.NOT_FOUND,
  405: QUERYFRAME_ERROR.METHOD_NOT_ALLOWED,
}

/**
 * Queryframe error documentation
 *
 */
export class QueryframeError {
  readonly name = 'QueryframeError' as const
  readonly message!: string
  readonly code: QUERYFRAME_ERROR
  readonly cause?: unknown

  constructor(opts: {
    code: QUERYFRAME_ERROR
    message: string
    cause?: unknown
  }) {
    const normalizedCause =
      opts.cause instanceof ZodError ? opts.cause.flatten() : opts.cause
    this.message = opts.message
    this.code = opts.code
    if (normalizedCause !== undefined) (this as any).cause = normalizedCause

    // Ensure instances have the right prototype (mostly redundant, but safe)
    Object.setPrototypeOf(this, QueryframeError.prototype)
  }
}

export type ErrorHandler = (error: QueryframeError) => void
