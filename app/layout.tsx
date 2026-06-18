import type { Metadata } from "next";
import "./globals.css";


export const metadata = {
  title: 'Mohamed Wageh | Portfolio',
  description: 'البورتفوليو الرسمي لمحمد وجيه (Mohamed Wageh)، مهندس تعلم آلة وعالم بيانات متخصص في الذكاء الاصطناعي، الرؤية الحاسوبية، وتطوير نماذج بايثون.',
  keywords: 'محمد وجيه, بورتفوليو محمد وجيه, محمد وجيه ابو سليم, Mohamed Wageh, Mohamed Wageh Abou Selim, wagehii, Zain, زين, Mohamed Wageh Portfolio, Machine Learning Engineer Egypt, Data Scientist, مهندس ذكاء اصطناعي, عالم بيانات, مهندس تعلم آلة, مطور بايثون, Mansoura University, جامعة المنصورة, حاسبات ومعلومات المنصورة, Computer Vision, YOLO, Python Developer, C++, Deep Learning, الذكاء الاصطناعي, ODESDA, DEPI, رواد مصر الرقمية, CAT Reloaded, Freelance ML Engineer',
  authors: [{ name: 'Mohamed Wageh' }] ,
   icons: {
    icon: "/wagehii.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#020817] text-white font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
