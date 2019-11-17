import * as http from 'http'
import * as stream from 'stream'

type HTTPMethods = 'DELETE' | 'delete' |
                   'GET' | 'get' |
                   'HEAD' | 'head' |
                   'OPTIONS' | 'options' |
                   'PATCH' | 'patch' |
                   'POST' | 'post' |
                   'PUT' | 'put' |
                   'TRACE' | 'trace'

declare namespace Injectar {
  function build (
    dispatchFunc: DispatchFunc,
    options?: string | InjectOptions
  ): Injectar

  type DispatchFunc = (req: Request, res: Response) => void

  type CallbackFunc = (err: Error, response: Response) => void

  type InjectPayload = string | object | Buffer | NodeJS.ReadableStream

  interface Request extends stream.Readable {
    url: string
    httpVersion: string
    method: HTTPMethods
    headers: http.IncomingHttpHeaders
    prepare: (next: () => void) => void
  }

  interface Response extends http.ServerResponse {
    raw: {
      res: http.ServerResponse
    }
    rawPayload: Buffer
    headers: http.OutgoingHttpHeaders
    statusCode: number
    statusMessage: string
    trailers: { [key: string]: string }
    payload: string
    body: string
    json: () => object
  }

  interface InjectOptions {
    url?: string | {
      pathname: string
      protocal?: string
      hostname?: string
      port?: string | number
      query?: string
    }
    path?: string | {
      pathname: string
      protocal?: string
      hostname?: string
      port?: string | number
      query?: string
    }
    headers?: http.IncomingHttpHeaders | http.OutgoingHttpHeaders
    query?: string
    simulate?: {
      end: boolean,
      split: boolean,
      error: boolean,
      close: boolean
    }
    authority?: string
    remoteAddress?: string
    method?: HTTPMethods
    validate?: boolean
    payload?: InjectPayload
    server?: http.Server
  }

  interface Injectar {
    // http methods
    delete: (url: string) => Injectar
    get: (url: string) => Injectar
    head: (url: string) => Injectar
    options: (url: string) => Injectar
    patch: (url: string) => Injectar
    post: (url: string) => Injectar
    put: (url: string) => Injectar
    trace: (url: string) => Injectar

    // injectar methods
    body: (body: InjectPayload) => Injectar
    headers: (headers: http.IncomingHttpHeaders | http.OutgoingHttpHeaders) => Injectar
    header: (headerKey: string, headerValue: string) => Injectar
    payload: (payload: InjectPayload) => Injectar
    query: (query: object) => Injectar
    end: (callback?: CallbackFunc) => void | Promise<Response>
  }
}

export = Injectar.build