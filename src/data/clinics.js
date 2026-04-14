export const clinics = [
  {
    id: 1,
    name: "Clinique Al Amal",
    specialty: "Multi-Specialty",
    rating: 4.8,
    reviewCount: 421,
    location: "Agdal, Rabat",
    address: "45 Avenue Mohammed V, Agdal, Rabat 10000",
    phone: "+212 537 77 88 99",
    email: "contact@clinique-alaama.ma",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80",
    cover: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80",
    description: "Clinique Al Amal is one of Rabat's premier private medical facilities, offering comprehensive healthcare across 12 specialties. Founded in 2005, we combine French medical excellence with Moroccan warmth to deliver outstanding patient care.",
    openHours: "Mon–Fri: 08:00–20:00 | Sat: 08:00–16:00 | Sun: Emergency Only",
    services: ["cardiology", "orthopedics", "dermatology", "gynecology", "neurology", "ophthalmology", "radiology", "laboratory", "emergency_care", "surgery"],
    doctors: [
      { id: 1, name: "Dr. Fatima Zahra El Mansouri", specialty: "Cardiologist", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      { id: 4, name: "Dr. Karim Lahlou", specialty: "Neurologist", avatar: "https://randomuser.me/api/portraits/men/62.jpg" },
      { id: 5, name: "Dr. Salma Idrissi", specialty: "Dermatologist", avatar: "https://randomuser.me/api/portraits/women/36.jpg" }
    ],
    amenities: ["Free Parking", "Pharmacy", "Cafeteria", "WiFi", "Prayer Room", "Wheelchair Access"],
    insurances: ["CNSS", "CNOPS", "Saham", "Allianz", "AXA"],
    coordinates: { lat: 33.9997, lng: -6.8447 }
  },
  {
    id: 2,
    name: "Centre Médical Hassan II",
    specialty: "Surgery & Orthopedics",
    rating: 4.7,
    reviewCount: 289,
    location: "Maarif, Casablanca",
    address: "12 Rue Abou Bakr Siddiq, Maarif, Casablanca 20360",
    phone: "+212 522 45 67 89",
    email: "info@cmh2.ma",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
    cover: "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?w=1200&q=80",
    description: "Centre Médical Hassan II is a state-of-the-art surgical center in Casablanca's Maarif district. Renowned for orthopedic surgery, trauma care, and sports medicine, we feature the most advanced operating rooms in North Africa.",
    openHours: "Mon–Sat: 07:30–19:00 | Emergency 24/7",
    services: ["orthopedic_surgery", "sport_medicine", "traumatology", "physical_therapy", "radiology", "anesthesia", "icu"],
    doctors: [
      { id: 2, name: "Dr. Youssef Benali", specialty: "Orthopedic Surgeon", avatar: "https://randomuser.me/api/portraits/men/52.jpg" },
      { id: 6, name: "Dr. Hassan Tazi", specialty: "Traumatologist", avatar: "https://randomuser.me/api/portraits/men/78.jpg" }
    ],
    amenities: ["Dedicated Parking", "Pharmacy", "WiFi", "Prayer Room", "VIP Rooms"],
    insurances: ["CNSS", "CNOPS", "Saham", "RMA", "Allianz"],
    coordinates: { lat: 33.5731, lng: -7.6298 }
  },
  {
    id: 3,
    name: "Clinique Saâda",
    specialty: "Pediatrics & Maternity",
    rating: 4.9,
    reviewCount: 537,
    location: "Ville Nouvelle, Fès",
    address: "8 Boulevard Allal El Fassi, Fès 30000",
    phone: "+212 535 62 11 44",
    email: "saada@clinique-saada.ma",
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&q=80",
    cover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    description: "Clinique Saâda has been serving families in Fès since 1998. Specializing in pediatrics, maternity care, and neonatology, we provide a warm and safe environment for mothers and children. Our NICU is one of the most advanced in the Fès-Meknès region.",
    openHours: "Open 24/7",
    services: ["pediatrics", "maternity", "neonatology", "gynecology", "vaccination", "lactation_support", "child_development"],
    doctors: [
      { id: 3, name: "Dr. Laila Chraibi", specialty: "Pediatrician", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
      { id: 7, name: "Dr. Meriem Berrada", specialty: "Gynecologist", avatar: "https://randomuser.me/api/portraits/women/49.jpg" }
    ],
    amenities: ["24/7 Emergency", "NICU", "Family Rooms", "Pharmacy", "Cafeteria", "Parking", "Breastfeeding Room"],
    insurances: ["CNSS", "CNOPS", "Saham", "AXA", "Wafa Assurance"],
    coordinates: { lat: 34.0383, lng: -5.0078 }
  }
];
