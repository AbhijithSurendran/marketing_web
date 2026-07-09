export interface HeroSlider {
    id: string;
    imageUrl: string;
    title: string;
    description: string | null;
    buttonText: string | null;
    buttonLink: string | null;
    sortOrder: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Product {
    id: string;
    title: string;
    slug: string;
    description: string;
    features: string[];
    price?: number;
    image?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Service {
    id: string;
    title: string;
    slug: string;
    description: string;
    benefits: string[];
    image?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image?: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

export interface GalleryImage {
    id: string;
    url: string;
    alt?: string;
    caption?: string | null;
    createdAt: string;
}

export interface PageSEO {
    metaTitle?: string;
    metaDescription?: string;
}

export interface PagesContent {
    home: {
        heroTitle: string;
        heroSubtitle: string;
        heroCta: string;
    } & PageSEO;
    about: {
        title: string;
        content: string;
        mission: string;
        vision: string;
        bannerImage?: string;
    } & PageSEO;
    contact: {
        email: string;
        phone: string;
        address: string;
        googleMapsEmbed?: string;
    } & PageSEO;
    services?: PageSEO;
    products?: PageSEO;
    gallery?: PageSEO;
    blogs?: PageSEO;
}

export interface User {
    id: string;
    email: string;
    passwordHash: string;
    role: "admin";
}

export interface Enquiry {
    id: string;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

export interface Testimonial {
    id: string;
    name: string;
    designation: string | null;
    message: string;
    photo_url: string | null;
    sort_order: number;
    is_active: boolean;
    createdAt: string;
}

export interface DB {
    heroSliders: HeroSlider[];
    products: Product[];
    services: Service[];
    blogs: Blog[];
    gallery: GalleryImage[];
    pages: PagesContent;
    users: User[];
    enquiries: Enquiry[];
    testimonials: Testimonial[];
}
