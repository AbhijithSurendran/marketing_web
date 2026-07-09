"use client"

import { useState } from "react"
import SEOPageForm from "./SEOPageForm"
import { PagesContent } from "@/lib/types"

export default function PagesTabs({ pages }: { pages: PagesContent }) {
    const [activeTab, setActiveTab] = useState<string>("home")

    const tabs = [
        { id: "home", label: "Home Page SEO" },
        { id: "about", label: "About Page SEO" },
        { id: "contact", label: "Contact Page SEO" },
        { id: "services", label: "Services Page SEO" },
        { id: "products", label: "Products Page SEO" },
        { id: "gallery", label: "Gallery Page SEO" },
        { id: "blogs", label: "Blog Page SEO" },
    ]

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Tabs */}
            <div className="w-full lg:w-64 shrink-0 flex flex-row lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 border-b lg:border-b-0 lg:border-r border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2.5 text-left text-sm font-medium rounded-lg whitespace-nowrap transition-colors w-full ${
                            activeTab === tab.id
                                ? "bg-primary-50 text-primary-700 font-semibold"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 max-w-2xl">
                {activeTab === "home" && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-heading font-bold text-gray-900">Home Page SEO</h2>
                            <p className="text-gray-500 text-sm mt-1">Manage search engine tags for the Home page route (/).</p>
                        </div>
                        <SEOPageForm pageKey="home" label="Home" data={pages.home} />
                    </div>
                )}

                {activeTab === "about" && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-heading font-bold text-gray-900">About Page SEO</h2>
                            <p className="text-gray-500 text-sm mt-1">Manage search engine tags for the About page route (/about).</p>
                        </div>
                        <SEOPageForm pageKey="about" label="About" data={pages.about} />
                    </div>
                )}

                {activeTab === "contact" && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-heading font-bold text-gray-900">Contact Page SEO</h2>
                            <p className="text-gray-500 text-sm mt-1">Manage search engine tags for the Contact page route (/contact).</p>
                        </div>
                        <SEOPageForm pageKey="contact" label="Contact" data={pages.contact} />
                    </div>
                )}

                {activeTab === "services" && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-heading font-bold text-gray-900">Services Listing SEO</h2>
                            <p className="text-gray-500 text-sm mt-1">Manage search engine tags for the services index page (/services).</p>
                        </div>
                        <SEOPageForm pageKey="services" label="Services" data={pages.services} />
                    </div>
                )}

                {activeTab === "products" && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-heading font-bold text-gray-900">Products Listing SEO</h2>
                            <p className="text-gray-500 text-sm mt-1">Manage search engine tags for the products index page (/products).</p>
                        </div>
                        <SEOPageForm pageKey="products" label="Products" data={pages.products} />
                    </div>
                )}

                {activeTab === "gallery" && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-heading font-bold text-gray-900">Gallery Page SEO</h2>
                            <p className="text-gray-500 text-sm mt-1">Manage search engine tags for the photo gallery page (/gallery).</p>
                        </div>
                        <SEOPageForm pageKey="gallery" label="Gallery" data={pages.gallery} />
                    </div>
                )}

                {activeTab === "blogs" && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-heading font-bold text-gray-900">Blog Page SEO</h2>
                            <p className="text-gray-500 text-sm mt-1">Manage search engine tags for the blog listing page (/blog).</p>
                        </div>
                        <SEOPageForm pageKey="blogs" label="Blog" data={pages.blogs} />
                    </div>
                )}
            </div>
        </div>
    )
}
