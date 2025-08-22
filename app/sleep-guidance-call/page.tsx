import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function SleepGuidanceCall() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-cream">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh] px-8 pt-24">
          <div className="max-w-[800px] text-center">
            <h1 className="text-5xl lg:text-7xl font-concrette font-light text-darkBrown mb-6">
              Sleep Guidance Call
            </h1>
            <p className="text-lg font-dm-sans text-brown">
              90 minutes to transform your approach to baby sleep
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-beige px-8 py-20">
        <div className="max-w-[800px] mx-auto space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-concrette font-light text-darkBrown">
              What to Expect
            </h2>
            <div className="space-y-4 font-dm-sans text-brown">
              <p>
                This isn&apos;t your typical sleep consultation. We won&apos;t be talking about rigid schedules 
                or cry-it-out methods. Instead, we&apos;ll dive deep into understanding your baby as an individual 
                and creating solutions that honor your family&apos;s unique needs.
              </p>
              <p>
                During our 90-minute session, we&apos;ll explore:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your baby&apos;s temperament and sleep patterns</li>
                <li>Your family&apos;s values and non-negotiables</li>
                <li>The root causes of current sleep challenges</li>
                <li>Gentle, responsive strategies for improvement</li>
                <li>How to maintain connection while setting boundaries</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-concrette font-light text-darkBrown">
              What&apos;s Included
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-cream p-6 rounded-lg">
                <h3 className="font-diatype-mono text-darkBrown mb-3">Pre-Call Assessment</h3>
                <p className="text-sm font-dm-sans text-brown">
                  Detailed questionnaire to understand your situation before we meet
                </p>
              </div>
              <div className="bg-cream p-6 rounded-lg">
                <h3 className="font-diatype-mono text-darkBrown mb-3">90-Minute Consultation</h3>
                <p className="text-sm font-dm-sans text-brown">
                  Deep dive video call focused on your family&apos;s needs
                </p>
              </div>
              <div className="bg-cream p-6 rounded-lg">
                <h3 className="font-diatype-mono text-darkBrown mb-3">Personalized Sleep Plan</h3>
                <p className="text-sm font-dm-sans text-brown">
                  Written action plan delivered within 48 hours
                </p>
              </div>
              <div className="bg-cream p-6 rounded-lg">
                <h3 className="font-diatype-mono text-darkBrown mb-3">Follow-Up Support</h3>
                <p className="text-sm font-dm-sans text-brown">
                  Two weeks of email support for questions
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-concrette font-light text-darkBrown">
              Investment
            </h2>
            <p className="font-dm-sans text-brown">
              Your investment in the Sleep Guidance Call is $297. This includes everything listed above, 
              plus a recording of our session for you to reference as needed.
            </p>
            <button className="bg-darkBrown text-beige px-8 py-3 rounded-full font-diatype-mono text-sm hover:bg-brown transition-colors">
              Book Your Call
            </button>
          </div>

          <div className="bg-cream p-8 rounded-lg">
            <p className="font-dm-sans text-brown italic">
              &quot;The sleep guidance call completely changed how I think about my baby&apos;s sleep. 
              Instead of fighting against her needs, I learned to work with them. We&apos;re all sleeping 
              better and our connection is stronger than ever.&quot;
            </p>
            <p className="mt-4 font-diatype-mono text-darkBrown text-sm">
              - Sarah, mom of 8-month-old
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}