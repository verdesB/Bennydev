import ChatButton from "../components/ChatButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero2 from "../components/Hero2";
import ProjectForm from "../components/ProjectForm/ProjectForm";

const DemarrerUnProjet = () => {
  return(
    <> 
    <Header pathname={'/demarrer-un-projet'} />
    <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <Hero2 
        title="Démarrer un projet"
        subtitle="Comment démarrer un projet avec Bennydev ?"
      />
      <ProjectForm />
      
      
      
      <div className="absolute inset- bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] z-1" />
    </main>
    <Footer />
    <ChatButton />
    </>
  )
}

export default DemarrerUnProjet;