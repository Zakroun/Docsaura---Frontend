export const doctors = [
  {
    id: 1,
    name: "Dr. Fatima Zahra El Mansouri",
    specialty: "Cardiologist",
    rating: 4.9,
    reviewCount: 218,
    experience: 14,
    location: "Rabat, Morocco",
    clinic: "Clinique Al Amal",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    cover: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
    description: "Dr. El Mansouri is a highly experienced cardiologist with over 14 years of practice in Morocco and France. She specializes in interventional cardiology, heart failure management, and preventive cardiology. She completed her residency at Hôpital Lariboisière in Paris and returned to Morocco to serve her community.",
    languages: ["Arabic", "French", "English"],
    education: [
      { degree: "MD in Cardiology", institution: "Université Mohammed V, Rabat", year: 2010 },
      { degree: "Fellowship – Interventional Cardiology", institution: "Lariboisière, Paris", year: 2013 }
    ],
    workingHours: [
      { day: "Monday", hours: "09:00 – 17:00" },
      { day: "Tuesday", hours: "09:00 – 17:00" },
      { day: "Wednesday", hours: "10:00 – 15:00" },
      { day: "Thursday", hours: "09:00 – 17:00" },
      { day: "Friday", hours: "09:00 – 13:00" },
      { day: "Saturday", hours: "Closed" },
      { day: "Sunday", hours: "Closed" }
    ],
    consultationTypes: ["In-Person", "Video Call", "Home Visit"],
    consultationFee: 400,
    availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    tags: ["Heart", "ECG", "Echo", "Hypertension"],
    comments: [
      { id: 1, author: "Khadija B.", avatar: "https://randomuser.me/api/portraits/women/12.jpg", rating: 5, date: "2024-11-20", text: "Excellent doctor, very attentive and professional. She took time to explain everything clearly." },
      { id: 2, author: "Mohammed A.", avatar: "https://randomuser.me/api/portraits/men/22.jpg", rating: 5, date: "2024-10-15", text: "Best cardiologist in Rabat. My father has been her patient for 3 years and she's amazing." },
      { id: 3, author: "Samira T.", avatar: "https://randomuser.me/api/portraits/women/31.jpg", rating: 4, date: "2024-09-08", text: "Very knowledgeable, the clinic is clean and organized. Slight wait time but worth it." }
    ]
  },
  {
    id: 2,
    name: "Dr. Youssef Benali",
    specialty: "Orthopedic Surgeon",
    rating: 4.8,
    reviewCount: 165,
    experience: 11,
    location: "Casablanca, Morocco",
    clinic: "Centre Médical Hassan II",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    cover: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    description: "Dr. Benali is a renowned orthopedic surgeon based in Casablanca specializing in sports medicine, joint replacement, and minimally invasive spine surgery. He has operated on professional athletes and is a member of the Moroccan Society of Orthopedic Surgery.",
    languages: ["Arabic", "French"],
    education: [
      { degree: "MD in Orthopedics", institution: "Université Hassan II, Casablanca", year: 2013 },
      { degree: "Sports Medicine Diploma", institution: "CHU Ibn Rochd", year: 2015 }
    ],
    workingHours: [
      { day: "Monday", hours: "08:30 – 16:30" },
      { day: "Tuesday", hours: "08:30 – 16:30" },
      { day: "Wednesday", hours: "Closed" },
      { day: "Thursday", hours: "08:30 – 16:30" },
      { day: "Friday", hours: "08:30 – 12:00" },
      { day: "Saturday", hours: "09:00 – 13:00" },
      { day: "Sunday", hours: "Closed" }
    ],
    consultationTypes: ["In-Person", "Video Call"],
    consultationFee: 500,
    availableSlots: ["08:30", "09:30", "10:30", "11:30", "14:00", "15:00"],
    tags: ["Joints", "Spine", "Sports", "Arthroscopy"],
    comments: [
      { id: 1, author: "Rachid M.", avatar: "https://randomuser.me/api/portraits/men/33.jpg", rating: 5, date: "2024-12-01", text: "Dr. Benali performed my knee surgery and the recovery was incredibly smooth. Highly recommend!" },
      { id: 2, author: "Nadia K.", avatar: "https://randomuser.me/api/portraits/women/19.jpg", rating: 5, date: "2024-11-10", text: "Professional, precise, and reassuring. The best orthopedic doctor I've ever seen." },
      { id: 3, author: "Hamid Z.", avatar: "https://randomuser.me/api/portraits/men/47.jpg", rating: 4, date: "2024-10-22", text: "Very competent doctor. Sometimes hard to get an appointment quickly but the quality is exceptional." }
    ]
  },
  {
    id: 3,
    name: "Dr. Laila Chraibi",
    specialty: "Pediatrician",
    rating: 4.9,
    reviewCount: 302,
    experience: 9,
    location: "Fès, Morocco",
    clinic: "Clinique Saâda",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    cover: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    description: "Dr. Chraibi is a beloved pediatrician in Fès known for her gentle approach and deep knowledge of child health. She specializes in neonatology, developmental pediatrics, and childhood nutrition. Parents travel from across the region to see her.",
    languages: ["Arabic", "French", "English"],
    education: [
      { degree: "MD in Pediatrics", institution: "Université Sidi Mohamed Ben Abdellah, Fès", year: 2015 },
      { degree: "Neonatology Specialization", institution: "CHU Hassan II, Fès", year: 2017 }
    ],
    workingHours: [
      { day: "Monday", hours: "09:00 – 18:00" },
      { day: "Tuesday", hours: "09:00 – 18:00" },
      { day: "Wednesday", hours: "09:00 – 18:00" },
      { day: "Thursday", hours: "09:00 – 18:00" },
      { day: "Friday", hours: "09:00 – 13:00" },
      { day: "Saturday", hours: "10:00 – 14:00" },
      { day: "Sunday", hours: "Closed" }
    ],
    consultationTypes: ["In-Person", "Video Call"],
    consultationFee: 300,
    availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
    tags: ["Children", "Vaccines", "Nutrition", "Development"],
    comments: [
      { id: 1, author: "Aicha L.", avatar: "https://randomuser.me/api/portraits/women/55.jpg", rating: 5, date: "2024-12-10", text: "Dr. Chraibi is absolutely wonderful with children. My son cried before and was smiling after seeing her!" },
      { id: 2, author: "Omar B.", avatar: "https://randomuser.me/api/portraits/men/11.jpg", rating: 5, date: "2024-11-30", text: "The best pediatrician in Fès without a doubt. Always available and very reassuring for parents." },
      { id: 3, author: "Fatima R.", avatar: "https://randomuser.me/api/portraits/women/27.jpg", rating: 5, date: "2024-11-15", text: "Exceptional doctor. My three children are all her patients and we wouldn't change for anything." }
    ]
  }
];
