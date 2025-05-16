import Image from "next/image";
import { getInstructorImage } from "@/lib/getInstructorImage";

type Props = {
  name: string;
  title: string;
};

export function InstructorCard({ name, title }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Image
        src={getInstructorImage(name)}   // ↖︎  /images/instructors/funda_lena.webp
        alt={name}
        width={240}
        height={240}
        className="rounded-full object-cover"
        sizes="(min-width:768px) 200px, 40vw"
        priority={false}
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
}
