'use client'

import { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { sections } from './section.data'
import { SectionItem } from './types'

const HelpPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSection, setActiveSection] = useState('introduction')

  useEffect(() => {
    const section = searchParams.get('section')
    if (section) {
      setActiveSection(section)
    }
  }, [searchParams])



  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId)
    router.push(`/client/help?section=${sectionId}`)
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden rounded-2xl shadow-[0_4px_20px_-1px_rgba(147,51,234,0.2)] hover:shadow-[0_4px_20px_-1px_rgba(147,51,234,0.3)] transition-shadow">
      <aside className="w-[300px] border-r border-[#E7E7E7] bg-white flex flex-col">
        <div className="shrink-0 p-6 border-b border-[#E7E7E7]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#919191]" />
            <Input
              placeholder="Rechercher..."
              className="pl-10 h-9 bg-[#F5F5F7] border-none rounded-lg text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="px-3 py-4">
            {sections.map((section) => (
              <div key={section.id} className="mb-6">
                <h4 className="px-3 mb-2 text-xs font-semibold text-[#919191] uppercase tracking-wider">
                  {section.title}
                </h4>
                <div className="space-y-0.5">
                  {section.items.map((item: SectionItem) => (
                    <button
                      key={item.id}
                      onClick={() => handleSectionChange(item.id)}
                      className={cn(
                        "w-full text-left text-sm py-2 px-3 rounded-md transition-colors duration-200",
                        activeSection === item.id 
                          ? "bg-[#F5F5F7] text-black font-medium" 
                          : "text-[#434343] hover:bg-[#F5F5F7]/50"
                      )}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[#FBFBFB]">
        <div className="h-full">
          <div className="max-w-3xl mx-auto px-8 py-12">
            {sections.map((section) => 
              section.items.map((item: SectionItem) => 
                activeSection === item.id && (
                  <div key={item.id} className="space-y-8 animate-in fade-in duration-300">
                    <div>
                      <h1 className="text-4xl font-medium text-black mb-3">
                        {item.title}
                      </h1>
                      <p className="text-[#919191] text-lg">
                        {section.title}
                      </p>
                    </div>
                    <Separator className="bg-[#E7E7E7]" />
                    <div className="prose prose-slate max-w-none">
                      {item.content }
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default HelpPage