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
  language: "Af-Soomaali",
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

const dict = { en, so };
type Ctx = { lang: Lang; t: typeof en; toggle: () => void };
const LangContext = createContext<Ctx | null>(null);

export const FarmerLangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("farmer-lang") === "so" ? "so" : "en"));
  useEffect(() => localStorage.setItem("farmer-lang", lang), [lang]);
  return (
    <LangContext.Provider value={{ lang, t: dict[lang], toggle: () => setLang((l) => (l === "en" ? "so" : "en")) }}>
      {children}
    </LangContext.Provider>
  );
};

export const useFarmerLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useFarmerLang must be used inside FarmerLangProvider");
  return ctx;
};
