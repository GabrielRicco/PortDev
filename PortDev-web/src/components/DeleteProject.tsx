/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select"
import { useState } from "react";
import { api } from "@/lib/api";
import { ProjectsProps, UserProps } from "./Card";

import Logo from '../../public/logo.png'

interface DeleteProjectProps {
  user: UserProps
  projects: ProjectsProps[]
  onProjectDelete: (newProjects: any) => void
}

{/* Componente de deletar projeto */}
export function DeleteProject({ user, projects, onProjectDelete }: DeleteProjectProps) {
  {/* Estado para validar se o modal de excluir projeto está aberto ou não */}
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

  {/* Estado para pegar o nome do projeto que selecionei para deletar */}
  const [deletedProjectId, setDeletedProjectId] = useState<string>()

  {/* Função para abrir o modal de excluir projetos */}
  function openModalDelete() {
    setIsModalDeleteOpen(true)
  }

  {/* Função para fechar o modal de excluir projetos */}
  function closeModalDelete() {
    setIsModalDeleteOpen(false)
  }

  {/* Função para pegar o nome do projeto que eu selecionei para excluir */}
  function handleDeleteProject(projectDeleteId: string) {
    setDeletedProjectId(projectDeleteId)
  }

  {/* Função para excluir projeto */}
  async function deleteProject() {
    const projectToDelete = projects.find((project => project.id == deletedProjectId))
    if(projectToDelete) {
      await api.delete(`/projects/${projectToDelete.id}`)
    }

    const newProjects = await api.get(`/projects/user/${user.id}`)
    onProjectDelete(newProjects.data)

    setIsModalDeleteOpen(false)
  }

  return (
    <>
    <Button onClick={openModalDelete} variant={"link"} className="flex items-center text-red-900 justify-between gap-2 text-base hover:text-red-600 transition-colors" >
      <Trash />
      <p>Excluir Projeto</p>
    </Button>

    {isModalDeleteOpen && (
      <div className="z-20 backdrop-blur-sm h-full w-full fixed top-0 left-0 flex items-center justify-center">
        <div className="bg-background p-7 w-96 rounded border-2 border-violet-700 flex flex-col gap-5">
          <header className="flex items-center justify-center w-full -mt-8 -mb-5">
            <img className="w-28" src={Logo} alt="Logo do PortDev" />
          </header>

          <Select onValueChange={(projectDeleteId) => handleDeleteProject(projectDeleteId)}>
            <SelectTrigger className="rounded mb-10">
              <SelectValue placeholder="Selecione um projeto para excluir..." />
            </SelectTrigger>
            <SelectContent className="rounded">
              {projects.map((project: any) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name} 
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center justify-end gap-6">
            <Button 
              variant="destructive" 
              className="rounded hover:scale-125 transition-transform" 
              onClick={closeModalDelete}
            >
              Fechar
            </Button>

            <Button 
              variant="secondary" 
              className="rounded hover:scale-125 transition-transform" 
              type="submit" 
              disabled={!deletedProjectId} 
              onClick={deleteProject}
            >
              Deletar
            </Button>
          </div>
        </div>
      </div>        
    )}
    </>
  )
}