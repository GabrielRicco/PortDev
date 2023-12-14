import { Pencil, InstagramLogo, GithubLogo, LinkedinLogo } from "@phosphor-icons/react"
import { Separator } from "./ui/separator"
import { useEffect, useState } from "react"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { api } from "@/lib/api"
import { UserProps } from "./Card"

import Logo from '../../public/logo.png'

{/* Componente das redes sociais */}
export function SocialMedia(props: UserProps) {
  {/* Estados feitos para pegar as URL colocadas nos input */}
  const [linkInstagramUrl, setLinkInstagramUrl] = useState<string>()
  const [linkGithubUrl, setLinkGithubUrl] = useState<string>()
  const [linkLinkedinUrl, setLinkLinkedinUrl] = useState<string>()

  {/* Estado feito para validar se o modal de links ta aberto ou não */}
  const [isModalLinkOpen, setIsModalLinkOpen] = useState(false)

  {/* useEffect feito para pegar as rede sociais do usuário no banco de dados sempre que o usuário mudar */}
  useEffect(() => {
    handleSocialMedia()

    async function handleSocialMedia() {
      const userInfo = await api.get(`/users/${props.id}`)
      setLinkInstagramUrl(userInfo.data.instagram)
      setLinkGithubUrl(userInfo.data.github)
      setLinkLinkedinUrl(userInfo.data.linkedin)
    }
  }, [props.id])

  {/* Função feita para abrir o modal de links */}
  async function openModalLinks() {
    setIsModalLinkOpen(true)
  }

  {/* Função feita para fechar o modal de links */}
  function closeModalLinks() {
    setIsModalLinkOpen(false)
  }

  {/* Função para salvar os links digitados dentro do modal, que também acaba fechando o modal */}
  async function saveLinkUrl() {
    await api.put(`/users/${props.id}`, {
      instagram: linkInstagramUrl,
      github: linkGithubUrl,
      linkedin: linkLinkedinUrl
    })

    setIsModalLinkOpen(false)
  }

  return (
    <div className="px-10">
    <button onClick={openModalLinks} className="flex relative left-48 top-4"><Pencil className="hover:scale-150 transition-transform cursor-pointer" /></button>

    <div className="flex items-center justify-center gap-6 mt-8 mb-8">
      <a href={linkInstagramUrl} target="_blank"><InstagramLogo className="hover:scale-150 transition-transform" size={26} /></a>
      <Separator className="h-6" orientation="vertical" />
      <a href={linkGithubUrl} target="_blank"><GithubLogo className="hover:scale-150 transition-transform" size={26} /></a>
      <Separator className="h-6" orientation="vertical" />
      <a href={linkLinkedinUrl} target="_blank"><LinkedinLogo className="hover:scale-150 transition-transform" size={26} /></a>
    </div>

    {isModalLinkOpen && (
          <div className="z-20 backdrop-blur-sm h-full w-full fixed top-0 left-0 flex items-center justify-center">
            <div className="bg-background p-7 rounded border-2 border-violet-700 flex flex-col gap-5">
              <header className="flex items-center justify-center w-full -mt-8 -mb-5">
                <img className="w-28" src={Logo} alt="Logo do PortDev" />
              </header>
              <div className="flex items-center gap-3">
                <Label htmlFor="instagram"><InstagramLogo size={24} /></Label>
                <Input
                  className="w-96 rounded"
                  id="instagram"
                  name="instagram"
                  type="text"
                  placeholder="Digite a URL do seu Instagram..."
                  value={linkInstagramUrl}
                  onChange={(e) => setLinkInstagramUrl(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <Label htmlFor="github"><GithubLogo size={24} /></Label>
                <Input
                  className="w-96 rounded"
                  id="github"
                  name="github"
                  type="text"
                  placeholder="Digite a URL do seu GitHub..."
                  value={linkGithubUrl}
                  onChange={(e) => setLinkGithubUrl(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <Label htmlFor="linkedin"><LinkedinLogo size={24} /></Label>
                <Input
                  className="w-96 rounded"
                  id="linkedin"
                  name="linkedin"
                  type="text"
                  placeholder="Digite a URL do seu Linkedin..."
                  value={linkLinkedinUrl}
                  onChange={(e) => setLinkLinkedinUrl(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-6">
                <Button 
                  variant="destructive" 
                  className="rounded hover:scale-125 transition-transform" 
                  onClick={closeModalLinks}
                >
                  Fechar
                </Button>

                <Button 
                  variant="secondary" 
                  className="rounded hover:scale-125 transition-transform" 
                  type="submit" 
                  disabled={!linkInstagramUrl || !linkGithubUrl || !linkLinkedinUrl} 
                  onClick={saveLinkUrl}
                >
                  Salvar
                </Button>
              </div>
            </div>
          </div>
    )}
  </div>
  )
}