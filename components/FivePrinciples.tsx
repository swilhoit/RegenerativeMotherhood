import Image from 'next/image'

const principles = [
  {
    icon: '/Individual.svg',
    title: 'Individual',
    description: 'Every baby is unique, with their own temperament, needs, and developmental timeline.'
  },
  {
    icon: '/Connection.svg',
    title: 'Connection',
    description: 'Sleep solutions should strengthen, not strain, the parent-child bond.'
  },
  {
    icon: '/Harmony.svg',
    title: 'Harmony',
    description: 'Finding balance between meeting needs and maintaining boundaries.'
  },
  {
    icon: '/Life.svg',
    title: 'Life',
    description: 'Sleep approaches that support your whole family&apos;s wellbeing.'
  },
  {
    icon: '/Layer_1.svg',
    title: 'Growth',
    description: 'Viewing sleep challenges as opportunities for development and learning.'
  }
]

export default function FivePrinciples() {
  return (
    <section id="five-principles" className="relative bg-[#49492F] text-beige overflow-hidden"
             style={{ backgroundImage: 'url(/gradient.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-[1512px] mx-auto px-5 md:px-20 lg:px-[324px] py-14 lg:py-14">
        {/* Header */}
        <div className="text-center pb-8 md:pb-14 flex flex-col items-center gap-3">
          <p className="font-dm-sans text-xs font-light tracking-[0.24px] uppercase">
            The Framework
          </p>
          <h2 className="font-concrette text-[32px] md:text-[42px] font-[200] tracking-[-1.6px] md:tracking-[-2.1px] leading-[1] capitalize">
            The Five Principles
          </h2>
        </div>
        
        {/* Principles List */}
        <div className="flex flex-col">
          {principles.map((principle, index) => (
            <div 
              key={index}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-[140px] lg:gap-[280px] py-8 md:py-12 border-b border-beige/50 last:border-b-0"
            >
              {/* Icon */}
              <div className="w-[80px] md:w-[116px] h-[80px] md:h-[116px] flex-shrink-0">
                <Image
                  src={principle.icon}
                  alt={principle.title}
                  width={116}
                  height={116}
                  className="w-full h-full"
                />
              </div>
              
              {/* Content */}
              <div className="flex flex-col gap-4 md:gap-6 text-center md:text-left">
                {/* Eyebrow and Title */}
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
                  <span className="font-dm-mono text-sm tracking-[0.28px]">
                    0{index + 1}
                  </span>
                  <h3 className="font-concrette text-[20px] md:text-2xl font-[350] tracking-[-1px] md:tracking-[-1.2px] uppercase leading-[0.9]">
                    {principle.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p className="font-diatype-mono text-sm md:text-base">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}