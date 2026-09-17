import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  getDocFromServer,
  onSnapshot
} from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";
import { PortfolioItem, CustomerLead } from "./types";
import { INITIAL_PORTFOLIO } from "./data/initialData";

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Connection verification check
async function testConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
  } catch (error) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

const PORTFOLIO_COLLECTION = "portfolio_items";
const LEADS_COLLECTION = "customer_leads";

/**
 * Initializes Firestore with the default portfolio items if collection is empty
 */
export async function seedPortfolioIfEmpty(): Promise<PortfolioItem[]> {
  try {
    const colRef = collection(db, PORTFOLIO_COLLECTION);
    const snap = await getDocs(colRef);
    if (snap.empty) {
      // Seed default showcase websites permanently into Firestore
      for (const item of INITIAL_PORTFOLIO) {
        await setDoc(doc(db, PORTFOLIO_COLLECTION, item.id), {
          ...item,
          updatedAt: new Date().toISOString()
        });
      }
      return INITIAL_PORTFOLIO;
    } else {
      const items: PortfolioItem[] = [];
      snap.forEach((d) => {
        items.push(d.data() as PortfolioItem);
      });
      return items;
    }
  } catch (error) {
    console.error("Error seeding or fetching portfolio from Firestore:", error);
    return INITIAL_PORTFOLIO;
  }
}

/**
 * Real-time listener for portfolio updates from Firestore
 */
export function subscribeToPortfolio(onUpdate: (items: PortfolioItem[]) => void) {
  const colRef = collection(db, PORTFOLIO_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const items: PortfolioItem[] = [];
        snapshot.forEach((d) => {
          items.push(d.data() as PortfolioItem);
        });
        onUpdate(items);
      }
    },
    (err) => {
      console.warn("Firestore subscription notice:", err);
    }
  );
}

/**
 * Permanently save/update a portfolio item in Firestore
 */
export async function savePortfolioItemToFirestore(item: PortfolioItem): Promise<void> {
  try {
    const itemRef = doc(db, PORTFOLIO_COLLECTION, item.id);
    await setDoc(itemRef, {
      ...item,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error("Error saving portfolio item to Firestore:", err);
    throw err;
  }
}

/**
 * Permanently delete a portfolio item from Firestore
 */
export async function deletePortfolioItemFromFirestore(id: string): Promise<void> {
  try {
    const itemRef = doc(db, PORTFOLIO_COLLECTION, id);
    await deleteDoc(itemRef);
  } catch (err) {
    console.error("Error deleting portfolio item from Firestore:", err);
    throw err;
  }
}

/**
 * Permanently save a customer lead/inquiry to Firestore
 */
export async function saveLeadToFirestore(lead: CustomerLead): Promise<void> {
  try {
    const leadRef = doc(db, LEADS_COLLECTION, lead.id);
    await setDoc(leadRef, {
      ...lead,
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.error("Error saving lead to Firestore:", err);
  }
}

/**
 * Real-time listener for customer leads from Firestore
 */
export function subscribeToLeads(onUpdate: (leads: CustomerLead[]) => void) {
  const colRef = collection(db, LEADS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const leads: CustomerLead[] = [];
      snapshot.forEach((d) => {
        leads.push(d.data() as CustomerLead);
      });
      if (leads.length > 0) {
        onUpdate(leads);
      }
    },
    (err) => {
      console.warn("Firestore leads subscription notice:", err);
    }
  );
}
