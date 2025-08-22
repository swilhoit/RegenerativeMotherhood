import Image from 'next/image'

export default function Welcome() {
  return (
    <section id="welcome" className="bg-cream">
      <div className="max-w-[1512px] mx-auto px-5 md:px-20 lg:px-20 py-10 md:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-48">
          {/* Image */}
          <div className="w-full md:w-[300px] lg:w-[278px] h-[200px] md:h-[300px] lg:h-[244px] relative">
            <Image
              src="/Welcome.jpg"
              alt="Welcome to Regenerative Motherhood"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="w-full lg:w-[734px] flex flex-col gap-4 md:gap-6 lg:gap-9 text-center lg:text-left">
            {/* Eyebrow */}
            <p className="font-dm-sans text-xs font-light tracking-[0.24px] uppercase text-[#49492F]">
              Our Story
            </p>
            
            {/* Title */}
            <h2 className="font-concrette text-[32px] md:text-[42px] lg:text-[48px] font-[200] tracking-[-1.6px] md:tracking-[-2.1px] lg:tracking-[-2.4px] leading-[1.1] text-[#49492F] capitalize">
              The Beginning of Regenerative Motherhood
            </h2>
            
            {/* Body Text */}
            <div className="font-diatype-mono text-sm md:text-base text-[#49492F] leading-[1.25] space-y-4">
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