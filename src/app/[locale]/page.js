"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const [activeIndex, setActiveIndex] = useState(null);
 const [closingIndex, setClosingIndex] = useState(null);


  const handleCardClick = (index, hasItems) => {
    if (!hasItems) return;
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

    const handleClose = (e, index) => {
    e.stopPropagation();
    setClosingIndex(index);
    setTimeout(() => {
      setClosingIndex(null);
      setActiveIndex(null);
    }, 500); 
  };

  const layers = [
    {
      icon: "/icons/compute.svg",
      title: t("layers.title_1"),
      text: t("layers.text_1"),
    },
    {
      icon: "/icons/network.svg",
      title: t("layers.title_2"),
      text:  t("layers.text_2"),
      items: [
         t("layers.item_1"),
         t("layers.item_2"),
         t("layers.item_3"),
         t("layers.item_4"),
         t("layers.item_5"),
         t("layers.item_6"),
      ],
    },
    {
      icon: "/icons/storage.svg",
      title: t("layers.title_3"),
      text:  t("layers.text_3"),
    },
    {
      icon: "/icons/network.svg",
      title: t("layers.title_4"),
      text:  t("layers.text_4"),
    },
  ];
  return (
    <>
      <div className="bg-[url('/backgrounds/home.svg')] bg-no-repeat bg-cover bg-center w-full h-[670px]">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-[530px]">
            <h1 className="text-5xl font-bold text-light-50 text-center leading-16">
              {t("hero_title")}
            </h1>
            <p className="text-xl font-medium text-light-50 text-center mt-4">
              {t("hero_text")}
            </p>

            <div className="mt-11 flex justify-center">
              <button className="text-[17px] text-light-50 font-medium bg-secondary-500 hover:bg-secondary-900 cursor-pointer rounded-[30px] px-7 py-4 transition-all ease-in-out">
                {t("hero_button")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="custom-container bg-white pt-36 pb-24">
        <div className="flex flex-col items-center w-full">
          <div className="max-w-[620px]">
            <h2 className="text-black text-4xl font-semibold text-center">
              {t("title_1")}
            </h2>
            <p className="text-gray-300 text-lg mt-5 text-center">
              {t("text_1")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-[60px] gap-y-[50px] pt-20">
          {layers.map((item, index) => {
            const hasItems = item.items && item.items.length > 0;
            const isActive = activeIndex === index;
                const isClosing = closingIndex === index;

            return (
              <div
                key={index}
                className={`overflow-hidden transition-all duration-500 ${
                    isActive && !isClosing
                ? "animate-slide-up"
                : isClosing
                ? "animate-slide-down"
                : ""
                }`}
              >
                {!isActive && (
                  <div className="bg-purple-50 p-[30px] rounded-[20px]">
                    <div className="bg-purple-500 rounded-full w-[58px] h-[58px] flex justify-center items-center">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={24}
                        height={24}
                      />
                    </div>
                    <p className="text-2xl font-bold mt-5">{item.title}</p>
                    <div className="flex justify-between items-center w-full gap-x-3">
                      <p className="text-lg text-gray-900 mt-2.5">
                        {item.text}
                      </p>
                      {hasItems && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(index, hasItems);
                          }}
                          className="cursor-pointer"
                        >
                          <Image
                            src="/icons/arrow-down.svg"
                            alt="arrow"
                            width={30}
                            height={30}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                )}
                {isActive && hasItems && (
                  <div className="bg-purple-100 p-[30px] rounded-[20px] h-full">
                    <div className="flex justify-between items-center mb-[30px]">
                      <h3 className="text-gray-300 text-2xl font-bold border-b-2 border-b-gray-200">{item.title}</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClose(e, index)
                        }}
                        className="cursor-pointer"
                      >
                        <Image
                          src="/icons/arrow-down.svg"
                          className="rotate-180"
                          alt="arrow"
                          width={30}
                          height={30}
                        />
                      </button>
                    </div>
                    <ul className="space-y-2 flex items-center gap-x-2 flex-wrap max-w-[330px]">
                      {item.items.map((subItem, idx) => (
                        <li key={idx} className="text-purple-500 text-lg hover:font-bold hover:underline underline-offset-4 mr-2.5 pb-0.5">
                          {subItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-light-300 py-[120px]">
        <div className="custom-container">
          
        </div>
      </div>
    </>
  );
}
