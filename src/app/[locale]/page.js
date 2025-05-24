import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <>
      <div className="bg-[url('/backgrounds/home.svg')] w-full h-[670px]">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-[530px]">
            <h1 className="text-5xl font-bold text-light-50 text-center leading-16">
              {t("hero_title")}
            </h1>
            <p className="text-xl font-medium text-light-50 text-center mt-4">{t("hero_text")}</p>

            <div className="mt-11 flex justify-center">
              <button className="text-[17px] text-light-50 font-medium bg-secondary-500 hover:bg-secondary-900 cursor-pointer rounded-[30px] px-7 py-4 transition-all ease-in-out">
                {t("hero_button")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
