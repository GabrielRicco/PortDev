/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Plus } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { api } from "@/lib/api";
import axios from "axios";
import { UserProps } from "./Card";

import Logo from '../../public/logo.png'

interface AddProjectProps {
  user: UserProps
  onProjectAdd: (newProjects: any) => void
}

{/* Componente de adicionar projetos */}
export function AddProject({ user, onProjectAdd }: AddProjectProps) {
  {/* Estado para validar se o modal de adicionar projeto está aberto ou não */}
  const [isModalProjectOpen, setIsModalProjectOpen] = useState(false)

  {/* Estados feitos para pegar o valor de cada informação do modal de adicionar projetos(nome, imagem e info) */}
  const [newProjectName, setNewProjectName] = useState<string>("")
  const [newProjectImage, setNewProjectImage] = useState<File | null>(null)
  const [newProjectInfo, setNewProjectInfo] = useState<string>("")

  {/* Estado feito para pegar o nome dos repositórios do usuário no Github */}
  const [repos, setRepos] = useState<[]>([])

  {/* useEffect criando para pegar o nome dos repo sempre que o usuário mudar */}
  useEffect(() => {
    handleUserRepos()

    async function handleUserRepos() {
      const responseRepos = await axios.get(`https://api.github.com/users/${user.login}/repos`)
      setRepos(responseRepos.data)
    }
  }, [user])

  {/* Função para abrir modal de adicionar projetos */}
  function openModalProject() {
    setIsModalProjectOpen(true)
  }

  {/* Função para fechar modal de adicionar projetos */}
  function closeModalProject() {
    setIsModalProjectOpen(false)
  }

  {/* Função feita para pegar nome do projeto */}
  function handleNewProjectName(addProjectName: string) {
    setNewProjectName(addProjectName)
  }

  {/* Função feita para pegar a imagem que eu selecionei */}
  async function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if(!files) {
      return
    }

    const selectedFile = files[0]
    setNewProjectImage(selectedFile)
  }

  {/* Script para me retornar a URl da imagem */}
  const previewURL = useMemo(() => {
    if(!newProjectImage) {
      return ""
    }

    return URL.createObjectURL(newProjectImage)
  }, [newProjectImage])

  {/* Função para adicionar o projeto ao array de projetos */}
  async function handleNewProject() {
    await api.post(`/projects/`, {
      name: newProjectName,
      photo: previewURL,
      description: newProjectInfo,
      user,
    })

    const newProjects = await api.get(`projects/user/${user.id}`)
    onProjectAdd(newProjects.data)

    setIsModalProjectOpen(false)
    setNewProjectName("")
    setNewProjectImage(null)
    setNewProjectInfo("")
  }

  return (
    <>
    <Button onClick={openModalProject} variant={"link"} className="flex items-center justify-between gap-2 text-base hover:text-white transition-colors" >
      <Plus />
      <p>Adicionar projeto</p>
    </Button>

    {isModalProjectOpen && (
      <div className="z-20 backdrop-blur-sm h-full w-full fixed top-0 left-0 flex items-center justify-center">
        <div className="bg-background p-7 rounded border-2 border-violet-700 flex flex-col gap-5 w-1/3">
          <header className="flex items-center justify-center w-full -mt-8 -mb-5">
            <img className="w-28" src={Logo} alt="Logo do PortDev" />
          </header>

          <h2 className="flex items-center justify-center">Adicione seu projeto</h2>

          <Select onValueChange={(addProjectName) => handleNewProjectName(addProjectName)} required>
            <SelectTrigger className="rounded mb-5">
              <SelectValue placeholder="Selecione um projeto para adicionar..." />
            </SelectTrigger>
            <SelectContent className="rounded max-h-80">
              {repos.map((repo: any) => (
                <SelectItem key={repo.name} value={repo.name}>
                  {repo.name} 
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <label htmlFor="image" className="rounded h-72 bg-background border cursor-pointer text-sm text-muted-foreground flex flex-col items-center justify-center gap-2">
            {previewURL ? (
              <img src={previewURL} className="pointer-events-none h-full w-full rounded" />
            ) : (
              <>
                <Image size={30} />
                Selecione uma imagem
              </>
            )}
          </label>
          <input id="image" className="sr-only" type="file" accept="image/*" onChange={handleFileSelected} />

          <Textarea 
            value={newProjectInfo} 
            onChange={(e) => setNewProjectInfo(e.target.value)}
            placeholder="Descreva brevemente seu projeto..." 
            className="rounded leading-relaxed resize-none h-36" 
          />

          <div className="flex items-center justify-end gap-6">
              <Button 
                variant="destructive" 
                className="rounded hover:scale-125 transition-transform" 
                onClick={closeModalProject}
              >
                Fechar
              </Button>

              <Button 
                variant="secondary" 
                className="rounded hover:scale-125 transition-transform" 
                type="submit" 
                disabled={!newProjectName || !newProjectImage || !newProjectInfo} 
                onClick={handleNewProject}
              >
                Salvar
              </Button>
            </div>
        </div>
      </div>
    )}
    </>
  )
}