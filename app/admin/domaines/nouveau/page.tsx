import { DomainForm } from '@/components/admin/DomainForm'
import { createDomainAction } from '../actions'

export default function NewDomainPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Nouveau domaine clinique</h1>
      <div className="mt-8">
        <DomainForm action={createDomainAction} submitLabel="Créer" />
      </div>
    </div>
  )
}
