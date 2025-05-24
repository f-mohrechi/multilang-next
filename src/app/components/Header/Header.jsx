"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Drawer } from "antd";
import Link from "next/link";
import LocaleSwitcher from "../LocaleSwitcher";

export default function Header() {
  const t = useTranslations("Header");
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMenuItems, setOpenMenuItems] = useState({});
  const [openSubMenuItems, setOpenSubMenuItems] = useState({});

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  //   const handleNavigation = (e, route) => {
  //     e.preventDefault();
  //     router.push(route);
  //   };

  const handleMouseEnter = (key) => {
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleNavigation = (e, route) => {
    e.preventDefault();
    router.push(route);
    onClose(); // close drawer after navigation
  };

  const toggleMenu = (key) => {
    setOpenMenuItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSubMenu = (parentKey, index) => {
    const id = `${parentKey}-${index}`;
    setOpenSubMenuItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const menuItems = [
    {
      key: 2,
      title: t("products"),
      route: "/products",
      hasDropdown: true,
      dropdownLinks: [
        { label: t("compute"), route: "/products/compute" },
        {
          label: t("network"),
          subItems: [
            { label: t("ix_flow"), route: "/products/compute/vm" },
            { label: t("ix_balancer"), route: "/products/compute/k8s" },
            { label: t("ix_tunnel"), route: "/products/compute/k8s" },
            { label: t("ix_secure_connect"), route: "/products/compute/k8s" },
            { label: t("ix_ip"), route: "/products/compute/k8s" },
            { label: t("ix_dns"), route: "/products/compute/k8s" },
          ],
        },
        ,
        {
          label: t("storage_and_backup"),
          route: "/products/storage_and_backup",
        },
        ,
        {
          label: t("security_and_monitoring"),
          route: "/products/security_and_monitoring",
        },
        ,
      ],
    },
    {
      key: 3,
      title: t("marketplace"),
      route: "/marketplace",
    },
    {
      key: 4,
      title: t("solutions"),
      route: "/solutions",
    },
    {
      key: 5,
      title: t("support"),
      route: "/support",
    },
    {
      key: 6,
      title: t("company"),
      route: "/about",
      hasDropdown: true,
      dropdownLinks: [
        { label: t("about"), route: "/about" },
        { label: t("careers"), route: "/careers" },
        ,
        { label: t("contact"), route: "/contact" },
      ],
    },
    { key: 7, title: t("partners"), route: "/partners" },
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white h-14 md:h-20">
      <div className="hidden md:flex items-center h-full">
        <div className="custom-container flex items-center h-full justify-between gap-x-10">
          <div className="flex items-center py-1">
            <Image src="/icons/logo.svg" alt="Dana IX" width={28} height={43} />
          </div>

          <ul className="flex items-center justify-between gap-x-10 h-full text-start list-none">
            {menuItems.map((item) => (
              <li
                key={item.key}
                className={`relative flex items-center gap-x-3 pb-2 text-gray-300 border-b border-b-transparent hover:border-b-primary-900 hover:text-primary-900`}
                onMouseEnter={() => handleMouseEnter(item.key)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={item.route}
                  className="cursor-pointer w-full outline-0 flex items-center font-semibold text-nowrap"
                  onClick={(e) => handleNavigation(e, item.route)}
                >
                  {item.title}
                </a>
                {item.hasDropdown && (
                  <Image
                    src="/icons/arrow-down.svg"
                    alt="arrow-down"
                    width={24}
                    height={24}
                  />
                )}

                {item.hasDropdown && activeDropdown === item.key && (
                  <ul className="absolute top-full right-0 w-fit text-nowrap p-4 bg-white shadow-primary-1 rounded-b-lg z-50">
                    <span className="text-xs text-gray-300 px-5">
                      {item.title}
                    </span>
                    {item.dropdownLinks.map((link, index) => (
                      <div key={index}>
                        <li className="text-gray-500 hover:bg-light-100 w-fit px-1.5 py-1 rounded-[5px] transition-all ease-in">
                          <a
                            href={link.route}
                            className="block py-1 px-2 rounded text-lg text-gray-500"
                            onClick={(e) => handleNavigation(e, link.route)}
                          >
                            {link.label}
                          </a>
                        </li>

                        {link.subItems &&
                          link.subItems.map((subItem, numIndex) => {
                            return (
                              <div key={numIndex} className="px-7 py-0.5">
                                <Link
                                  href={subItem.route}
                                  className="text-sm text-gray-500 hover:text-primary-900"
                                >
                                  {subItem.label}
                                </Link>
                              </div>
                            );
                          })}
                      </div>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-x-3">
            <Link
              href="/contact-sales"
              className="border border-primary-900 px-4 py-2 rounded-[20px] text-primary-900 font-semibold text-nowrap hover:text-white hover:bg-primary-900 transition-all ease-in"
            >
              {t("contact_sales")}
            </Link>

            <LocaleSwitcher />
          </div>
        </div>
      </div>

      {/* mobile version */}

      <div className="flex md:hidden custom-container items-center justify-between gap-x-10 h-full w-full">
        <Link href={"/"}>
          <Image src="/icons/logo.svg" alt="Dana IX" width={20} height={30} />
        </Link>

        <div onClick={showDrawer}>
          <Image src="/icons/hamburger.svg" alt="menu" width={44} height={44} />
        </div>
      </div>

      {openDrawer && (
        <Drawer
          placement={"right"}
          closable={false}
          closeIcon={false}
          onClose={onClose}
          open={openDrawer}
          maskClosable={true}
          width={300}
          key={"right"}
        >
          <div className="flex items-center justify-between w-full">
            <LocaleSwitcher />
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
              >
                <Image
                  src={"/icons/close.svg"}
                  alt="close menu"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
          <ul className="text-start list-none mt-3">
            {/* {menuItems.map((item) => (
              <li key={item.key} className="py-3">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.route}
                    className="text-sm font-medium !text-gray-600"
                    onClick={(e) => handleNavigation(e, item.route)}
                  >
                    {item.title}
                  </Link>
                  {item.hasDropdown && (
                    <button
                      onClick={() => toggleMenu(item.key)}
                      aria-label="Toggle submenu"
                    >
                      <Image
                        src="/icons/arrow-down.svg"
                        alt="toggle"
                        width={22}
                        height={22}
                        className={openMenuItems[item.key] ? "rotate-180" : ""}
                      />
                    </button>
                  )}
                </div>

                {item.hasDropdown && openMenuItems[item.key] && (
                  <ul className="mt-1 ml-4 list-none">
                    {item.dropdownLinks.map((link, idx) => {
                      const subId = `${item.key}-${idx}`;
                      // If link has subItems, it's not navigable
                      const hasSub = Boolean(link.subItems);
                      return (
                        <li key={idx} className="py-1">
                          <div className="flex items-center justify-between">
                            {hasSub ? (
                              <span className="text-xs font-medium">
                                {link.label}
                              </span>
                            ) : (
                              <a
                                href={link.route}
                                className="text-xs"
                                onClick={(e) => handleNavigation(e, link.route)}
                              >
                                {link.label}
                              </a>
                            )}

                            {hasSub && (
                              <button
                                onClick={() => toggleSubMenu(item.key, idx)}
                                aria-label="Toggle sub-items"
                              >
                                <Image
                                  src="/icons/arrow-right.svg"
                                  alt="toggle"
                                  width={12}
                                  height={12}
                                  className={
                                    openSubMenuItems[subId] ? "rotate-90" : ""
                                  }
                                />
                              </button>
                            )}
                          </div>

                          {hasSub && openSubMenuItems[subId] && (
                            <ul className="mt-1 ml-4 list-none">
                              {link.subItems.map((sub, sidx) => (
                                <li key={sidx} className="py-1">
                                  <a
                                    href={sub.route}
                                    className="text-xs"
                                    onClick={(e) =>
                                      handleNavigation(e, sub.route)
                                    }
                                  >
                                    {sub.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))} */}

            {menuItems.map((item) => (
              <li key={item.key} className="py-2">
                {/* Add active style when open */}
                <div
                  className={`flex items-center justify-between p-2.5 rounded-[10px] transition-all ease-in-out ${
                    openMenuItems[item.key] ? "bg-light-200" : ""
                  }`}
                >
                  <a
                    href={item.route}
                    className={`text-sm font-medium !text-gray-500 transition-all ease-in-out ${
                      openMenuItems[item.key]
                        ? "bg-gray-100 font-semibold !text-primary-900"
                        : ""
                    }`}
                    onClick={(e) => handleNavigation(e, item.route)}
                  >
                    {item.title}
                  </a>
                  {item.hasDropdown && (
                    <button
                      onClick={() => toggleMenu(item.key)}
                      aria-label="Toggle submenu"
                    >
                      <Image
                        src="/icons/arrow-down.svg"
                        alt="toggle"
                        width={16}
                        height={16}
                        className={openMenuItems[item.key] ? "rotate-180" : ""}
                      />
                    </button>
                  )}
                </div>

                {item.hasDropdown && openMenuItems[item.key] && (
                  <ul className="mt-1 ml-4 list-none">
                    {item.dropdownLinks.map((link, idx) => {
                      const subId = `${item.key}-${idx}`;
                      const hasSub = Boolean(link.subItems);
                      return (
                        <li key={idx} className="py-1">
                          <div className="flex items-center justify-between px-2">
                            {hasSub ? (
                              <span
                                onClick={() => toggleSubMenu(item.key, idx)}
                                // className="text-sm !text-gray-600 font-medium"
                                className={`text-sm !text-gray-600 font-medium cursor-pointer ${
                                openSubMenuItems[subId] ? 'underline' : ''
                              }`}
                              >
                                {link.label}
                              </span>
                            ) : (
                              <a
                                href={link.route}
                                className="text-sm !text-gray-600 font-medium"
                                onClick={(e) => handleNavigation(e, link.route)}
                              >
                                {link.label}
                              </a>
                            )}
                          </div>

                          {hasSub && openSubMenuItems[subId] && (
                            <ul className="mt-1 ml-4 list-none">
                              {link.subItems.map((sub, sidx) => (
                                <li key={sidx} className="py-1 px-2">
                                  <a
                                    href={sub.route}
                                    className="text-sm !text-gray-500"
                                    onClick={(e) =>
                                      handleNavigation(e, sub.route)
                                    }
                                  >
                                    {sub.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Drawer>
      )}
    </nav>
  );
}
