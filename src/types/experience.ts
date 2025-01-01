export interface Role {
  title: string
  period: string
  description: string[]
  products?: string[]
}

export interface Experience {
  company: string
  title: string
  period: string
  description: string
  url: string
  progression?: string[]
  roles?: Role[]
  longDescription?: string[]
  tags?: string[]
} 