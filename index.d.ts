import * as http from 'http'

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
    end: (callback: CallbackFunc) => void
  }
}

export = Injectar.build