"use client";
import { Select } from "antd";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Locale, routing } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

const languages = [
  { value: "en", label: "En" },
  { value: "kr", label: "Kr" },
];

const LocaleSwitcherSelect = ({ defaultValue, label }) => {
  const router = useRouter();

  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(nextLocale) {
    router.replace({ pathname, params }, { locale: nextLocale });
  }

  return (
    <Select
      value={defaultValue}
      variant="borderless"
      onChange={onSelectChange}
      style={{ width: "100%", maxWidth: "120px" }}
      options={routing.locales.map(({ value, label }) => ({
        //   options={languages.map(({ value, label, flag }) => ({
        value,
        label: (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* <img src={flag} alt={label} width="20" /> */}
            {label}
          </div>
        ),
      }))}
    />
  );
};

export default LocaleSwitcherSelect;
