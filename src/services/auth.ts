import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseAuthUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseDb } from '../config/firebase';

export type SpecialtyId = 'developer' | 'designer' | 'devops';

export type User = {
  id: string;
  email: string;
  name: string;
  city: string;
  birthDate: string | null;
  specialty: SpecialtyId | null;
  onboardingCompleted: boolean;
  testAnswers: number[];
  levelPercent: number;
};

export type RegisterInput = {
  name: string;
  city: string;
  birthDate: string | null;
  email: string;
  password: string;
};

type UserDoc = Omit<User, 'id' | 'email'> & { email: string };

const USERS_COLLECTION = 'users';

function computeLevel(answers: number[], questions: { correctIndex: number }[]): number {
  if (questions.length === 0) return 0;
  const correct = answers.filter((a, i) => a === questions[i]?.correctIndex).length;
  return Math.round((correct / questions.length) * 100);
}

function mapDocToUser(id: string, data: UserDoc): User {
  return {
    id,
    email: data.email,
    name: data.name,
    city: data.city,
    birthDate: data.birthDate ?? null,
    specialty: data.specialty ?? null,
    onboardingCompleted: data.onboardingCompleted ?? false,
    testAnswers: data.testAnswers ?? [],
    levelPercent: data.levelPercent ?? 0,
  };
}

function defaultUserDoc(email: string, extra?: Partial<UserDoc>): UserDoc {
  return {
    email,
    name: '',
    city: '',
    birthDate: null,
    specialty: null,
    onboardingCompleted: false,
    testAnswers: [],
    levelPercent: 0,
    ...extra,
  };
}

function mapFirebaseAuthError(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Аккаунт с таким email уже существует';
    case 'auth/invalid-email':
      return 'Введите корректный email';
    case 'auth/weak-password':
      return 'Пароль должен быть не короче 6 символов';
    case 'auth/user-not-found':
      return 'Аккаунт не найден. Зарегистрируйтесь';
    case 'auth/wrong-password':
      return 'Неверный пароль';
    case 'auth/invalid-credential':
      return 'Неверный email или пароль';
    case 'auth/too-many-requests':
      return 'Слишком много попыток. Попробуйте позже';
    case 'auth/network-request-failed':
      return 'Нет подключения к интернету';
    default:
      return 'Ошибка авторизации. Попробуйте снова';
  }
}

async function fetchUserProfile(uid: string, email: string): Promise<User> {
  const ref = doc(getFirebaseDb(), USERS_COLLECTION, uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const docData = defaultUserDoc(email);
    await setDoc(ref, docData);
    return mapDocToUser(uid, docData);
  }

  return mapDocToUser(uid, snap.data() as UserDoc);
}

async function firebaseUserToAppUser(firebaseUser: FirebaseAuthUser): Promise<User> {
  const email = firebaseUser.email ?? '';
  return fetchUserProfile(firebaseUser.uid, email);
}

export function subscribeAuthState(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(getFirebaseAuth(), async (firebaseUser) => {
    if (!firebaseUser) {
      callback(null);
      return;
    }
    try {
      const profile = await firebaseUserToAppUser(firebaseUser);
      callback(profile);
    } catch {
      callback(null);
    }
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const firebaseUser = getFirebaseAuth().currentUser;
  if (!firebaseUser) return null;
  return firebaseUserToAppUser(firebaseUser);
}

export async function register(input: RegisterInput): Promise<{ user: User } | { error: string }> {
  const email = input.email.trim().toLowerCase();
  if (!email.includes('@')) return { error: 'Введите корректный email' };
  if (input.password.length < 6) return { error: 'Пароль должен быть не короче 6 символов' };
  if (!input.name.trim()) return { error: 'Укажите фамилию и имя' };
  if (!input.city.trim()) return { error: 'Укажите город' };

  try {
    const credential = await createUserWithEmailAndPassword(getFirebaseAuth(), email, input.password);
    const docData: UserDoc = {
      email,
      name: input.name.trim(),
      city: input.city.trim(),
      birthDate: input.birthDate,
      specialty: null,
      onboardingCompleted: false,
      testAnswers: [],
      levelPercent: 0,
    };

    await setDoc(doc(getFirebaseDb(), USERS_COLLECTION, credential.user.uid), docData);
    return { user: mapDocToUser(credential.user.uid, docData) };
  } catch (error: unknown) {
    const code = (error as { code?: string }).code ?? '';
    return { error: mapFirebaseAuthError(code) };
  }
}

export async function login(email: string, password: string): Promise<{ user: User } | { error: string }> {
  const normalized = email.trim().toLowerCase();
  if (!normalized.includes('@')) return { error: 'Введите корректный email' };
  if (!password) return { error: 'Введите пароль' };

  try {
    const credential = await signInWithEmailAndPassword(getFirebaseAuth(), normalized, password);
    const user = await firebaseUserToAppUser(credential.user);
    return { user };
  } catch (error: unknown) {
    const code = (error as { code?: string }).code ?? '';
    return { error: mapFirebaseAuthError(code) };
  }
}

export async function logout(): Promise<void> {
  await signOut(getFirebaseAuth());
}

async function patchUserDoc(userId: string, patch: Partial<UserDoc>): Promise<User | null> {
  const ref = doc(getFirebaseDb(), USERS_COLLECTION, userId);
  await updateDoc(ref, patch);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return mapDocToUser(userId, snap.data() as UserDoc);
}

export async function updateUser(userId: string, patch: Partial<User>): Promise<User | null> {
  const { id: _id, email: _email, ...docPatch } = patch;
  return patchUserDoc(userId, docPatch);
}

export async function setSpecialty(userId: string, specialty: SpecialtyId): Promise<User | null> {
  return patchUserDoc(userId, { specialty, testAnswers: [] });
}

export async function saveTestAnswer(
  userId: string,
  questionIndex: number,
  answerIndex: number,
  questions: { correctIndex: number }[],
): Promise<User | null> {
  const current = await getCurrentUser();
  if (!current || current.id !== userId) return null;

  const testAnswers = [...current.testAnswers];
  testAnswers[questionIndex] = answerIndex;
  const levelPercent = computeLevel(testAnswers, questions);

  return patchUserDoc(userId, { testAnswers, levelPercent });
}

export async function completeOnboarding(userId: string): Promise<User | null> {
  return patchUserDoc(userId, { onboardingCompleted: true });
}

export const specialtyLabels: Record<SpecialtyId, string> = {
  developer: 'Разработчик',
  designer: 'UX/UI дизайнер',
  devops: 'DevOps-инженер',
};
