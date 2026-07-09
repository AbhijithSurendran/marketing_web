import { getDB } from "@/lib/db"
import { notFound } from "next/navigation"
import TestimonialForm from "../TestimonialForm"

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
    let item = null
    try {
        const db = await getDB()
        item = db.testimonials?.find(t => t.id === params.id) || null
    } catch { }
    
    if (!item) notFound()
    return <TestimonialForm item={item as any} />
}
