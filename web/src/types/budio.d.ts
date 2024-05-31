declare module 'budio' {
  export type NewNoteBody = {
    title: string | null
    body: string
  }

  export type Note = {
    id: string | null
    title: string | null
    body: string
    tags: string[]
    createdAt: Date
    updatedAt: Date | null
  }

  export type BudioApiResponse<T> = {
    data: T
    code: string
  }

  export type DecodedUser = {
    name: string | null
    picture: string | null
    email: string | null
    email_verified: boolean
    auth_time: number
    user_id: string
    firebase: {
      identities: { email: string; 'google.com': string[] }
      sign_in_provider: 'google.com'
    }
    iat: number
    exp: number
    aud: string
    iss: string
    sub: string
  }

  export interface RefreshTokenResponse {
    refresh_token: string | null | undefined
    token: string | null | undefined
  }
}
