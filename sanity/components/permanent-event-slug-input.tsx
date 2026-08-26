"use client"

import { useEffect, useState } from "react"
import { getPublishedId, SlugInput, useClient, useFormValue, type SlugInputProps } from "sanity"
import { apiVersion } from "../env"

/**
 * Locks the slug after first publish so live /events/[slug] URLs cannot be renamed.
 * Unpublished drafts can still generate and edit the slug.
 */
export function PermanentEventSlugInput(props: SlugInputProps) {
  const documentId = useFormValue(["_id"]) as string | undefined
  const client = useClient({ apiVersion })
  const [isPublished, setIsPublished] = useState(false)

  useEffect(() => {
    if (!documentId) return
    const publishedId = getPublishedId(documentId)
    let cancelled = false
    client
      .fetch<boolean>(`defined(*[_id == $id][0]._id)`, { id: publishedId })
      .then((exists) => {
        if (!cancelled) setIsPublished(Boolean(exists))
      })
      .catch(() => {
        if (!cancelled) setIsPublished(false)
      })
    return () => {
      cancelled = true
    }
  }, [client, documentId])

  return <SlugInput {...props} readOnly={props.readOnly || isPublished} />
}
