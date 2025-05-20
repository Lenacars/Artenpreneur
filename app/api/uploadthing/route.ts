import { createUploadthing, type FileRouter } from "uploadthing/next";
import { createRouteHandler } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  videoUploader: f({ video: { maxFileSize: "4GB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("Yüklenen dosya:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

// Next.js app router ile uyumlu handler exportu
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
