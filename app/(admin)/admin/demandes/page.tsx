'use client'

import  useDemandeLogic from './hooks/useDemandeLogic'
import Header from './components/Header'
import FileCard from './components/FileCard'
import Loading from './Loading'
import Error from './Error'

const DemandePage = () => {
    const {
        files,
        loading,
        error,
        expandedFiles,
        takenRequests,
        toggleExpand,
        markFileAsViewed
    } = useDemandeLogic()

    if (loading) return <Loading />
    if (error) return <Error error={error} />

    return (
        <div className="container mr-auto p-8 max-w-7xl">
            <Header files={files} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {files.map((file) => (
                    <FileCard 
                        key={file.id}
                        file={file}
                        expandedFiles={expandedFiles}
                        toggleExpand={toggleExpand}
                        markFileAsViewed={markFileAsViewed}
                        takenRequests={takenRequests}
                    />
                ))}
            </div>
        </div>
    )
}

export default DemandePage
