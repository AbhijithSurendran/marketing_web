"use client"

import { useState } from "react"
import { updateContactContent } from "@/app/actions/pages"
import { Loader2, CheckCircle } from "lucide-react"
import { PagesContent } from "@/lib/types"

export default function ContactContentForm({ data }: { data: PagesContent["contact"] }) {
    const [email, setEmail] = useState(data.email || "")
    const [phone, setPhone] = useState(data.phone || "")
    const [address, setAddress] = useState(data.address || "")
    const [googleMapsEmbed, setGoogleMapsEmbed] = useState(data.googleMapsEmbed || "")
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
        formData.append("googleMapsEmbed", googleMapsEmbed)

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
                    <CheckCircle size={18} /> Contact page content saved successfully!
                </div>
            )}

            <div className="admin-card p-6 space-y-5">
                <div>
                    <label className="label">Contact Email Address</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="input-field" 
                        placeholder="E.g. info@yourcompany.com" 
                    />
                </div>
                <div>
                    <label className="label">Contact Phone Number</label>
                    <input 
                        type="text" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                        className="input-field" 
                        placeholder="E.g. +1 (555) 012-3456" 
                    />
                </div>
                <div>
                    <label className="label">Office / Business Address</label>
                    <textarea 
                        rows={3} 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        required 
                        className="input-field resize-none" 
                        placeholder="E.g. 123 Business Way, Suite 100, City, Country" 
                    />
                </div>
                <div>
                    <label className="label">Google Maps Embed Code / iframe URL</label>
                    <textarea 
                        rows={4} 
                        value={googleMapsEmbed} 
                        onChange={(e) => setGoogleMapsEmbed(e.target.value)} 
                        className="input-field resize-none" 
                        placeholder="Paste either raw Google Maps iframe embed code or direct embed URL (src attribute)..." 
                    />
                </div>
            </div>

            <button type="submit" disabled={isPending} className="btn-primary">
                {isPending ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : "Save Contact Content"}
            </button>
        </form>
    )
}
