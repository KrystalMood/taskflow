import { Card, CardContent } from "@/components/ui";
import Image from "next/image";

export function CreatorProfile() {
  return (
    <Card className="overflow-hidden">
      <div className="bg-brand-900 h-24 w-full"></div>
      <CardContent className="-mt-12 text-center">
        <div className="ring-brand-50 mx-auto h-24 w-24 overflow-hidden rounded-full bg-white p-1 ring-4">
          <div className="bg-brand-100 flex h-full w-full items-center justify-center rounded-full text-2xl">
            <Image
              src="/images/avatar.png"
              alt="Avatar"
              width={96}
              height={96}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-brand-900 text-xl font-bold">
            Pramudya Surya Anggara Putra
          </h3>
          <p className="text-brand-500 font-medium">Full Stack Developer</p>
        </div>

        <p className="text-brand-600 mt-4 text-sm leading-relaxed">
          Passionate about building scalable web applications and crafting
          intuitive user experiences.
        </p>

        <div className="mt-6 flex justify-center gap-4 border-t pt-6">
          <a
            href="https://github.com/KrystalMood"
            className="text-brand-600 hover:text-brand-900 text-sm font-medium transition-colors"
          >
            GitHub
          </a>
          <span className="text-brand-300">|</span>
          <a
            href="https://www.linkedin.com/in/pramudyasurya"
            className="text-brand-600 hover:text-brand-900 text-sm font-medium transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
