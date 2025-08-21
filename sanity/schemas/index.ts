import pageComplete from './pageComplete'
import service from './service'
import siteSettings from './siteSettings'

// Schema types for the CMS
export const schemaTypes = [
  // Static pages (Homepage, Work With Me, etc.)
  pageComplete,
  
  // Dynamic content - populates service template
  service,
  
  // Site configuration
  siteSettings
]
