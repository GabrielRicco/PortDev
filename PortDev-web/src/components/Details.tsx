import { Separator } from "./ui/separator";

interface DetailsProps {
  name: string | undefined;
  photo: string | undefined;
  description: string | undefined;
}

{/* Componente Details onde tem os detalhes do projeto selecionado */}
export function Details({ name, description, photo }: DetailsProps) {
  return (
    <div className="flex gap-20 h-full">
      <Separator className="h- w-1 rounded-full" orientation="vertical" />
      
      <div className="flex flex-col items-start gap-10 w-[750px]">
        <h1 className="text-4xl">{name}</h1>

        {photo && <img src={photo} alt={name} className="rounded w-[650px] h-[350px] border-2 border-violet-600" />}

        <p className="text-foreground text-base max-w-[680px] break-words">{description}</p>
      </div>
    </div>
  )
}