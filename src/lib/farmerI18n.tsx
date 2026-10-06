import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "so";

const en = {
  dashboard: "My Farm Dashboard",
  dashboardIntro: "Your saved diagnoses, symptom records and crop notes — private to your account.",
  signIn: "Sign in",
  signUp: "Create account",
  signOut: "Sign out",
  email: "Email",
  password: "Password",
  google: "Continue with Google",
  or: "or",
  forgot: "Forgot password?",
  sendReset: "Send reset link",
  resetSent: "Check your email for a link to reset your password.",
  checkEmail: "Check your email to confirm your account, then sign in.",
  noAccount: "New here? Create an account",
  haveAccount: "Already have an account? Sign in",
  authIntro: "Sign in to save your Crop Doctor results, track symptoms and keep crop notes.",
  newPassword: "New password",
  savePassword: "Save new password",
  passwordSaved: "Password updated.",
  diagnoses: "Diagnoses",
  tracker: "Symptom tracker",
  notes: "Crop notes",
  noDiagnoses: "No saved diagnoses yet.",
  newDiagnosis: "New diagnosis",
  crop: "Crop",
  plot: "Field / plot (optional)",
  severity: "Severity",
  severityHint: "1 = very mild, 5 = very severe",
  observedOn: "Date observed",
  notesField: "Notes",
  addEntry: "Add record",
  noLogs: "No symptom records yet. Add one to start tracking.",
  allCrops: "All crops",
  title: "Title",
  addNote: "Save note",
  noNotes: "No notes yet.",
  edit: "Edit",
  del: "Delete",
  cancel: "Cancel",
  update: "Update",
  show: "Show details",
  hide: "Hide details",
  symptomsLabel: "Symptoms",
  saved: "Saved to your dashboard.",
  signInToSave: "Sign in to save results to your dashboard.",
  openDashboard: "Open my dashboard",
  error: "Something went wrong. Please try again.",
  language: "English",
};

const so: typeof en = {
  dashboard: "Shaxda Beertayda",
  dashboardIntro: "Baaritaannadaada, diiwaanka calaamadaha iyo qoraallada dalagga — kaliya adiga ayaa arki kara.",
  signIn: "Gal",
  signUp: "Samee akoon",
  signOut: "Ka bax",
  email: "Iimayl",
  password: "Furaha sirta",
  google: "Ku gal Google",
  or: "ama",
  forgot: "Ma ilowday furaha sirta?",
  sendReset: "Dir xiriirka dib-u-dejinta",
  resetSent: "Iimaylkaaga eeg si aad u hesho xiriirka dib-u-dejinta.",
  checkEmail: "Iimaylkaaga eeg si aad u xaqiijiso akoonka, kadibna gal.",
  noAccount: "Cusub? Samee akoon",
  haveAccount: "Akoon ma leedahay? Gal",
  authIntro: "Gal si aad u kaydiso natiijooyinka Dhakhtarka Dalagga, ula socoto calaamadaha, una qorto xusuus-qor.",
  newPassword: "Furaha sirta cusub",
  savePassword: "Kaydi furaha cusub",
  passwordSaved: "Furaha sirta waa la cusbooneysiiyay.",
  diagnoses: "Baaritaannada",
  tracker: "La socodka calaamadaha",
  notes: "Qoraallada dalagga",
  noDiagnoses: "Weli baaritaan lama kaydin.",
  newDiagnosis: "Baaritaan cusub",
  crop: "Dalagga",
  plot: "Beerta / qaybta (ikhtiyaari)",
  severity: "Darnaanta",
  severityHint: "1 = aad u fudud, 5 = aad u daran",
  observedOn: "Taariikhda la arkay",
  notesField: "Faahfaahin",
  addEntry: "Ku dar diiwaan",
  noLogs: "Weli diiwaan calaamad ah ma jiro. Ku dar mid si aad u bilowdo.",
  allCrops: "Dhammaan dalagyada",
  title: "Cinwaan",
  addNote: "Kaydi qoraalka",
  noNotes: "Weli qoraal ma jiro.",
  edit: "Wax ka beddel",
  del: "Tirtir",
  cancel: "Jooji",
  update: "Cusbooneysii",
  show: "Muuji faahfaahinta",
  hide: "Qari faahfaahinta",
  symptomsLabel: "Calaamadaha",
  saved: "Waxaa lagu kaydiyay shaxdaada.",
  signInToSave: "Gal si aad natiijooyinka ugu kaydiso shaxdaada.",
  openDashboard: "Fur shaxdayda",
  error: "Khalad ayaa dhacay. Fadlan isku day mar kale.",
  language: "English",
};

