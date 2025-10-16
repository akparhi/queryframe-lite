import axios from 'axios'
import { z } from 'zod'
import { QueryframeHandler, type CreateHandler } from './core'
import { type ErrorHandler } from './error'
import { HttpMethods, MethodTypes, type Header } from './utils'

//  Queryframe routes & Queryframe initiator
export type QueryframeRoutes<T extends QueryframeRoutes = object> = {
  [key: string]: T | QueryframeHandler | any
}

class Queryframe<Routes extends QueryframeRoutes> {
  constructor(public queryframe: Routes) {}
}

//  Exposed class
//  Query builder
type QueryframeBuilderParams = {
  onError?: ErrorHandler
  log?: boolean
  baseURL?: string
  headers?: Header
  skipStrictParse?: boolean
}

class QueryframeBuilder {
  public ctx: QueryframeBuilderParams

  constructor(public config: QueryframeBuilderParams) {
    this.ctx = config
  }

  public updateConfig = (update: Partial<QueryframeBuilderParams>) => {
    this.ctx = { ...this.ctx, ...update }
  }

  public createQuery: CreateHandler = routeParams =>
    new QueryframeHandler({
      onError: this.ctx.onError || (() => null),
      log: this.ctx.log || false,
      skipStrictParse: this.ctx.skipStrictParse || false,
      type: MethodTypes.QUERY,

      //  inbuilt request handler
      method: HttpMethods.get,
      baseURL: this.ctx.baseURL || '',
      headers: this.ctx.headers || (() => ({})),
      endpoint: routeParams.endpoint || '',
      transformResponse: routeParams.transformResponse || (data => data),

      //  handler config params
      mock: routeParams.mock || false,
      //  handler fixed params
      refract: routeParams.refract || (((data: any) => data.output) as any),
      outputSchema: routeParams.output,

      //  dynamic params
      paramsSchema: routeParams.params,
      querySchema: routeParams.query,
      bodySchema: routeParams.body,
    })

  public createMutation: CreateHandler = routeParams =>
    new QueryframeHandler({
      onError: this.ctx.onError || (() => null),
      log: this.ctx.log || false,
      skipStrictParse: this.ctx.skipStrictParse || false,
      type: MethodTypes.MUTATION,

      //  inbuilt request handler
      method: routeParams.method || HttpMethods.post,
      baseURL: this.ctx.baseURL || '',
      headers: this.ctx.headers || (() => ({})),
      endpoint: routeParams.endpoint || '',
      transformResponse: routeParams.transformResponse || (data => data),

      //  handler config params
      mock: routeParams.mock || false,
      //  handler fixed params
      refract: routeParams.refract || (((data: any) => data.output) as any),
      outputSchema: routeParams.output,

      //  dynamic params
      paramsSchema: routeParams.params,
      querySchema: routeParams.query,
      bodySchema: routeParams.body,
    })

  public createQueryframe = <Routes extends QueryframeRoutes>(
    routes: Routes,
  ): Queryframe<Routes> => new Queryframe(routes)
}

export const createQueryframeBuilder = (config: QueryframeBuilderParams) =>
  new QueryframeBuilder(config)

export { z, axios, HttpMethods, QueryframeBuilder }
export type { QueryframeBuilderParams }
