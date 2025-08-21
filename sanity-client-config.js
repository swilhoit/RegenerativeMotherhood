// Sanity Client Configuration for your website
import {createClient} from '@sanity/client'

export const sanityClient = createClient({
  projectId: '1q2kqdh2',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true, // Use CDN for faster response times
  apiVersion: '2024-01-01', // Use current date
  token: process.env.SANITY_API_TOKEN, // Optional, for authenticated requests
})

// Example queries

// Get all pages
export async function getAllPages() {
  return sanityClient.fetch(`*[_type == "page"] {
    _id,
    title,
    slug,
    heroImage,
    content,
    seoTitle,
    seoDescription
  }`)
}

// Get a single page by slug
export async function getPageBySlug(slug) {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      heroImage,
      content,
      seoTitle,
      seoDescription
    }`,
    {slug}
  )
}

// Get text blocks by key
export async function getTextBlock(key) {
  return sanityClient.fetch(
    `*[_type == "textBlock" && key == $key][0] {
      _id,
      key,
      title,
      content
    }`,
    {key}
  )
}

// Get all image galleries
export async function getAllGalleries() {
  return sanityClient.fetch(`*[_type == "imageGallery"] {
    _id,
    title,
    slug,
    images
  }`)
}

// Get site settings
export async function getSiteSettings() {
  return sanityClient.fetch(`*[_type == "siteSettings"][0] {
    title,
    description,
    logo,
    favicon,
    socialMedia
  }`)
}

// Helper function to build image URLs
export function urlFor(source) {
  return sanityClient.image(source)
}