const ar: typeof en = {
  dashboard: "لوحة مزرعتي",
  dashboardIntro: "تشخيصاتك المحفوظة وسجلات الأعراض وملاحظات المحاصيل — خاصة بحسابك فقط.",
  signIn: "تسجيل الدخول",
  signUp: "إنشاء حساب",
  signOut: "تسجيل الخروج",
  email: "البريد الإلكتروني",
  password: "كلمة المرور",
  google: "المتابعة باستخدام Google",
  or: "أو",
  forgot: "نسيت كلمة المرور؟",
  sendReset: "إرسال رابط إعادة التعيين",
  resetSent: "تحقق من بريدك الإلكتروني للحصول على رابط إعادة تعيين كلمة المرور.",
  checkEmail: "تحقق من بريدك الإلكتروني لتأكيد حسابك، ثم سجّل الدخول.",
  noAccount: "جديد هنا؟ أنشئ حساباً",
  haveAccount: "لديك حساب بالفعل؟ سجّل الدخول",
  authIntro: "سجّل الدخول لحفظ نتائج طبيب المحاصيل وتتبع الأعراض وتدوين ملاحظات المحاصيل.",
  newPassword: "كلمة المرور الجديدة",
  savePassword: "حفظ كلمة المرور الجديدة",
  passwordSaved: "تم تحديث كلمة المرور.",
  diagnoses: "التشخيصات",
  tracker: "متتبع الأعراض",
  notes: "ملاحظات المحاصيل",
  noDiagnoses: "لا توجد تشخيصات محفوظة بعد.",
  newDiagnosis: "تشخيص جديد",
  crop: "المحصول",
  plot: "الحقل / القطعة (اختياري)",
  severity: "الشدة",
  severityHint: "1 = خفيفة جداً، 5 = شديدة جداً",
  observedOn: "تاريخ الملاحظة",
  notesField: "ملاحظات",
  addEntry: "إضافة سجل",
  noLogs: "لا توجد سجلات أعراض بعد. أضف سجلاً لبدء التتبع.",
  allCrops: "جميع المحاصيل",
  title: "العنوان",
  addNote: "حفظ الملاحظة",
  noNotes: "لا توجد ملاحظات بعد.",
  edit: "تعديل",
  del: "حذف",
  cancel: "إلغاء",
  update: "تحديث",
  show: "عرض التفاصيل",
  hide: "إخفاء التفاصيل",
  symptomsLabel: "الأعراض",
  saved: "تم الحفظ في لوحتك.",
  signInToSave: "سجّل الدخول لحفظ النتائج في لوحتك.",
  openDashboard: "افتح لوحتي",
  error: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
  language: "العربية",
};

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "so", label: "Af-Soomaali", short: "SO" },
  { code: "ar", label: "العربية", short: "ع" },
];

const dict = { en, so, ar };
const STORAGE_KEY = "site-lang";
type Ctx = { lang: Lang; t: typeof en; setLang: (l: Lang) => void; toggle: () => void };
const LangContext = createContext<Ctx | null>(null);

const readLang = (): Lang => {
  try {
    const v = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem("farmer-lang");
    if (v === "so" || v === "ar" || v === "en") return v;
  } catch {
    // storage unavailable
  }
  return "en";
};

export const FarmerLangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(readLang);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // choice still applies for this visit
    }
  }, [lang]);
  const toggle = () => setLang((l) => (l === "en" ? "so" : l === "so" ? "ar" : "en"));
  return <LangContext.Provider value={{ lang, t: dict[lang], setLang, toggle }}>{children}</LangContext.Provider>;
};

export const useFarmerLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useFarmerLang must be used inside FarmerLangProvider");
  return ctx;
};

/** Site-wide language hook. */
export const useLang = useFarmerLang;

/** Pick the current-language entry from a per-component copy object. */
export function useCopy<T>(copy: Record<Lang, T>): T {
  return copy[useFarmerLang().lang];
}
