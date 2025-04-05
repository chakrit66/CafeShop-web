import { useState, useEffect } from "react";
import {
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenuSubItem,
  SidebarMenuSub,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import useCafeStore from "@/store/cafe-store";
import {
  Contact,
  Users,
  FlaskConical,
  ShoppingBag,
  ChartLine,
  ShieldCheck,
  FileType,
  NotebookPen,
  Package,
  FilePlus,
  HandCoins,
  Store,
  BadgePercent,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { readPermission } from "@/api/role";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Menu = () => {
  const user = useCafeStore((s) => s.user);
  const token = useCafeStore((s) => s.token);
  const [auth, setAuth] = useState([]);

  useEffect(() => {
    if (user && token) {
      getPermission();
    }
  }, [token, user]);

  const getPermission = async () => {
    await readPermission(token, user.role_id)
      .then((res) => {
        setAuth(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Link to={"/store"}>
        <SidebarMenuButton>
          <Store />
          Store
        </SidebarMenuButton>
      </Link>
      {/* <Link to={"/dashboard"}>
        <SidebarMenuButton>
          <ChartLine />
          Dashboard
        </SidebarMenuButton>
      </Link> */}

      {auth.can_report && (
        <SidebarMenu>
          <Collapsible asChild defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <ChartLine />
                  Dashboard
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {[
                    { title: "Sales", url: "/DashboardSales" },
                    { title: "Customer purchase", url: "/DashCusBuy" },
                    { title: "Best selling products", url: "/DashProducts" },
                    { title: "Profit and loss", url: "/DashProfitLoss" },
                  ].map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link to={subItem.url}>{subItem.title}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      )}

      {(auth.can_constant || auth.can_auth) && (
        <SidebarGroupLabel>User</SidebarGroupLabel>
      )}
      {auth.can_constant && (
        <>
          <Link to={"/user"}>
            <SidebarMenuButton>
              <Contact />
              Employee
            </SidebarMenuButton>
          </Link>
          <Link to={"/customers"}>
            <SidebarMenuButton>
              <Users />
              Customers
            </SidebarMenuButton>
          </Link>
        </>
      )}
      {auth.can_auth && (
        <Link to={"/role"}>
          <SidebarMenuButton>
            <ShieldCheck />
            Role & Permission
          </SidebarMenuButton>
        </Link>
      )}
      {auth.can_constant && <SidebarGroupLabel>list</SidebarGroupLabel>}

      {auth.can_constant && (
        <Link to={"/products"}>
          <SidebarMenuButton>
            <ShoppingBag />
            Products
          </SidebarMenuButton>
        </Link>
      )}
      {auth.can_constant && (
        <Link to={"/stock"}>
          <SidebarMenuButton>
            <Package />
            Stock
          </SidebarMenuButton>
        </Link>
      )}
      {auth.can_constant && (
        <Link to={"/recipes"}>
          <SidebarMenuButton>
            <NotebookPen />
            Recipes
          </SidebarMenuButton>
        </Link>
      )}

      {auth.can_constant && (
        <div>
          <Link to={"/ingredients"}>
            <SidebarMenuButton>
              <FlaskConical />
              Unit & Ingredients
            </SidebarMenuButton>
          </Link>
          <Link to={"/type"}>
            <SidebarMenuButton>
              <FileType />
              Type & Category
            </SidebarMenuButton>
          </Link>
          <Link to={"/promotion"}>
            <SidebarMenuButton>
              <BadgePercent />
              Promotion
            </SidebarMenuButton>
          </Link>
        </div>
      )}

      {auth.can_bill && (
        <div>
          <SidebarGroupLabel>Add to inventory</SidebarGroupLabel>
          <Link to={"/bills"}>
            <SidebarMenuButton>
              <FilePlus />
              Bills
            </SidebarMenuButton>
          </Link>
        </div>
      )}
      {auth.can_order && (
        <div>
          <SidebarGroupLabel>Sales history</SidebarGroupLabel>
          <Link to={"/order"}>
            <SidebarMenuButton>
              <HandCoins />
              Order
            </SidebarMenuButton>
          </Link>
        </div>
      )}
    </>
  );
};

export default Menu;
