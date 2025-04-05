import { checkLogin } from "@/api/auth";
import { listBills, searchBill } from "@/api/bills";
import { listCat } from "@/api/category";
import { listCus } from "@/api/customer";
import { listIng } from "@/api/ingredients";
import { listProduct, searchProduct } from "@/api/product";
import { listRole } from "@/api/role";
import { listStock } from "@/api/stock";
import { listType } from "@/api/type";
import { listUnit } from "@/api/unit";
import { listUsers } from "@/api/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import _ from "lodash";
import { listPromotion } from "@/api/promotion";
import { listOrder, searchOrder } from "@/api/order";
import { getProfitLoss } from "@/api/dashboard";
import { getSalesReport } from "@/api/dashboardSales";

const cafeStore = (set, get) => ({
  user: null,
  token: null,
  dataUsers: [],
  dataRole: [],
  unit: [],
  ing: [],
  type: [],
  cat: [],
  products: [],
  cus: [],
  bills: [],
  stock: [],
  carts: [],
  promotion: [],
  addPomotion: [],
  member: [],
  order: [],
  totalOrders: 0,
  totalBills: 0,

  totalRevenue: 0,
  totalCost: 0,
  profitOrLoss: 0,
  amountOrder: 0,
  statusProfitOrLoss: null,

  dataSalesReport: null,

  actionLogin: async (data) => {
    const res = await checkLogin(data);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  actionLogout: () => {
    set({
      user: null,
      token: null,
      dataUsers: [],
      dataRole: [],
      unit: [],
      ing: [],
      type: [],
      cat: [],
      products: [],
      cus: [],
      bills: [],
      stock: [],
      carts: [],
      promotion: [],
      addPomotion: [],
      member: [],
      order: [],
      totalOrders: 0,
      totalBills: 0,
      totalRevenue: 0,
      totalCost: 0,
      profitOrLoss: 0,
      amountOrder: 0,
      statusProfitOrLoss: null,

      dataSalesReport: null,
    });
    localStorage.clear();
  },
  getDataUsers: async (token) => {
    const res = await listUsers(token)
      .then((res) => {
        set({ dataUsers: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getDataRole: async (token) => {
    const res = await listRole(token)
      .then((res) => {
        set({ dataRole: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getDataUnit: async (token) => {
    const res = await listUnit(token)
      .then((res) => {
        set({ unit: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getDataIng: async (token) => {
    const res = await listIng(token)
      .then((res) => {
        set({ ing: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getDataType: async (token) => {
    const res = await listType(token)
      .then((res) => {
        set({ type: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getDataCat: async (token) => {
    const res = await listCat(token)
      .then((res) => {
        set({ cat: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getDataProducts: async (token, count) => {
    const res = await listProduct(token, count)
      .then((res) => {
        set({ products: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  actionSearchProduct: async (token, arg) => {
    const res = await searchProduct(token, arg)
      .then((res) => {
        set({ products: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getDataCus: async (token) => {
    const res = await listCus(token)
      .then((res) => {
        set({ cus: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getDataBills: async (token, page = 1, limit = 15) => {
    const res = await listBills(token, page, limit)
      .then((res) => {
        set({ bills: res.data.data, totalBills: res.data.total });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getDataStock: async (token) => {
    const res = await listStock(token)
      .then((res) => {
        set({ stock: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getDataPromotion: async (token) => {
    const res = await listPromotion(token)
      .then((res) => {
        set({ promotion: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getDataOrder: async (token, page = 1, limit = 15) => {
    const res = await listOrder(token, page, limit)
      .then((res) => {
        set({ order: res.data.data, totalOrders: res.data.total });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  actionSearchBill: async (token, arg) => {
    const res = await searchBill(token, arg)
      .then((res) => {
        set({ bills: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  actionSearchOrder: async (token, arg) => {
    const res = await searchOrder(token, arg)
      .then((res) => {
        set({ order: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getProfitLoss: async (token, startDate, endDate) => {
    const res = await getProfitLoss(token, startDate, endDate)
      .then((res) => {
        //console.log(res.data)
        set({
          totalRevenue: res.data.totalRevenue,
          totalCost: res.data.totalCost,
          profitOrLoss: res.data.profitOrLoss,
          amountOrder: res.data.totalOrders,
          statusProfitOrLoss: res.data.status,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getSalesReport: async (token, startDate, endDate) => {
    const res = await getSalesReport(token, startDate, endDate)
      .then((res) => {
        //console.log(res.data)
        set({ dataSalesReport: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  actionAddCart: (product) => {
    const carts = get().carts;

    // ตรวจสอบว่า serveType เป็น Array และมีข้อมูลหรือไม่
    if (Array.isArray(product.serveType) && product.serveType.length > 0) {
      set({ selectedProduct: product }); // เก็บสินค้าที่เลือกไว้เพื่อเปิด Dialog
      return;
    }

    // ถ้าไม่มี ServeType ให้ทำงานแบบเดิม
    const updateCart = [...carts, { ...product, count: 1 }];
    const uniqe = _.unionWith(updateCart, _.isEqual);
    set({ carts: uniqe });
  },
  resetSelectedProduct: () => {
    set({ selectedProduct: null }); // รีเซ็ต selectedProduct
  },
  actionUpdateAmount: (pd_id, newAmount) => {
    set((state) => ({
      carts: state.carts.map((item) =>
        item.pd_id === pd_id ? { ...item, count: Math.max(1, newAmount) } : item
      ),
    }));
  },
  actionRemoveCartPD: (pd_id) => {
    //console.log("upppp", pd_id);
    set((state) => ({
      carts: state.carts.filter((item) => item.pd_id !== pd_id),
    }));
  },
  calTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },

  calDiscount: () => {
    let totalDiscount = 0;
    const totalPrice = get().calTotalPrice();
    const addPomotion = get().addPomotion;

    addPomotion.forEach((promo) => {
      if (promo.pm_type === "PERCENTAGE") {
        totalDiscount += (totalPrice * promo.discount) / 100;
      } else if (promo.pm_type === "FIXED_AMOUNT") {
        totalDiscount += promo.discount;
      }
    });

    return totalDiscount;
  },

  clearCart: () => {
    set({ carts: [] });
    set({ addPomotion: [] });
    set({ member: [] });
  },

  actionAddPromotion: (pm) => {
    const addPomotion = get().addPomotion;
    const updateAdd = [...addPomotion, { ...pm }];
    const uniqe = _.unionWith(updateAdd, _.isEqual);
    set({ addPomotion: uniqe });
  },
  actionRemovePromotion: (pm_id) => {
    set((state) => ({
      addPomotion: state.addPomotion.filter((item) => item.pm_id !== pm_id),
    }));
  },

  actionAddMember: (data) => {
    // ตรวจสอบว่า data เป็น array หรือไม่
    if (Array.isArray(data)) {
      set({ member: [...data] }); // หาก data เป็น array ให้แทนที่ member ด้วยข้อมูลใหม่
    } else {
      set({ member: [data] }); // หากไม่เป็น array ให้แปลงเป็น array ก่อน
    }
  },
  actionRemoveMember: (id) => {
    set((state) => ({
      member: state.member.filter((item) => item.cus_id !== id),
    }));
  },
});

const usePersist = {
  name: "cafe-store",
  storage: createJSONStorage(() => localStorage),
};

const useCafeStore = create(persist(cafeStore, usePersist));

export default useCafeStore;
