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
    <section id="five-principles" className="min-h-screen bg-beige px-8 py-20">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-4xl lg:text-6xl font-concrette font-light text-darkBrown text-center mb-16">
          The Five Principles
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <div 
              key={index}
              className="bg-cream rounded-lg p-8 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-20 h-20 mx-auto mb-4">
                <Image
                  src={principle.icon}
                  alt={principle.title}
                  width={80}
                  height={80}
                  className="w-full h-full"
                />
              </div>
              
              <h3 className="text-xl font-diatype-mono text-darkBrown mb-3">
                {principle.title}
              </h3>
              
              <p className="text-sm font-dm-sans text-brown leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}