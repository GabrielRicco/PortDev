import { useEffect, useState } from "react";
import { Card, ProjectsProps } from "../components/Card";
import { Details } from "../components/Details"
import { api } from "@/lib/api";

import Logo from '../../public/logo.png'
import { Devs } from "@/components/Devs";
import { Button } from "@/components/ui/button";
import { ArrowArcLeft } from "@phosphor-icons/react";

{/* Componente PortDev, onde está tudo da tela principal */}
export function Portdev() {
  {/* Estado feito para pegar o valor do projeto selecionado */}
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  {/* Estado feito para pegar o array de projetos */}
  const [projectsArray, setProjectsArray] = useState<ProjectsProps[]>([])

  {/* useEffect criando para pegar os projetos no banco de dados sempre que o valor do projeto selecionado mudar */}
  useEffect(() => {
    getProjects()

    async function getProjects() {
      const responseProjects = await api.get("/projects/")
      setProjectsArray(responseProjects.data)  
    }
  }, [selectedProjectId])

  {/* Função feita para esconder os detalhes do projeto */}
  function backToNormal() {
    setSelectedProjectId("")
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-10">
      <header className="flex items-center justify-center w-full -mt-10 -mb-10">
        <img className="w-48 h-full" src={Logo} alt="Logo do PortDev" />
      </header>

      <main className="flex flex-row items-center justify-center bg-transparent rounded-3xl border-4 border-violet-950">
        {/* Pegando o nome do projeto e o array de projetos dentro do componente Card */}
        <Card onProjectSelect={setSelectedProjectId} onProjectsArray={setProjectsArray} />

        <div className={`flex flex-row transition-opacity duration-700 ease-in-out ${selectedProjectId ? 'opacity-100 translate-x-16' : 'opacity-0 translate-x-0'}`}>
        {/* Verificando se o projeto foi selecionado, se foi, irá mostrar os detalhes do projeto */}
        {selectedProjectId && (
          <>
            <Details
              name={projectsArray.find((project: { id: string; }) => project.id === selectedProjectId)?.name}
              photo={projectsArray.find((project: { id: string; }) => project.id === selectedProjectId)?.photo}
              description={projectsArray.find((project: { id: string; }) => project.id === selectedProjectId)?.description}
            />

            <Button className="rounded-full relative right-36" onClick={backToNormal}>
              <ArrowArcLeft />
            </Button>
          </>
        )}
        </div>
      </main>

      <footer className="mt-12">
        <p className="flex flex-col items-center gap-2">Projeto feito pelos DEV'S <Devs /></p>
      </footer>
    </div>
  )
}