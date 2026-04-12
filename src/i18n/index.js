import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home", doctors: "Doctors", clinics: "Clinics", labs: "Laboratories",
        about: "About", contact: "Contact", login: "Login", register: "Register", logout: "Logout"
      },
      home: {
        hero_title: "Find the Best Healthcare Providers in Morocco",
        hero_subtitle: "Book appointments with top doctors, clinics, and labs — all in one place.",
        search_placeholder: "Search doctors, clinics, or tests...",
        search_btn: "Search",
        stats_doctors: "Verified Doctors", stats_clinics: "Partner Clinics",
        stats_labs: "Laboratories", stats_patients: "Happy Patients",
        section_doctors: "Top Doctors", section_clinics: "Featured Clinics",
        section_labs: "Laboratories", view_all: "View All",
        how_title: "How DocsAura Works",
        how_1_title: "Search & Discover", how_1_desc: "Browse doctors, clinics, and labs by specialty, location, or name.",
        how_2_title: "Book an Appointment", how_2_desc: "Choose your time slot, consultation type, and confirm your booking instantly.",
        how_3_title: "Get Expert Care", how_3_desc: "Attend your appointment and receive top-quality medical care."
      },
      booking: {
        title: "Book an Appointment", name: "Full Name", email: "Email", phone: "Phone",
        date: "Preferred Date", time: "Preferred Time", type: "Consultation Type",
        description: "Describe your symptoms", submit: "Confirm Booking",
        success: "Appointment booked successfully!", required: "This field is required.",
        invalid_email: "Invalid email address.", invalid_phone: "Invalid phone number."
      },
      auth: {
        login_title: "Welcome back", register_title: "Create your account",
        email: "Email", password: "Password", name: "Full Name", confirm_password: "Confirm Password",
        login_btn: "Sign in", register_btn: "Create account", forgot: "Forgot password?",
        no_account: "Don't have an account?", have_account: "Already have an account?",
        verify_title: "Verify your email", verify_desc: "Enter the 6-digit code sent to",
        reset_title: "Reset Password", reset_btn: "Reset Password",
        new_password: "New Password", confirm_new: "Confirm New Password"
      },
      common: {
        loading: "Loading...", error: "Something went wrong.", back: "Go Back",
        book: "Book Appointment", details: "View Details", rating: "Rating",
        reviews: "reviews", experience: "years experience", fee: "MAD consultation fee",
        search: "Search", filter: "Filter", all: "All", read_more: "Read more",
        send: "Send", close: "Close"
      },
      chat: {
        title: "DocsAura AI", subtitle: "Ask me anything about health",
        placeholder: "Ask a health question...", greeting: "Hello! I'm your DocsAura AI assistant. How can I help you today?",
        suggestions: ["What are symptoms of diabetes?", "How to find a cardiologist?", "What tests do I need for annual checkup?"]
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: "Accueil", doctors: "Médecins", clinics: "Cliniques", labs: "Laboratoires",
        about: "À propos", contact: "Contact", login: "Connexion", register: "S'inscrire", logout: "Déconnexion"
      },
      home: {
        hero_title: "Trouvez les Meilleurs Prestataires de Santé au Maroc",
        hero_subtitle: "Prenez rendez-vous avec les meilleurs médecins, cliniques et labs — en un seul endroit.",
        search_placeholder: "Rechercher médecins, cliniques ou analyses...",
        search_btn: "Rechercher",
        stats_doctors: "Médecins Vérifiés", stats_clinics: "Cliniques Partenaires",
        stats_labs: "Laboratoires", stats_patients: "Patients Satisfaits",
        section_doctors: "Meilleurs Médecins", section_clinics: "Cliniques en Vedette",
        section_labs: "Laboratoires", view_all: "Voir tout",
        how_title: "Comment fonctionne DocsAura",
        how_1_title: "Rechercher & Découvrir", how_1_desc: "Parcourez médecins, cliniques et labs par spécialité, lieu ou nom.",
        how_2_title: "Prendre Rendez-vous", how_2_desc: "Choisissez votre créneau et type de consultation, confirmez instantanément.",
        how_3_title: "Recevoir des Soins Experts", how_3_desc: "Assistez à votre rendez-vous et recevez des soins médicaux de qualité."
      },
      booking: {
        title: "Prendre Rendez-vous", name: "Nom complet", email: "Email", phone: "Téléphone",
        date: "Date souhaitée", time: "Heure souhaitée", type: "Type de consultation",
        description: "Décrivez vos symptômes", submit: "Confirmer le Rendez-vous",
        success: "Rendez-vous confirmé avec succès!", required: "Ce champ est obligatoire.",
        invalid_email: "Adresse email invalide.", invalid_phone: "Numéro de téléphone invalide."
      },
      auth: {
        login_title: "Bon retour", register_title: "Créer votre compte",
        email: "Email", password: "Mot de passe", name: "Nom complet", confirm_password: "Confirmer le mot de passe",
        login_btn: "Se connecter", register_btn: "Créer un compte", forgot: "Mot de passe oublié?",
        no_account: "Pas encore de compte?", have_account: "Déjà un compte?",
        verify_title: "Vérifiez votre email", verify_desc: "Entrez le code à 6 chiffres envoyé à",
        reset_title: "Réinitialiser le mot de passe", reset_btn: "Réinitialiser",
        new_password: "Nouveau mot de passe", confirm_new: "Confirmer le nouveau mot de passe"
      },
      common: {
        loading: "Chargement...", error: "Une erreur s'est produite.", back: "Retour",
        book: "Prendre RDV", details: "Voir détails", rating: "Note",
        reviews: "avis", experience: "ans d'expérience", fee: "MAD frais de consultation",
        search: "Rechercher", filter: "Filtrer", all: "Tous", read_more: "Lire plus",
        send: "Envoyer", close: "Fermer"
      },
      chat: {
        title: "DocsAura IA", subtitle: "Posez-moi des questions de santé",
        placeholder: "Posez une question de santé...", greeting: "Bonjour! Je suis votre assistant IA DocsAura. Comment puis-je vous aider?",
        suggestions: ["Quels sont les symptômes du diabète?", "Comment trouver un cardiologue?", "Quels tests pour un bilan annuel?"]
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: "الرئيسية", doctors: "الأطباء", clinics: "العيادات", labs: "المختبرات",
        about: "من نحن", contact: "اتصل بنا", login: "تسجيل الدخول", register: "إنشاء حساب", logout: "تسجيل الخروج"
      },
      home: {
        hero_title: "ابحث عن أفضل مزودي الرعاية الصحية في المغرب",
        hero_subtitle: "احجز مواعيد مع أفضل الأطباء والعيادات والمختبرات في مكان واحد.",
        search_placeholder: "ابحث عن أطباء أو عيادات أو تحاليل...",
        search_btn: "بحث",
        stats_doctors: "طبيب معتمد", stats_clinics: "عيادة شريكة",
        stats_labs: "مختبر", stats_patients: "مريض راضٍ",
        section_doctors: "أفضل الأطباء", section_clinics: "العيادات المميزة",
        section_labs: "المختبرات", view_all: "عرض الكل",
        how_title: "كيف تعمل DocsAura",
        how_1_title: "ابحث واكتشف", how_1_desc: "تصفح الأطباء والعيادات والمختبرات حسب التخصص أو الموقع.",
        how_2_title: "احجز موعداً", how_2_desc: "اختر وقتك ونوع الاستشارة وأكّد حجزك فوراً.",
        how_3_title: "احصل على رعاية خبراء", how_3_desc: "احضر موعدك واحصل على رعاية طبية عالية الجودة."
      },
      booking: {
        title: "حجز موعد", name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "رقم الهاتف",
        date: "التاريخ المفضل", time: "الوقت المفضل", type: "نوع الاستشارة",
        description: "صف أعراضك", submit: "تأكيد الحجز",
        success: "تم حجز الموعد بنجاح!", required: "هذا الحقل مطلوب.",
        invalid_email: "بريد إلكتروني غير صالح.", invalid_phone: "رقم هاتف غير صالح."
      },
      auth: {
        login_title: "مرحباً بعودتك", register_title: "إنشاء حسابك",
        email: "البريد الإلكتروني", password: "كلمة المرور", name: "الاسم الكامل", confirm_password: "تأكيد كلمة المرور",
        login_btn: "تسجيل الدخول", register_btn: "إنشاء حساب", forgot: "نسيت كلمة المرور؟",
        no_account: "ليس لديك حساب؟", have_account: "لديك حساب بالفعل؟",
        verify_title: "تحقق من بريدك", verify_desc: "أدخل الرمز المكون من 6 أرقام المرسل إلى",
        reset_title: "إعادة تعيين كلمة المرور", reset_btn: "إعادة التعيين",
        new_password: "كلمة المرور الجديدة", confirm_new: "تأكيد كلمة المرور الجديدة"
      },
      common: {
        loading: "جارٍ التحميل...", error: "حدث خطأ ما.", back: "رجوع",
        book: "حجز موعد", details: "عرض التفاصيل", rating: "التقييم",
        reviews: "تقييم", experience: "سنوات خبرة", fee: "درهم رسوم الاستشارة",
        search: "بحث", filter: "تصفية", all: "الكل", read_more: "اقرأ المزيد",
        send: "إرسال", close: "إغلاق"
      },
      chat: {
        title: "مساعد DocsAura", subtitle: "اسألني أي سؤال صحي",
        placeholder: "اطرح سؤالاً صحياً...", greeting: "مرحباً! أنا مساعدك الذكي من DocsAura. كيف يمكنني مساعدتك اليوم؟",
        suggestions: ["ما هي أعراض مرض السكري؟", "كيف أجد طبيب قلب؟", "ما الفحوصات اللازمة للفحص السنوي؟"]
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
