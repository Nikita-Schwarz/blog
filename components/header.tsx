'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
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
import { Input } from './ui/input';
import { Search } from 'lucide-react';

const links = [
  { name: 'Главная', href: '/' },
  { name: 'Походы', href: '/hiking', trigger: true },
  { name: 'Галерея', href: '/gallery' },
  { name: 'Снаряжение', href: '/equipment' },
];

export default function Header() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLUListElement>(null);
  const [lineStyle, setLineStyle] = useState<{ width: number; left: number }>({
    width: 0,
    left: 0,
  });

  const updateLineStyle = useCallback(() => {
    if (menuRef.current) {
      const menuItems = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>('[data-href]'),
      );

      let activeItem: HTMLElement | null = null;

      for (const item of menuItems) {
        const href = item.getAttribute('data-href');
        if (href && pathname.startsWith(href)) {
          if (
            !activeItem ||
            href.length > (activeItem.getAttribute('href')?.length || 0)
          ) {
            activeItem = item;
          }
        }
      }

      if (activeItem) {
        const { offsetWidth } = activeItem;
        const { left: itemLeft } = activeItem.getBoundingClientRect();
        const { left: parentLeft } = menuRef.current.getBoundingClientRect();
        setLineStyle({ width: offsetWidth, left: itemLeft - parentLeft });
      } else {
        setLineStyle({ width: 0, left: 0 });
      }
    }
  }, [pathname]);

  useEffect(() => {
    updateLineStyle();
  }, [pathname, updateLineStyle]);

  return (
    <header className="border-border bg-background fixed top-0 right-0 left-0 flex items-center justify-between border-b-2 lg:left-52">
      <NavigationMenu viewport={false}>
        <NavigationMenuList ref={menuRef}>
          {links.map((link, index) => {
            if (link.trigger === true) {
              return (
                <NavigationMenuItem key={index} data-href={link.href}>
                  <NavigationMenuTrigger>{link.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink asChild className="hover:bg-accent">
                      <Link href="/hiking/test">Test</Link>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            } else {
              return (
                <NavigationMenuItem key={index} data-href={link.href}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
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
      <div className="flex items-center">
        <Input type="search" placeholder="Поиск" className="h-7 w-3xs" />
        <Search className="stroke-muted-foreground mx-2" />
      </div>
    </header>
  );
}
