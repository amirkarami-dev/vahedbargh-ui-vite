export type AnnouncementPriority = 'urgent' | 'important' | 'info'

export interface Announcement {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  priority: AnnouncementPriority
  jalaliDate: string
  publishedAt: string
  imageUrl?: string
  featured: boolean
}

export interface Resolution {
  id: string
  text: string
  status: string
}

export interface Meeting {
  id: string
  sessionNumber: number
  subject: string
  jalaliDate: string
  date: string
  status: string
  type: string
  pdfUrl?: string
  resolutions: Resolution[]
  attendees?: string[]
  notes?: string
}

export interface StatItem {
  id: string
  label: string
  value: number
  suffix: string
  iconName: string
  sortOrder?: number
}

export interface DocumentItem {
  id: string
  title: string
  category: string
  jalaliDate: string
  date: string
  version: string
  description: string
  fileSize: string
  downloadCount: number
  tags: string[]
  fileUrl?: string
  featured: boolean
}
