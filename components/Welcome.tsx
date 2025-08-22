import Image from 'next/image'

export default function Welcome() {
  return (
    <section id="welcome" className="min-h-screen bg-cream px-8 py-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[400px] lg:h-[600px]">
            <Image
              src="/Welcome.jpg"
              alt="Welcome to Regenerative Motherhood"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-concrette font-light text-darkBrown leading-tight">
              Welcome
            </h2>
            
            <div className="space-y-4 text-brown font-dm-sans">
              <p>
                I&apos;m so glad you&apos;re here. You&apos;ve been trying so hard to support your baby&apos;s sleep. 
                You&apos;ve read the books, tried the methods, and still find yourself exhausted and overwhelmed.
              </p>
              
              <p>
                What if I told you there&apos;s another way? A way that honors both your needs and your baby&apos;s 
                natural development. A way that doesn&apos;t require you to choose between responsiveness and rest.
              </p>
              
              <p>
                Regenerative Motherhood is about creating sleep solutions that nourish your whole family. 
                It&apos;s about understanding that your baby&apos;s sleep challenges aren&apos;t problems to be fixed, 
                but opportunities for growth and connection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}