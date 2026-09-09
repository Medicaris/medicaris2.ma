import { getActiveDomains } from '@/lib/clinical-domains'
import { getActiveEquipment } from '@/lib/equipment'
import { getServices } from '@/lib/services'
import { getPublishedArticles } from '@/lib/articles'
import { getActiveTestimonials } from '@/lib/testimonials'
import { Hero } from '@/components/home/Hero'
import { ClinicalDomains } from '@/components/home/ClinicalDomains'
import { Equipment } from '@/components/home/Equipment'
import { Services } from '@/components/home/Services'
import { Testimonials } from '@/components/home/Testimonials'
import { Company } from '@/components/home/Company'
import { NewsPreview } from '@/components/home/NewsPreview'
import { Contact } from '@/components/home/Contact'

export default async function HomePage() {
  const [domains, equipment, services, articles, testimonials] = await Promise.all([
    getActiveDomains(),
    getActiveEquipment(),
    getServices(),
    getPublishedArticles(),
    getActiveTestimonials(),
  ])

  return (
    <>
      <Hero />
      <ClinicalDomains domains={domains} />
      <Equipment equipment={equipment} />
      <Services services={services} />
      <Testimonials testimonials={testimonials} />
      <Company />
      <NewsPreview articles={articles} />
      <Contact />
    </>
  )
}
