import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="min-h-screen bg-cream px-8 py-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <h2 className="text-4xl lg:text-5xl font-concrette font-light text-darkBrown leading-tight">
              About Me
            </h2>
            
            <div className="space-y-4 text-brown font-dm-sans">
              <p>
                Hi, I&apos;m [Your Name], a certified sleep consultant and mother who believes in a different approach 
                to infant sleep. After struggling with my own baby&apos;s sleep and feeling failed by traditional 
                sleep training methods, I discovered a path that honors both baby and parent.
              </p>
              
              <p>
                My approach combines evidence-based sleep science with attachment theory, nervous system 
                regulation, and a deep respect for infant development. I&apos;ve helped hundreds of families 
                find their way to better sleep without compromising their values or their connection.
              </p>
              
              <p>
                I believe that every family deserves sleep support that feels right for them - support that 
                considers the whole picture, not just the number of wake-ups. That&apos;s why I created 
                Regenerative Motherhood: to offer a new paradigm for infant sleep support.
              </p>
            </div>
            
            <button className="bg-darkBrown text-beige px-8 py-3 rounded-full font-diatype-mono text-sm hover:bg-brown transition-colors">
              Learn More About My Approach
            </button>
          </div>
          
          {/* Image */}
          <div className="relative h-[400px] lg:h-[600px] order-1 lg:order-2">
            <Image
              src="/About.png"
              alt="About Regenerative Motherhood"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}