"use client"

import { useState } from "react"
import { updatePageSEO } from "@/app/actions/pages"
import { Loader2, CheckCircle } from "lucide-react"
import { PageSEO } from "@/lib/types"

interface SEOPageFormProps {
    pageKey: "home" | "about" | "contact" | "services" | "products" | "gallery" | "blogs"
    label: string
    data?: PageSEO
}

export default function SEOPageForm({ pageKey, label, data }: SEOPageFormProps) {
    const [metaTitle, setMetaTitle] = useState(data?.metaTitle || "")
    const [metaDescription, setMetaDescription] = useState(data?.metaDescription || "")
    const [isPending, setIsPending] = useState(false)
    const [saved, setSaved] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsPending(true)
        setSaved(false)

        const formData = new FormData()
        formData.append("metaTitle", metaTitle)
        formData.append("metaDescription", metaDescription)

        const result = await updatePageSEO(pageKey, formData)
        setIsPending(false)

        if (result.success) {
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        }
    }

    const pathLabel = pageKey === "home" ? "Home Page (/)" : `/${pageKey === "blogs" ? "blog" : pageKey}`

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {saved && (
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
                    <CheckCircle size={18} /> {label} SEO settings saved successfully!
                </div>
            )}

            <div className="admin-card p-6 space-y-5">
                <div>
                    <label className="label">SEO Title</label>
                    <input 
                        type="text" 
                        value={metaTitle} 
                        onChange={(e) => setMetaTitle(e.target.value)} 
                        className="input-field" 
                        placeholder={`SEO Title for ${pathLabel}`} 
                    />
                </div>
                <div>
                    <label className="label">SEO Description</label>
                    <textarea 
                        rows={4} 
                        value={metaDescription} 
                        onChange={(e) => setMetaDescription(e.target.value)} 
                        className="input-field resize-none" 
                        placeholder={`Describe the ${label} page in 150-160 characters...`} 
                    />
                </div>
            </div>

            <button type="submit" disabled={isPending} className="btn-primary">
                {isPending ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : "Save SEO Settings"}
            </button>
        </form>
    )
}
