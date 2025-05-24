"use client";

import { Select } from "antd";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import WorldIcon from "./../../../../public/icons/world.svg";

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
      variant="borderless"
      suffixIcon={<WorldIcon />}
      style={{ width: 65 }}
      placement="bottomLeft"
      options={languages.map(({ value, label }) => ({
        value,
        label: (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {value}
          </div>
        ),
      }))}
    />
  );
};

export default LocaleSwitcherSelect;
