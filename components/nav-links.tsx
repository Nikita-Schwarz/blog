'use client';

import { useRef, useState, useEffect } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Главная', href: '/' },
  { name: 'Походы', trigger: true },
  { name: 'Галерея', href: '/gallery' },
  { name: 'Снаряжение', href: '/equipment' },
];

export default function NavLinks() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLUListElement>(null);
  const [lineStyle, setLineStyle] = useState<{ width: number; left: number }>({
    width: 0,
    left: 0,
  });

  useEffect(() => {
    if (menuRef.current) {
      const activeItem = menuRef.current.querySelector<HTMLAnchorElement>(
        `a[href="${pathname}"]`,
      );
      console.log(activeItem?.offsetHeight);
      if (activeItem) {
        const { offsetWidth, offsetLeft } = activeItem;
        setLineStyle({ width: offsetWidth, left: offsetLeft });
      }
    }
  }, [pathname]);

  return (
    <NavigationMenu>
      <NavigationMenuList ref={menuRef}>
        {links.map((link, index) => {
          if (link.trigger === true) {
            return (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger>{link.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      TEST
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          } else {
            return (
              <NavigationMenuItem key={index}>
                <Link href={link.href ? link.href : ''} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          }
        })}
      </NavigationMenuList>
      <div
        className="bg-primary absolute bottom-[-0.125rem] h-0.5 transition-all duration-200"
        style={{
          width: lineStyle.width,
          left: lineStyle.left,
        }}
      />
    </NavigationMenu>
  );
}
