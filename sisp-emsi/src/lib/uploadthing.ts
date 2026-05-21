import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // 1. Ta route existante pour les justificatifs académiques
  justificatifUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
    pdf: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("Upload justificatif terminé :", file.url);
  }),

  // 2. LA NOUVELLE ROUTE : Pour la photo de profil (limitée aux images de 2Mo)
  avatarUploader: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("Upload avatar terminé :", file.url);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;