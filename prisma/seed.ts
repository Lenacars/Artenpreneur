import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.video.create({
    data: {
      title: "Örnek Video",
      description: "Bu bir test videosudur",
      videoUrl: "https://cdn.site.com/video.mp4",  
      duration: 120,
      price: 0,
    },
  });

  console.log("✅ Seed tamamlandı.");
}

main()
  .catch((e) => {
    console.error("Hata:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
