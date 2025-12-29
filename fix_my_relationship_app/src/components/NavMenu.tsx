import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface props {
  handleRoute: (state: string) => void;
}

const NavMenu = ({ handleRoute }: props) => {
  const menuItems = [
    { id: "Home", label: "Home" },
    { id: "Profile", label: "Profile" },
    { id: "Session", label: "Session" },
    { id: "Friends", label: "Friends" },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menuItems.map((item) => (
          <NavigationMenuItem onClick={() => handleRoute(item.id)}>
            <NavigationMenuTrigger key={item.id}>
              {item.label}
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
