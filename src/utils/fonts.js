import localFont from "next/font/local";

export const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/Poppins-Regular.woff",
      weight: "400",
      style: "medium",
    },
    {
      path: "../../public/fonts/Poppins-Medium.woff",
      weight: "500",
      style: "semibold",
    },
    {
      path: "../../public/fonts/Poppins-SemiBold.woff",
      weight: "600",
      style: "bold",
    },
    {
      path: "../../public/fonts/Poppins-Bold.woff",
      weight: "700",
      style: "extrabold",
    },
  ],
});
