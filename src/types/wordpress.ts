// Types pour l'API WordPress

export interface RessourceTech {
  ID: number
  post_title: string
  post_name: string
}

// Types pour la galerie d'images
export interface ImageMetadataSize {
  file: string
  width: number
  height: number
  file_url: string
}

export interface ImageMetadata {
  full: ImageMetadataSize & { mime_type: string; file_size: number }
  medium?: ImageMetadataSize
  large?: ImageMetadataSize
  thumbnail?: ImageMetadataSize
  medium_large?: ImageMetadataSize
}

export interface ImageAttachment {
  ID: number
  post_title: string
  post_excerpt: string
}

export interface GalerieImage {
  attachment: ImageAttachment
  metadata: ImageMetadata
}

export interface ProjetACF {
  client: string
  contexte: string
  date_realisation: string
  duree_projet: string
  type_projet: string
  galerie_images: GalerieImage[]
  video_presentation: string
  ressources_principales: RessourceTech[]
  ressources_secondaires: RessourceTech[]
  description_courte: string
  problematique: string
  solution_apportee: string
  resultats_impact: string
  lien_site: string
  lien_github: string
  lien_figma: string
}

export interface Projet {
  id: number
  slug: string
  title: {
    rendered: string
  }
  acf: ProjetACF
}

export interface RessourceTechACF {
  logo: string
  categorie: string
  type_utilisation: string[]
  lien_ressource: string
  couleur_principale: string
  description_courte: string
}

export interface RessourceTechFull {
  id: number
  slug: string
  title: {
    rendered: string
  }
  acf: RessourceTechACF
}
