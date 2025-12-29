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
    { id: "Session", label: "Session" },
    { id: "Friends", label: "Friends" },
    { id: "Profile", label: "Profile" },
  ];

  return (
    <div className="w-full fixed top-0 sm:w-4/5 md:w-5/6 lg:w-7/8 flex items-center justify-center p-1 bg-linear-to-r from-gray-100 to-gray-200 shadow-md z-50 rounded-b-2xl">
      <NavigationMenu>
        <NavigationMenuList>
          {menuItems.map((item) => (
            <NavigationMenuItem
              onClick={() => handleRoute(item.id)}
              key={item.id}
            >
              <NavigationMenuTrigger
                className="bg-transparent text-gray-950"
                key={item.id}
              >
                {item.label}
              </NavigationMenuTrigger>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavMenu;
