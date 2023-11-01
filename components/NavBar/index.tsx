"use client";

import { UserButton } from "@clerk/nextjs";
import { NavigationMenu } from "../ui/navigation-menu";
import { ThemeToggler } from "../ui/theme-toggler";

type NavBarProps = {
};

function NavBar({
}: NavBarProps) {
  // Add component logic here...
  return (
    <div
      className="flex bg-muted mx-4 my-2 rounded-lg">
      <NavigationMenu
        className="flex flex-row justify-center h-[60px] px-4 last-of-type:ml-auto">
        <div
          className="flex flex-row mr-auto gap-2">
          <ThemeToggler
            className="bg-transparent border-transparent hover:bg-muted-focus hover:text-muted-foreground text-muted-foreground" />
          <div
            className="flex justify-self-end">
            <UserButton afterSignOutUrl="/sign-in"
              appearance={{
                variables: {
                  colorPrimary: "transparent"
                },
              }} />
          </div>
        </div>

      </NavigationMenu>
    </div>
  );
}

export default NavBar;