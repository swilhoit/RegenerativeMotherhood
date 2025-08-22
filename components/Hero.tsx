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
      
      {/* Hero Content - positioned absolutely like original */}
      <div className="absolute z-30 left-[92px] bottom-[61px] flex flex-col gap-[35px] max-w-[647px]
                      lg:left-[92px] lg:bottom-[61px]
                      md:left-[5%] md:bottom-[15%] md:max-w-[90%]
                      max-md:left-[50%] max-md:bottom-[18%] max-md:transform max-md:-translate-x-1/2 max-md:text-center max-md:max-w-[88%]">
        <h1 className="font-concrette font-[200] text-beige text-[88px] leading-[1] tracking-[-4.4px]
                       lg:text-[88px] lg:tracking-[-4.4px]
                       md:text-[52px] md:tracking-[-2.4px]
                       max-md:text-[42px] max-md:tracking-[-1.8px]">
          The Path to Generative Infant Sleep
        </h1>
        
        <p className="font-diatype-mono text-beige text-[13.5px] leading-[1.35] tracking-[0px]
                      md:text-[13.5px]
                      max-md:text-[11px] max-md:mx-auto max-md:max-w-[600px]">
          Because supporting your baby&apos;s sleep can and should feel mutually nourishing.
        </p>
        
        {/* CTA Button */}
        <button className="self-start px-6 py-2 h-[44px] w-[161px] border border-beige text-beige 
                          font-dm-mono text-[16px] font-normal underline uppercase tracking-[0px] leading-[130%]
                          hover:bg-beige/10 transition-colors
                          max-md:mx-auto max-md:text-[14px] max-md:w-[156px] max-md:h-[40px]">
          Learn More
        </button>
      </div>
    </section>
  )
}