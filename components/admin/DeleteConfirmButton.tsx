'use client'

import { Trash2 } from 'lucide-react'

interface DeleteConfirmButtonProps {
  action: (formData: FormData) => Promise<void>
  id: string
  confirmMessage?: string
}

export function DeleteConfirmButton({ action, id, confirmMessage = 'Supprimer définitivement ?' }: DeleteConfirmButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="rounded-lg p-2 text-muted transition-colors hover:bg-rf-soft hover:text-rf-ink" title="Supprimer">
        <Trash2 size={15} />
      </button>
    </form>
  )
}
