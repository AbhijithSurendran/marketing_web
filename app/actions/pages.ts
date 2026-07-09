"use server";

import { revalidatePath } from "next/cache";
import { getDB, saveDB } from "@/lib/db";
import { PagesContent } from "@/lib/types";

export async function getPagesContent(): Promise<PagesContent> {
    const db = await getDB();
    return db.pages;
}

export async function updateHomeContent(formData: FormData): Promise<{ success: boolean; error?: string }> {
    try {
        const db = await getDB();

        db.pages.home = {
            heroTitle: formData.get("heroTitle") as string,
            heroSubtitle: formData.get("heroSubtitle") as string,
            heroCta: formData.get("heroCta") as string,
            metaTitle: formData.get("metaTitle") as string || undefined,
            metaDescription: formData.get("metaDescription") as string || undefined,
        };

        await saveDB(db);
        revalidatePath("/");
        revalidatePath("/admin/pages");

        return { success: true };
    } catch (error) {
        console.error("Error updating home content:", error);
        return { success: false, error: "Internal server error" };
    }
}

export async function updateAboutContent(formData: FormData): Promise<{ success: boolean; error?: string }> {
    try {
        const db = await getDB();

        db.pages.about = {
            ...db.pages.about,
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            mission: formData.get("mission") as string,
            vision: formData.get("vision") as string,
            bannerImage: formData.get("bannerImage") as string || undefined,
        };

        await saveDB(db);
        revalidatePath("/about");
        revalidatePath("/admin/pages");
        revalidatePath("/admin/about-content");

        return { success: true };
    } catch (error) {
        console.error("Error updating about content:", error);
        return { success: false, error: "Internal server error" };
    }
}

export async function updateContactContent(formData: FormData): Promise<{ success: boolean; error?: string }> {
    try {
        const db = await getDB();

        db.pages.contact = {
            ...db.pages.contact,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            address: formData.get("address") as string,
            googleMapsEmbed: formData.get("googleMapsEmbed") as string || undefined,
        };

        await saveDB(db);
        revalidatePath("/contact");
        revalidatePath("/admin/pages");
        revalidatePath("/admin/contact-content");

        return { success: true };
    } catch (error) {
        console.error("Error updating contact content:", error);
        return { success: false, error: "Internal server error" };
    }
}

export async function updatePageSEO(
    pageKey: "home" | "about" | "contact" | "services" | "products" | "gallery" | "blogs",
    formData: FormData
): Promise<{ success: boolean; error?: string }> {
    try {
        const db = await getDB();

        if (!db.pages[pageKey]) {
            db.pages[pageKey] = {} as any;
        }

        db.pages[pageKey]!.metaTitle = formData.get("metaTitle") as string || undefined;
        db.pages[pageKey]!.metaDescription = formData.get("metaDescription") as string || undefined;

        await saveDB(db);
        
        if (pageKey === "blogs") {
            revalidatePath("/blog");
            revalidatePath("/blogs");
        } else if (pageKey === "home") {
            revalidatePath("/");
        } else {
            revalidatePath(`/${pageKey}`);
        }
        revalidatePath("/admin/pages");

        return { success: true };
    } catch (error) {
        console.error(`Error updating SEO for ${pageKey}:`, error);
        return { success: false, error: "Internal server error" };
    }
}
