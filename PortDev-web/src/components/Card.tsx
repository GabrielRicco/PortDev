import { SignOut } from "@phosphor-icons/react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { useState, useEffect } from "react";
import { SocialMedia } from "./SocialMedia";
import { NavLink } from "react-router-dom";
import { api } from "@/lib/api";
import queryString from "query-string";

import { AddProject } from "./AddProject";
import { DeleteProject } from "./DeleteProject";
import { Loading } from "./Loading";

interface CardProps {
  onProjectSelect: (projectId: string) => void
  onProjectsArray: (projectsArray: ProjectsProps[]) => void
}

export interface ProjectsProps {
  id: string;
  name: string;
  photo: string;
  description: string;
}

export interface UserProps {
  id: string 
  login: string 
  name: string 
  bio: string 
  avatar_url: string 
  instagram: string 
  github: string 
  linkedin: string 
}

{/* Componente Card onde tem as informções do usuário logado */}
export function Card(props: CardProps) {
  {/* Estado para pegar o usuário no banco de dados */}
  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    login: "",
    bio: "",
    avatar_url: "",
    github: "",
    instagram: "",
    linkedin: ""
  })

  {/* Estado para pegar o array de projetos no banco de dados */}
  const [projects, setProjects] = useState<ProjectsProps[]>([])

  const [isLoading, setIsLoading] = useState(true)
  
  {/* useEffect feito para fazer a autenticação do usuário logado pelo github */}
  useEffect(() => {
    handleGitHubRedirect()

    async function handleGitHubRedirect() {
      if(!isLoading) {
        return
      }

      const storedUserString = localStorage.getItem("user")
      if(!storedUserString) {
        const { code } = queryString.parse(window.location.search);

        const response = await api.post('/auth/', {
          code,
        })

        const userInfo = response.data

        const newUser = await api.get(`/users/${userInfo.id}`)
        setUser(newUser.data)

        localStorage.setItem("user", JSON.stringify(newUser.data))

        setIsLoading(false)

        return
      } else {
        const storedUser = JSON.parse(storedUserString) as UserProps
        setUser(storedUser)
        setIsLoading(false)
      }
    }
  }, [isLoading]);

  {/* useEffect feito para pegar projetos do usuário no banco de dados sempre que o usuário mudar */}
  useEffect(() => {
    getProjects()

    async function getProjects() {
      const responseProjects = await api.get(`/projects/user/${user.id}`)
      setProjects(responseProjects.data)  
    }
  }, [user])

  {/* Função feita para pegar o nome do projeto selecionado e passar para outro componente */}
  function handleProjectSelect(projectId: string) {
    props.onProjectSelect(projectId)
  }

  {/* Função para remover usuário do local storage */}
  function removeUserFromStorage() {
    localStorage.removeItem("user")
  }

  return (
    isLoading ? <Loading /> : (
    <div className={`border-4 border-violet-600 p-9 rounded-3xl flex flex-col items-center justify-center z-10`}>
      <div className="text-violet-700 cursor-pointer w-full flex items-end justify-end relative top-3">
        <NavLink to={"/"}>
          <SignOut onClick={removeUserFromStorage} size={30} className="hover:scale-150 hover:text-white transition-all" />
        </NavLink>
      </div>

      <Avatar className="h-56 w-60 mb-6 border-4 border-violet-800 hover:border-white transition-colors">
        <AvatarImage src={user.avatar_url} />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>

      <h1 className="text-xl font-bold">{user.name}</h1>
      <p className="text-sm font-extralight text-center max-w-[350px] break-words">{user?.bio}</p>

      <SocialMedia {...user} />

      <Select onValueChange={(projectId) => handleProjectSelect(projectId)}>
        <SelectTrigger className="rounded mb-5">
          <SelectValue placeholder="Selecione um projeto..." />
        </SelectTrigger>
        <SelectContent className="rounded">
          {Array.isArray(projects) && projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
                {project.name} 
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <AddProject user={user} onProjectAdd={setProjects} />

      <DeleteProject user={user} projects={projects} onProjectDelete={setProjects} />
    </div>
    )
  )
}