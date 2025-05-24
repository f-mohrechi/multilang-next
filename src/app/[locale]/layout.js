import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ClientWrapper from "./ClientWrapper";
import { poppins } from "../../utils/fonts";
import "./styles/globals.css"
import "./styles/container.css"

export default async function LocaleLayout({ children, params }) {

  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={poppins.className}>
        <NextIntlClientProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
