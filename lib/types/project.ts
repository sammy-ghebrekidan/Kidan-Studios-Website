export interface ProjectImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface ProjectShot extends ProjectImage {
  caption: string
}

export interface Project {
  slug: string
  title: string
  description: string
  heroImage: string
  year: string
  role: string
  status: string
  brief: string[]
  approach: string[]
  builtList: string[][]
  shots: ProjectShot[]
  otherProject: {
    slug: string
    title: string
    images: ProjectImage[]
  }
}
