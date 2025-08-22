import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-darkBrown text-beige px-8 py-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Image
              src="/website/logo.svg"
              alt="Regenerative Motherhood"
              width={200}
              height={47}
              className="filter brightness-0 invert"
            />
            <p className="text-sm font-dm-sans opacity-80">
              Supporting families to find sleep solutions that nourish everyone.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-diatype-mono text-sm tracking-wider">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm font-dm-sans">
              <li>
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/work-with-me" className="hover:opacity-80 transition-opacity">
                  Work With Me
                </Link>
              </li>
              <li>
                <Link href="/sleep-guidance-call" className="hover:opacity-80 transition-opacity">
                  Sleep Guidance Call
                </Link>
              </li>
              <li>
                <Link href="/comprehensive-sleep-support" className="hover:opacity-80 transition-opacity">
                  Comprehensive Sleep Support
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-diatype-mono text-sm tracking-wider">GET IN TOUCH</h3>
            <div className="space-y-2 text-sm font-dm-sans">
              <p>hello@regenerativemotherhood.com</p>
              <p>Follow us on Instagram @regenerativemotherhood</p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-beige/20 pt-8 text-center">
          <p className="text-xs font-dm-sans opacity-60">
            © 2024 Regenerative Motherhood. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}