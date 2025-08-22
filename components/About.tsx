import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="bg-cream">
      <div className="max-w-[1512px] mx-auto px-5 md:px-20 lg:px-20 py-10 md:py-20 lg:py-[124px]">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 mb-8 md:mb-12 lg:mb-20">
          <div className="flex flex-col gap-3">
            <p className="font-dm-sans text-xs font-light tracking-[0.24px] uppercase text-[#49492F]">
              Who We Are
            </p>
            <h2 className="font-concrette text-[32px] md:text-[42px] font-[200] tracking-[-1.6px] md:tracking-[-2.1px] leading-[1] text-[#49492F] capitalize">
              About Regenerative Motherhood
            </h2>
          </div>
          <div className="lg:text-right">
            <p className="font-dm-sans text-xs font-light tracking-[0.24px] uppercase text-[#49492F]">
              Our Mission & Values
            </p>
          </div>
        </div>
        
        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 md:mb-12 lg:mb-20">
          <div className="relative h-[300px] md:h-[400px] lg:h-[517px]">
            <Image
              src="/Frame 1627851.jpg"
              alt="About Image 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[300px] md:h-[400px] lg:h-[517px]">
            <Image
              src="/Frame 162783.jpg"
              alt="About Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[300px] md:h-[400px] lg:h-[517px]">
            <Image
              src="/Frame 162784.jpg"
              alt="About Image 3"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Content */}
        <div className="max-w-[591px] mx-auto lg:mx-0 flex flex-col gap-4">
          <div className="font-diatype-mono text-sm md:text-base text-[#49492F] leading-[1.25] space-y-4">
            <p>
              Hi, I&apos;m a certified sleep consultant and mother who believes in a different approach 
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
          
          <button className="self-start mt-4 px-6 py-[10px] h-[41px] border border-[#49492F] text-[#49492F] 
                            font-dm-mono text-sm md:text-base font-normal underline uppercase tracking-[0px] leading-[130%]
                            hover:bg-[#49492F]/10 transition-colors rounded-xl">
            Read More
          </button>
        </div>
      </div>
    </section>
  )
}