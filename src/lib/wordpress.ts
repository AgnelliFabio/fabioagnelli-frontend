const API_URL = process.env.WORDPRESS_API_URL || 'https://fabioagnelli.fr/wp-json/wp/v2'

// Interface pour les articles
export interface Post {
  id: number
  date: string
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  acf?: Record<string, unknown> // Pour les champs ACF
}

// Interface pour les projets portfolio
export interface Project {
  id: number
  date: string
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  acf?: {
    technologies?: string[]
    github_url?: string
    demo_url?: string
    featured_image?: string
    description_courte?: string
  }
}

// Récupérer tous les articles
export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${API_URL}/posts?_embed`, {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch posts')
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

// Récupérer un article par slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`)
    const posts = await res.json()
    
    return posts[0] || null
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

// Récupérer tous les projets (custom post type)
export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_URL}/projects?_embed`)
    
    if (!res.ok) {
      throw new Error('Failed to fetch projects')
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

// Récupérer un projet par slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_URL}/projects?slug=${slug}&_embed`)
    const projects = await res.json()
    
    return projects[0] || null
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}