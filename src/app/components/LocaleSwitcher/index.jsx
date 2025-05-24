import { useLocale } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

export default function LocaleSwitcher() {
  const locale = useLocale();

  return (
    <div className="">
      <LocaleSwitcherSelect defaultValue={locale} />
    </div>
  );
}
