import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

{/* Componente para mostrar as avatares dos DEVS criadores do projeto */}
export function Devs() {
  return (
    <div className="flex gap-1">
      <a href="https://github.com/gabrielricco" target="_blank">
        <Avatar>
          <Avatar className= "border-2 border-violet-800 hover:border-white transition-colors">
            <AvatarImage src="https://github.com/gabrielricco.png" />
            <AvatarFallback>GR</AvatarFallback>
          </Avatar>
        </Avatar>
      </a>

      <a href="https://github.com/Alisongaldino" target="_blank">
        <Avatar>
          <Avatar className= "border-2 border-violet-800 hover:border-white transition-colors">
            <AvatarImage src="https://github.com/Alisongaldino.png" />
            <AvatarFallback>GR</AvatarFallback>
          </Avatar>
        </Avatar>
      </a>

      <a href="https://github.com/naralicecosta" target="_blank">
        <Avatar>
          <Avatar className= "border-2 border-violet-800 hover:border-white transition-colors">
            <AvatarImage src="https://github.com/naralicecosta.png" />
            <AvatarFallback>GR</AvatarFallback>
          </Avatar>
        </Avatar>
      </a>

      <a href="https://github.com/GuilhermeHKS" target="_blank">
        <Avatar>
          <Avatar className= "border-2 border-violet-800 hover:border-white transition-colors">
            <AvatarImage src="https://github.com/GuilhermeHKS.png" />
            <AvatarFallback>GR</AvatarFallback>
          </Avatar>
        </Avatar>
      </a>

      <a href="https://github.com/LucasFranciscoC" target="_blank">
        <Avatar>
          <Avatar className= "border-2 border-violet-800 hover:border-white transition-colors">
            <AvatarImage src="https://github.com/LucasFranciscoC.png" />
            <AvatarFallback>GR</AvatarFallback>
          </Avatar>
        </Avatar>
      </a>

      <a href="https://github.com/Italo-Moura14" target="_blank">
        <Avatar>
          <Avatar className= "border-2 border-violet-800 hover:border-white transition-colors">
            <AvatarImage src="https://github.com/Italo-Moura14.png" />
            <AvatarFallback>GR</AvatarFallback>
          </Avatar>
        </Avatar>
      </a>
    </div>
  )
}