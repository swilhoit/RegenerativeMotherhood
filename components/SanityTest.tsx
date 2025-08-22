import { client } from '@/lib/sanity.client'

async function getTestData() {
  try {
    // Test basic connection by fetching all document types
    const query = `*[_type in ["homepage", "pages", "services", "footer"]][0..5] {
      _id,
      _type,
      title,
      "slug": slug.current
    }`
    
    const data = await client.fetch(query)
    return data
  } catch (error) {
    console.error('Sanity connection error:', error)
    return null
  }
}

export default async function SanityTest() {
  const data = await getTestData()
  
  return (
    <div className="bg-cream p-8 rounded-lg">
      <h3 className="text-xl font-bold text-darkBrown mb-4">Sanity CMS Connection Test</h3>
      
      {data ? (
        <div>
          <p className="text-green-600 mb-4">✅ Sanity is connected!</p>
          <div className="space-y-2">
            <p className="font-semibold">Found {data.length} documents:</p>
            {data.map((doc: any) => (
              <div key={doc._id} className="pl-4 text-sm">
                <span className="font-mono">{doc._type}</span>
                {doc.title && <span className="ml-2">- {doc.title}</span>}
                {doc.slug && <span className="ml-2 text-gray-500">({doc.slug})</span>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-red-600">❌ Could not connect to Sanity. Check your configuration.</p>
      )}
    </div>
  )
}