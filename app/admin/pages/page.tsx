import { getPagesContent } from "@/app/actions/pages"
import PagesTabs from "./PagesTabs"

export default async function PagesAdminPage() {
    const pages = await getPagesContent()

    return (
        <div className="p-6 lg:p-8 max-w-5xl">
            <div className="mb-8 border-b border-gray-200 pb-5">
                <h1 className="text-2xl font-heading font-bold text-gray-900">Pages</h1>
                <p className="text-gray-500 text-sm mt-1">Manage content and SEO settings for all primary website pages.</p>
            </div>

            <PagesTabs pages={pages} />
        </div>
    )
}
