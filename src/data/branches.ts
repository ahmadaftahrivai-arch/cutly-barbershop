export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  isMain?: boolean;
  lat: number;
  lng: number;
}

export const branches: Branch[] = [
  {
    id: "sudirman",
    name: "CUTLY Sudirman",
    address: "Jl. Sudirman No. 88, Jakarta Selatan",
    phone: "+62 812 3456 7890",
    hours: "Mon–Sat 09.00–21.00, Sun 10.00–18.00",
    isMain: true,
    lat: -6.2088,
    lng: 106.8229,
  },
  {
    id: "kemang",
    name: "CUTLY Kemang",
    address: "Jl. Kemang Raya No. 45, Jakarta Selatan",
    phone: "+62 812 9876 5432",
    hours: "Mon–Sat 10.00–21.00, Sun 10.00–17.00",
    lat: -6.2607,
    lng: 106.8133,
  },
  {
    id: "pik",
    name: "CUTLY PIK",
    address: "Jl. Pantai Indah Kapuk No. 12, Jakarta Utara",
    phone: "+62 813 1122 3344",
    hours: "Mon–Sun 10.00–20.00",
    lat: -6.1092,
    lng: 106.7411,
  },
];
