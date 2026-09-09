export interface Article {
  id: string
  slug: string
  title_fr: string
  title_en: string
  excerpt_fr: string
  excerpt_en: string
  content_fr: string
  content_en: string
  cover_image_url: string | null
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export type ArticleInsert = Omit<Article, 'id' | 'created_at' | 'updated_at'>
export type ArticleUpdate = Partial<ArticleInsert>

export type EnergyType = 'rf' | 'laser'

export interface ClinicalDomain {
  id: string
  slug: string
  icon_key: string
  tag_fr: string
  tag_en: string
  title_fr: string
  title_en: string
  body_fr: string
  body_en: string
  audience_fr: string
  audience_en: string
  order_index: number
  active: boolean
  created_at: string
  updated_at: string
}

export type ClinicalDomainInsert = Omit<ClinicalDomain, 'id' | 'created_at' | 'updated_at'>
export type ClinicalDomainUpdate = Partial<ClinicalDomainInsert>

export interface EquipmentTag {
  fr: string
  en: string
}

export interface EquipmentSpec {
  label_fr: string
  label_en: string
  value_fr: string
  value_en: string
}

export interface Equipment {
  id: string
  slug: string
  energy_type: EnergyType
  clinical_domain_id: string | null
  eyebrow_fr: string
  eyebrow_en: string
  name_fr: string
  name_en: string
  description_fr: string
  description_en: string
  tags: EquipmentTag[]
  spec_sheet: EquipmentSpec[] | null
  image_url: string | null
  order_index: number
  active: boolean
  created_at: string
  updated_at: string
}

export type EquipmentInsert = Omit<Equipment, 'id' | 'created_at' | 'updated_at'>
export type EquipmentUpdate = Partial<EquipmentInsert>

export interface Service {
  id: string
  step_number: number
  title_fr: string
  title_en: string
  body_fr: string
  body_en: string
  order_index: number
  created_at: string
  updated_at: string
}

export type ServiceUpdate = Partial<Omit<Service, 'id' | 'created_at' | 'updated_at'>>

export interface Setting {
  key: string
  value: string | null
}

export interface Testimonial {
  id: string
  initials: string
  quote_fr: string
  quote_en: string
  name_fr: string
  name_en: string
  role_fr: string
  role_en: string
  order_index: number
  active: boolean
  created_at: string
  updated_at: string
}

export type TestimonialInsert = Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>
export type TestimonialUpdate = Partial<TestimonialInsert>
