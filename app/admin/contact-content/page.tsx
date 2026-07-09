import { getPagesContent } from "@/app/actions/pages"
import ContactContentForm from "./ContactContentForm"

export default async function ContactContentAdminPage() {
    const pages = await getPagesContent()

    return (
        <div className="p-6 lg:p-8 max-w-4xl">
            <div className="mb-8 border-b border-gray-200 pb-5">
                <h1 className="text-2xl font-heading font-bold text-gray-900">Contact Page Content</h1>
                <p className="text-gray-500 text-sm mt-1">Manage the email, phone, and address content displayed on the Contact Us page.</p>
            </div>

            <ContactContentForm data={pages.contact} />
        </div>
    )
}
