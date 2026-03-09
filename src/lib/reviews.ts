import { db } from "./firebase";
import { ref, set, update, remove, get, query, orderByChild, equalTo, onValue } from "firebase/database";

export interface Review {
  id: string;
  guestName: string;
  guestEmail: string;
  quote: string;
  role: string;
  rating: number;
  createdAt: number;
  published: boolean;
  token?: string;
}

// Generate unique review token for sharing
export const generateReviewToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Create a pending review request
export const createReviewRequest = async (guestName: string, guestEmail: string): Promise<string> => {
  const token = generateReviewToken();
  const reviewId = Date.now().toString();

  await set(ref(db, `reviews/${reviewId}`), {
    guestName,
    guestEmail,
    token,
    quote: "",
    role: "",
    rating: 5,
    createdAt: Date.now(),
    published: false
  });

  return token;
};

// Get review link for guest
export const getReviewLink = (token: string): string => {
  return `${window.location.origin}/submit-review/${token}`;
};

// Get review by token (for guest submission)
export const getReviewByToken = async (token: string): Promise<Review | null> => {
  try {
    const reviewsRef = ref(db, "reviews");
    const snapshot = await get(reviewsRef);

    if (snapshot.exists()) {
      const reviews = snapshot.val();
      for (const [id, review] of Object.entries(reviews)) {
        if ((review as any).token === token) {
          return {
            id,
            ...(review as Omit<Review, 'id'>)
          };
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching review by token:", error);
    return null;
  }
};

// Submit/update review by guest
export const submitReview = async (token: string, quote: string, role: string, rating: number): Promise<boolean> => {
  try {
    const review = await getReviewByToken(token);
    if (!review) return false;

    await update(ref(db, `reviews/${review.id}`), {
      quote,
      role,
      rating,
      updatedAt: Date.now()
    });

    return true;
  } catch (error) {
    console.error("Error submitting review:", error);
    return false;
  }
};

// Get all reviews (for admin)
export const getAllReviews = async (): Promise<Review[]> => {
  try {
    const snapshot = await get(ref(db, "reviews"));
    if (!snapshot.exists()) return [];

    const reviews: Review[] = [];
    snapshot.forEach((childSnapshot) => {
      reviews.push({
        id: childSnapshot.key!,
        ...(childSnapshot.val() as Omit<Review, 'id'>)
      });
    });

    return reviews.sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

// Get published reviews (for testimonials section)
export const getPublishedReviews = async (): Promise<Review[]> => {
  try {
    const publishedQuery = query(ref(db, "reviews"), orderByChild("published"), equalTo(true));
    const snapshot = await get(publishedQuery);
    if (!snapshot.exists()) return [];

    const reviews: Review[] = [];
    snapshot.forEach((childSnapshot) => {
      reviews.push({
        id: childSnapshot.key!,
        ...(childSnapshot.val() as Omit<Review, 'id'>)
      });
    });

    return reviews.sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error("Error fetching published reviews:", error);
    return [];
  }
};

// Subscribe to published reviews in real-time
export const subscribeToPublishedReviews = (
  callback: (reviews: Review[]) => void,
  onError?: (error: unknown) => void
) => {
  const publishedQuery = query(ref(db, "reviews"), orderByChild("published"), equalTo(true));

  return onValue(
    publishedQuery,
    (snapshot) => {
      if (snapshot.exists()) {
        const reviews: Review[] = [];
        snapshot.forEach((childSnapshot) => {
          reviews.push({
            id: childSnapshot.key!,
            ...(childSnapshot.val() as Omit<Review, 'id'>)
          });
        });
        callback(reviews.sort((a, b) => b.createdAt - a.createdAt));
      } else {
        callback([]);
      }
    },
    (error) => {
      console.error("Error subscribing to published reviews:", error);
      if (onError) onError(error);
      callback([]);
    }
  );
};

// Publish/unpublish review
export const toggleReviewPublish = async (reviewId: string, published: boolean): Promise<boolean> => {
  try {
    await update(ref(db, `reviews/${reviewId}`), {
      published
    });
    return true;
  } catch (error) {
    console.error("Error updating review publish status:", error);
    return false;
  }
};

// Delete review
export const deleteReview = async (reviewId: string): Promise<boolean> => {
  try {
    await remove(ref(db, `reviews/${reviewId}`));
    return true;
  } catch (error) {
    console.error("Error deleting review:", error);
    return false;
  }
};
