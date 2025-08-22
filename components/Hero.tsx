import Navigation from './Navigation'

export default function Hero() {
  return (
    <section className="relative w-screen h-screen overflow-hidden flex flex-col">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/website/hero.jpg)' }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 z-20 bg-black/20" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Content */}
      <div className="relative z-30 flex-1 flex flex-col justify-center items-center px-8">
        <div className="max-w-[900px] text-center">
          <h1 className="text-[40px] md:text-[60px] lg:text-[88px] font-concrette font-light text-beige leading-[1.1] mb-8">
            The Path to Generative Infant Sleep
          </h1>
          
          <p className="text-base md:text-lg font-diatype-mono text-beige/90 max-w-[600px] mx-auto">
            Because supporting your baby&apos;s sleep can and should feel mutually nourishing.
          </p>
        </div>
      </div>
    </section>
  )
}