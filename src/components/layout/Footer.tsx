import React from 'react'
import { Bot, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { type FooterInfoTab } from '@/components/footer/FooterInfoModal'

export interface FooterProps {
  onNavigateScreen?: (screen: string) => void
  onOpenInfoModal?: (tab: FooterInfoTab) => void
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateScreen,
  onOpenInfoModal,
}) => {
  const currentYear = new Date().getFullYear()

  const productLinks = [
    { name: 'Jobs', screen: 'jobs' },
    { name: 'AI Matching', screen: 'ai-matching' },
    { name: 'Resume', screen: 'resume' },
    { name: 'Auto Apply', screen: 'ai-auto-apply' },
    { name: 'Pricing & Plans', screen: 'pricing' },
  ]

  const resourceLinks: { name: string; tab: FooterInfoTab }[] = [
    { name: 'Career Resources', tab: 'resources' },
    { name: 'Resume Tips', tab: 'tips' },
    { name: 'Job Search Guide', tab: 'guide' },
  ]

  const companyLinks: { name: string; tab: FooterInfoTab }[] = [
    { name: 'About', tab: 'about' },
    { name: 'Contact', tab: 'contact' },
  ]

  const legalLinks: { name: string; tab: FooterInfoTab }[] = [
    { name: 'Privacy', tab: 'privacy' },
    { name: 'Terms', tab: 'terms' },
  ]

  const handleProductClick = (screen: string, e: React.MouseEvent) => {
    e.preventDefault()
    if (onNavigateScreen) {
      onNavigateScreen(screen)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleModalClick = (tab: FooterInfoTab, e: React.MouseEvent) => {
    e.preventDefault()
    if (onOpenInfoModal) {
      onOpenInfoModal(tab)
    }
  }

  return (
    <footer className="w-full border-t border-slate-200/80 bg-white text-slate-600 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 text-left">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-xs">
                <Bot className="h-4.5 w-4.5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Job<span className="text-indigo-600">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Your AI Career Copilot. Search smarter, match opportunities with precision, and automate the tedious stages of your career search.
            </p>
            <div className="pt-2 flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={(e) => handleModalClick('about', e)}
                className="cursor-pointer transition-transform hover:scale-105"
                title="Learn more about CodeByTushu and JobAI"
              >
                <Badge variant="indigo" size="md" className="py-1 px-3 bg-indigo-50/90 text-indigo-700 border-indigo-200 shadow-2xs font-semibold">
                  Powered by CodeByTushu
                </Badge>
              </button>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              {productLinks.map((item) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={(e) => handleProductClick(item.screen, e)}
                    className="text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              {resourceLinks.map((item) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={(e) => handleModalClick(item.tab, e)}
                    className="text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm mb-6">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={(e) => handleModalClick(item.tab, e)}
                    className="text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={(e) => handleModalClick(item.tab, e)}
                    className="text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {currentYear} JobAI Platform. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>and agentic intelligence by</span>
            <button
              type="button"
              onClick={(e) => handleModalClick('about', e)}
              className="font-semibold text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer underline underline-offset-2"
            >
              CodeByTushu
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
