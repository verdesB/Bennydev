'use client'

import { useState, useEffect, useMemo } from 'react'
import { useAdminTickets } from '@/hooks/useAdminTickets'
import { FilterPanel } from './components/FilterPanel'
import { TicketsList } from './components/TicketsList'
import { ErrorMessage } from './components/ErrorMessage'
import { SparklesBackground } from './components/SparklesBackground'

const TicketsPage = () => {
  const [mounted, setMounted] = useState(false)
  const {
    tickets,
    projects,
    loading,
    error,
    stats,
    selectedStatus,
    setSelectedStatus,
    selectedProject,
    setSelectedProject
  } = useAdminTickets()

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const statusMatch = selectedStatus === 'all' || ticket.status === selectedStatus
      const projectMatch = selectedProject === 'all' || ticket.project?.id === selectedProject
      return statusMatch && projectMatch
    })
  }, [tickets, selectedStatus, selectedProject])

  if (error) return <ErrorMessage error={error} />

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50/50 shadow-xl rounded-2xl">
      <FilterPanel 
        stats={stats}
        selectedStatus={selectedStatus}
        selectedProject={selectedProject}
        setSelectedStatus={setSelectedStatus}
        setSelectedProject={setSelectedProject}
        projects={projects}
      />

      <div className="flex-1 p-6 relative">
        <SparklesBackground mounted={mounted} />
        
        <div className="relative z-10 w-full px-4">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Gestion des tickets
          </h1>

          <TicketsList 
            tickets={filteredTickets} 
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

export default TicketsPage
