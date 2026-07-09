import { getPagesContent } from "@/app/actions/pages"
import AboutContentForm from "./AboutContentForm"

export default async function AboutContentAdminPage() {
    const pages = await getPagesContent()

    return (
        <div className="p-6 lg:p-8 max-w-4xl">
            <div className="mb-8 border-b border-gray-200 pb-5">
                <h1 className="text-2xl font-heading font-bold text-gray-900">About Page Content</h1>
                <p className="text-gray-500 text-sm mt-1">Manage the title, overview, mission, and vision content displayed on the About Us page.</p>
            </div>

            <AboutContentForm data={pages.about} />
        </div>
    )
}
