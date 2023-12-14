import { Button } from "@/components/ui/button";
import queryString from "query-string";

import Logo from '../../public/logo.png'

{/* Componente Home, onde tem a tela de login */}
export function Home() {
  {/* Função para ser redirecionado para a página de autenticação do Github */}
  function handleGithubLogin() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize'
    const params = {
      response_type: 'code',
      scope: 'user',
      client_id: import.meta.env.VITE_REACT_APP_CLIENT_ID,
    }
    const queryStrings = queryString.stringify(params)

    const authURL = `${GITHUB_URL}?${queryStrings}`
    window.location.href = authURL
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="border-4 border-violet-600 rounded-3xl flex flex-col p-6">
        <h1 className="-mt-16">
          <img src={Logo} alt="Logo do PortDev" />
        </h1>

        <Button onClick={handleGithubLogin} className="rounded-3xl p-8 flex items-center justify-center">
          ENTRAR COM GITHUB
        </Button>
      </div>
    </div>
  )
}