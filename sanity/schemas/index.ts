import homepage from './homepage'
import service from './service'
import pageComplete from './pageComplete'
import siteSettings from './siteSettings'

// Schema types for the CMS - organized by priority
export const schemaTypes = [
  // Main content types
  homepage,        // Homepage - standalone
  service,         // Services - manage all services
  
  // Secondary pages
  pageComplete,    // Other pages (About, Contact, etc.)
  
  // Site configuration
  siteSettings     // Global settings
]
