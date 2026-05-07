import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

/* ── Types ── */
export type MenuCategory = "Kopi Panas" | "Kopi Dingin" | "Non-Kopi" | "Makanan Ringan";
export type MenuBadge = "Best Seller" | "New" | null;
export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export interface AdminMenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: string;
  image: string;
  description: string;
  badge: MenuBadge;
  active: boolean;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  body: string;
  read: boolean;
  createdAt: string;
}

/* ── Seed data ── */
const SEED_MENU: AdminMenuItem[] = [
  { id: "1", name: "Single Origin Espresso", category: "Kopi Panas", price: "35000", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=85", description: "Espresso pekat dari biji Gayo arabika dengan catatan karamel, dark chocolate, dan sentuhan floral.", badge: "Best Seller", active: true },
  { id: "2", name: "Toraja Latte", category: "Kopi Panas", price: "42000", image: "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=600&q=85", description: "Espresso Toraja earthy berpadu susu segar dikukus sempurna.", badge: "Best Seller", active: true },
  { id: "3", name: "Flat White Flores", category: "Kopi Panas", price: "40000", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=85", description: "Double ristretto dari kopi Flores dipadukan dengan susu whole milk berbusa halus.", badge: "New", active: true },
  { id: "4", name: "Cappuccino Klasik", category: "Kopi Panas", price: "38000", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=85", description: "Paduan sempurna espresso, susu kukus, dan busa susu tebal.", badge: null, active: true },
  { id: "5", name: "Long Black Bajawa", category: "Kopi Panas", price: "33000", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=85", description: "Espresso Bajawa kuat dituang ke atas air panas.", badge: null, active: true },
  { id: "6", name: "Caramel Macchiato", category: "Kopi Panas", price: "45000", image: "https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=600&q=85", description: "Susu panas berbusa bertemu espresso bold, ditutup drizzle karamel emas.", badge: "New", active: true },
  { id: "7", name: "Cold Brew Nusantara", category: "Kopi Dingin", price: "48000", image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&q=85", description: "Kopi Flores robusta direndam dingin 18 jam.", badge: "Best Seller", active: true },
  { id: "8", name: "Iced Signature Latte", category: "Kopi Dingin", price: "43000", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=85", description: "Espresso ganda di atas susu penuh lemak dan es batu.", badge: "Best Seller", active: true },
  { id: "9", name: "Vietnamese Drip Iced", category: "Kopi Dingin", price: "40000", image: "https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?w=600&q=85", description: "Kopi robusta menetes perlahan melewati phin Vietnam.", badge: "New", active: true },
  { id: "10", name: "Iced Brown Sugar Latte", category: "Kopi Dingin", price: "46000", image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=600&q=85", description: "Espresso hangat bertemu gula aren lokal cair dan susu dingin.", badge: null, active: true },
  { id: "11", name: "Matcha Latte Premium", category: "Non-Kopi", price: "48000", image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=85", description: "Matcha ceremonial grade Uji Jepang dikocok sempurna dengan susu oat.", badge: "Best Seller", active: true },
  { id: "12", name: "Chocolate Velvet", category: "Non-Kopi", price: "44000", image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&q=85", description: "Cokelat Belgia 72% dicairkan bersama susu full cream.", badge: "New", active: true },
  { id: "13", name: "Taro Milk Tea", category: "Non-Kopi", price: "42000", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85", description: "Teh hitam premium bertemu susu segar dan pure taro ungu asli.", badge: null, active: true },
  { id: "14", name: "Chamomile Honey Latte", category: "Non-Kopi", price: "40000", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=85", description: "Bunga chamomile pilihan diseduh lembut dengan susu oat dan madu hutan.", badge: null, active: true },
  { id: "15", name: "Butter Croissant", category: "Makanan Ringan", price: "35000", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=85", description: "Croissant berlapis mentega premium dipanggang hingga keemasan.", badge: "Best Seller", active: true },
  { id: "16", name: "Banana Walnut Bread", category: "Makanan Ringan", price: "32000", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&q=85", description: "Banana bread lembab dengan irisan pisang ambon matang dan walnut panggang.", badge: "New", active: true },
  { id: "17", name: "Avocado Toast", category: "Makanan Ringan", price: "52000", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=600&q=85", description: "Roti sourdough panggang dengan alpukat segar dan telur poached.", badge: null, active: true },
  { id: "18", name: "Chocolate Chunk Cookies", category: "Makanan Ringan", price: "28000", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=85", description: "Cookies gooey dengan potongan dark chocolate Belgia 70%.", badge: "Best Seller", active: true },
];

const SEED_RESERVATIONS: Reservation[] = [
  { id: "r1", name: "Budi Santoso", phone: "08121234567", date: new Date().toISOString().split("T")[0], time: "10:00", guests: 4, notes: "Anniversary dinner, mohon disiapkan lilin", status: "pending", createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "r2", name: "Sari Wijayanti", phone: "08129876543", date: new Date().toISOString().split("T")[0], time: "14:30", guests: 2, notes: "Meja dekat jendela jika memungkinkan", status: "confirmed", createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: "r3", name: "Rizky Ananda", phone: "08567891234", date: new Date(Date.now() + 86400000).toISOString().split("T")[0], time: "11:00", guests: 6, notes: "Meeting bisnis, butuh proyektor", status: "pending", createdAt: new Date(Date.now() - 1800000).toISOString() },
  { id: "r4", name: "Dewi Kusuma", phone: "08234567890", date: new Date(Date.now() - 86400000).toISOString().split("T")[0], time: "19:00", guests: 3, notes: "", status: "confirmed", createdAt: new Date(Date.now() - 172800000).toISOString() },
  { id: "r5", name: "Andi Prasetyo", phone: "08191122334", date: new Date(Date.now() + 172800000).toISOString().split("T")[0], time: "16:00", guests: 2, notes: "Ulang tahun, mohon disiapkan kue", status: "cancelled", createdAt: new Date(Date.now() - 900000).toISOString() },
];

const SEED_MESSAGES: Message[] = [
  { id: "m1", name: "Indra Kusuma", email: "indra@gmail.com", phone: "08123456789", subject: "Pertanyaan tentang menu vegan", body: "Halo, apakah ada pilihan menu untuk pelanggan vegan? Saya berencana datang bersama teman-teman yang vegan minggu depan.", read: false, createdAt: new Date(Date.now() - 1800000).toISOString() },
  { id: "m2", name: "Maya Putri", email: "maya@example.com", phone: "08567891234", subject: "Reservasi untuk acara perusahaan", body: "Kami dari PT Nusantara Jaya ingin mengadakan gathering perusahaan untuk 30 orang. Apakah ada ruangan private yang tersedia?", read: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "m3", name: "Hendra Wijaya", email: "hendra@mail.com", phone: "08291112233", subject: "Feedback: Pelayanan luar biasa!", body: "Baru saja kunjungi kedai kopi Anda dan sangat terkesan! Kopinya enak, baristanya ramah, dan suasananya nyaman. Pasti akan kembali lagi.", read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "m4", name: "Fitri Handayani", email: "fitri@test.id", phone: "08154433221", subject: "Apakah bisa delivery?", body: "Saya tinggal di area Sudirman, apakah Kopi Nusantara menyediakan layanan delivery? Jika ada, bagaimana cara pemesanannya?", read: true, createdAt: new Date(Date.now() - 172800000).toISOString() },
  { id: "m5", name: "Bimo Pratama", email: "bimo@gmail.com", phone: "08998877665", subject: "Kerjasama endorsement", body: "Halo, saya food blogger dengan 50k followers di Instagram. Saya tertarik untuk berkolaborasi dengan Kopi Nusantara. Mohon info kontaknya.", read: false, createdAt: new Date(Date.now() - 7200000).toISOString() },
];

/* ── State ── */
interface AdminState {
  authed: boolean;
  menuItems: AdminMenuItem[];
  reservations: Reservation[];
  messages: Message[];
}

type AdminAction =
  | { type: "LOGIN" }
  | { type: "LOGOUT" }
  | { type: "SET_MENU"; items: AdminMenuItem[] }
  | { type: "ADD_MENU"; item: AdminMenuItem }
  | { type: "UPDATE_MENU"; item: AdminMenuItem }
  | { type: "DELETE_MENU"; id: string }
  | { type: "ADD_RESERVATION"; reservation: Reservation }
  | { type: "UPDATE_RESERVATION_STATUS"; id: string; status: ReservationStatus }
  | { type: "ADD_MESSAGE"; message: Message }
  | { type: "MARK_MESSAGE_READ"; id: string; read: boolean };

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function reducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case "LOGIN": {
      sessionStorage.setItem("kn_admin_auth", "1");
      return { ...state, authed: true };
    }
    case "LOGOUT": {
      sessionStorage.removeItem("kn_admin_auth");
      return { ...state, authed: false };
    }
    case "SET_MENU": {
      localStorage.setItem("kn_menu_items", JSON.stringify(action.items));
      return { ...state, menuItems: action.items };
    }
    case "ADD_MENU": {
      const items = [...state.menuItems, action.item];
      localStorage.setItem("kn_menu_items", JSON.stringify(items));
      return { ...state, menuItems: items };
    }
    case "UPDATE_MENU": {
      const items = state.menuItems.map((m) => m.id === action.item.id ? action.item : m);
      localStorage.setItem("kn_menu_items", JSON.stringify(items));
      return { ...state, menuItems: items };
    }
    case "DELETE_MENU": {
      const items = state.menuItems.filter((m) => m.id !== action.id);
      localStorage.setItem("kn_menu_items", JSON.stringify(items));
      return { ...state, menuItems: items };
    }
    case "ADD_RESERVATION": {
      const reservations = [action.reservation, ...state.reservations];
      localStorage.setItem("kn_reservations", JSON.stringify(reservations));
      return { ...state, reservations };
    }
    case "UPDATE_RESERVATION_STATUS": {
      const reservations = state.reservations.map((r) =>
        r.id === action.id ? { ...r, status: action.status } : r
      );
      localStorage.setItem("kn_reservations", JSON.stringify(reservations));
      return { ...state, reservations };
    }
    case "ADD_MESSAGE": {
      const messages = [action.message, ...state.messages];
      localStorage.setItem("kn_messages", JSON.stringify(messages));
      return { ...state, messages };
    }
    case "MARK_MESSAGE_READ": {
      const messages = state.messages.map((m) =>
        m.id === action.id ? { ...m, read: action.read } : m
      );
      localStorage.setItem("kn_messages", JSON.stringify(messages));
      return { ...state, messages };
    }
    default:
      return state;
  }
}

/* ── Context ── */
interface AdminContextType {
  state: AdminState;
  dispatch: React.Dispatch<AdminAction>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext<AdminContextType>({
  state: { authed: false, menuItems: [], reservations: [], messages: [] },
  dispatch: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => useContext(AdminContext);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    authed: sessionStorage.getItem("kn_admin_auth") === "1",
    menuItems: loadFromStorage("kn_menu_items", SEED_MENU),
    reservations: loadFromStorage("kn_reservations", SEED_RESERVATIONS),
    messages: loadFromStorage("kn_messages", SEED_MESSAGES),
  });

  // Seed localStorage if empty
  useEffect(() => {
    if (!localStorage.getItem("kn_menu_items")) {
      localStorage.setItem("kn_menu_items", JSON.stringify(SEED_MENU));
    }
    if (!localStorage.getItem("kn_reservations")) {
      localStorage.setItem("kn_reservations", JSON.stringify(SEED_RESERVATIONS));
    }
    if (!localStorage.getItem("kn_messages")) {
      localStorage.setItem("kn_messages", JSON.stringify(SEED_MESSAGES));
    }
  }, []);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
}
