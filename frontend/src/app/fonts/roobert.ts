// app/fonts/roobert.ts
import localFont from "next/font/local";

export const roobert = localFont({
  src: [
    { path: "../../../public/fonts/roobert/RoobertUprightsVF.woff2", style: "normal", weight: "100 900" },
    { path: "../../../public/fonts/roobert/RoobertItalicsVF.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-roobert",
  display: "swap",
});
