import { getActiveDomains } from '@/lib/clinical-domains'
import { getActiveEquipment } from '@/lib/equipment'
import { getServices } from '@/lib/services'
import { getPublishedArticles } from '@/lib/articles'
import { Hero } from '@/components/home/Hero'
import { ClinicalDomains } from '@/components/home/ClinicalDomains'
import { Equipment } from '@/components/home/Equipment'
import { Services } from '@/components/home/Services'
import { Testimonials } from '@/components/home/Testimonials'
import { Company } from '@/components/home/Company'
import { NewsPreview } from '@/components/home/NewsPreview'
import { Contact } from '@/components/home/Contact'

export default async function HomePage() {
  const [domains, equipment, services, articles] = await Promise.all([
    getActiveDomains(),
    getActiveEquipment(),
    getServices(),
    getPublishedArticles(),
  ])

  return (
    <>
      <Hero />
      <ClinicalDomains domains={domains} />
      <Equipment equipment={equipment} />
      <Services services={services} />
      <Testimonials />
      <Company />
      <NewsPreview articles={articles} />
      <Contact />
    </>
  )
}
