import type { Metadata } from "next"
import { getDB } from "@/lib/db"
import GalleryClientPage from "./GalleryClientPage"

export async function generateMetadata(): Promise<Metadata> {
    try {
        const db = await getDB();
        const seo = db.pages.gallery;
        return {
            title: seo?.metaTitle || "Our Gallery",
            description: seo?.metaDescription || "Take a visual tour of our workspace.",
        }
    } catch {
        return {
            title: "Our Gallery",
            description: "Take a visual tour of our workspace.",
        }
    }
}

export default async function GalleryPage() {
    const db = await getDB();
    const galleryItems = db.gallery;

    return <GalleryClientPage items={galleryItems} />
}
