"use client"

import { useState } from "react"
import { updateContactContent } from "@/app/actions/pages"
import { Loader2, CheckCircle } from "lucide-react"
import { PagesContent } from "@/lib/types"

export default function ContactPageForm({ data }: { data: PagesContent["contact"] }) {
    const [email, setEmail] = useState(data.email || "")
    const [phone, setPhone] = useState(data.phone || "")
    const [address, setAddress] = useState(data.address || "")
    const [metaTitle, setMetaTitle] = useState(data.metaTitle || "")
    const [metaDescription, setMetaDescription] = useState(data.metaDescription || "")
    const [isPending, setIsPending] = useState(false)
    const [saved, setSaved] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsPending(true)
        setSaved(false)

        const formData = new FormData()
        formData.append("email", email)
        formData.append("phone", phone)
        formData.append("address", address)
        formData.append("metaTitle", metaTitle)
        formData.append("metaDescription", metaDescription)

        const result = await updateContactContent(formData)
        setIsPending(false)

        if (result.success) {
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {saved && (
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
                    <CheckCircle size={18} /> Contact page content and SEO saved successfully!
                </div>
            )}

            <div className="admin-card p-6 space-y-5">
                <h3 className="font-semibold text-gray-900 mb-2 border-b border-gray-100 pb-2">Contact Information</h3>
                
                <div>
                    <label className="label">Contact Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="input-field" 
                        placeholder="hello@company.com" 
                    />
                </div>
                <div>
                    <label className="label">Contact Phone</label>
                    <input 
                        type="text" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                        className="input-field" 
                        placeholder="+1 (555) 000-0000" 
                    />
                </div>
                <div>
                    <label className="label">Office Address</label>
                    <textarea 
                        rows={3} 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        required 
                        className="input-field resize-none" 
                        placeholder="123 Corporate Blvd, Suite 100, City, Country" 
                    />
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 border-b border-gray-100 pb-2 pt-4">SEO Settings</h3>
                
                <div>
                    <label className="label">SEO Title</label>
                    <input 
                        type="text" 
                        value={metaTitle} 
                        onChange={(e) => setMetaTitle(e.target.value)} 
                        className="input-field" 
                        placeholder="SEO Title for /contact" 
                    />
                </div>
                <div>
                    <label className="label">SEO Description</label>
                    <textarea 
                        rows={3} 
                        value={metaDescription} 
                        onChange={(e) => setMetaDescription(e.target.value)} 
                        className="input-field resize-none" 
                        placeholder="Describe the /contact page in 150-160 characters..." 
                    />
                </div>
            </div>

            <button type="submit" disabled={isPending} className="btn-primary">
                {isPending ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : "Save Contact Settings"}
            </button>
        </form>
    )
}
