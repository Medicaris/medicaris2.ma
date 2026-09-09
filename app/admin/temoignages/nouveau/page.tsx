import { TestimonialForm } from '@/components/admin/TestimonialForm'
import { createTestimonialAction } from '../actions'

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Nouveau témoignage</h1>
      <div className="mt-8">
        <TestimonialForm action={createTestimonialAction} submitLabel="Créer" />
      </div>
    </div>
  )
}
