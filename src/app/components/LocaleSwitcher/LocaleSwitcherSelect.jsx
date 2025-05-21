"use client";

import { Select } from "antd";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const languages = [
  { value: "en", label: "English" },
  { value: "kr", label: "Korean" },
];

const LocaleSwitcherSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (nextLocale) => {
    router.replace({ pathname }, { locale: nextLocale });
  };

  return (
    <Select
      value={locale}
      onChange={handleChange}
      style={{ width: 150 }}
      options={languages.map(({ value, label }) => ({
        value,
        label: (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            
            {label}
          </div>
        ),
      }))}
    />
  );
};

export default LocaleSwitcherSelect;
