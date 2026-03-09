import { useEffect, useState } from "react";
import { FiMail, FiCopy, FiTrash2, FiEye, FiEyeOff, FiStar, FiX, FiMessageCircle } from "react-icons/fi";
import { getAllReviews, createReviewRequest, getReviewLink, toggleReviewPublish, deleteReview, Review } from "../../lib/reviews";
import { motion } from "framer-motion";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviting, setInviting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [lastInviteToken, setLastInviteToken] = useState<string | null>(null);
  const [lastInviteName, setLastInviteName] = useState<string>("");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    const data = await getAllReviews();
    setReviews(data);
    setLoading(false);
  };

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    setInviting(true);
    try {
      const token = await createReviewRequest(inviteName, inviteEmail);
      const link = getReviewLink(token);
      
      // Store for WhatsApp share
      setLastInviteToken(token);
      setLastInviteName(inviteName);

      // Copy to clipboard
      await navigator.clipboard.writeText(link);
      setCopiedId(token);
      setTimeout(() => setCopiedId(null), 2000);

      // Reset form
      setInviteName("");
      setInviteEmail("");

      // Reload reviews
      await loadReviews();

      alert(`Review link copied to clipboard!\n\nShare this link with ${inviteName}: ${link}`);
    } catch (error) {
      alert("Failed to create review request");
    } finally {
      setInviting(false);
    }
  };

  const handleCopyLink = async (token?: string) => {
    if (!token) return;
    const link = getReviewLink(token);
    await navigator.clipboard.writeText(link);
    setCopiedId(token);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleWhatsAppShare = (token: string, guestName: string) => {
    if (!token) return;
    const link = getReviewLink(token);
    const message = encodeURIComponent(
      `Hi ${guestName}! 👋\n\nWe'd love to hear about your stay at JN Apartments. Please share your feedback and help us improve.\n\n${link}`
    );
    window.open(`https://web.whatsapp.com/send?text=${message}`, "_blank");
  };

  const handleTogglePublish = async (id: string, currentPublished: boolean) => {
    await toggleReviewPublish(id, !currentPublished);
    await loadReviews();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      await deleteReview(id);
      await loadReviews();
    }
  };

  const publishedCount = reviews.filter(r => r.published).length;
  const pendingCount = reviews.filter(r => !r.quote).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Guest Reviews</h2>
          <p className="mt-1 text-sm text-slate-400">
            Manage and publish guest testimonials
          </p>
        </div>
        <button
          onClick={() => setShowInviteForm(true)}
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600 transition"
        >
          <FiMail className="w-4 h-4" />
          Send Invite
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-widest text-slate-400">Total Reviews</p>
          <p className="mt-2 text-3xl font-bold text-white">{reviews.length}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-widest text-slate-400">Published</p>
          <p className="mt-2 text-3xl font-bold text-brand-400">{publishedCount}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-widest text-slate-400">Pending</p>
          <p className="mt-2 text-3xl font-bold text-yellow-400">{pendingCount}</p>
        </div>
      </div>

      {/* Invite Form Modal */}
      {showInviteForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowInviteForm(false)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-lg border border-white/10 bg-slate-900 p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Send Review Invite</h3>
              <button
                onClick={() => setShowInviteForm(false)}
                className="text-slate-400 hover:text-white"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Guest Name
                </label>
                <input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                  placeholder="e.g., John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Guest Email
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                  placeholder="guest@example.com"
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowInviteForm(false);
                    setLastInviteToken(null);
                    setLastInviteName("");
                  }}
                  className="flex-1 rounded-lg border border-white/10 px-4 py-2 text-white hover:bg-white/5 transition"
                >
                  Close
                </button>
                {lastInviteToken ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        handleWhatsAppShare(lastInviteToken, lastInviteName);
                        setShowInviteForm(false);
                        setLastInviteToken(null);
                        setLastInviteName("");
                      }}
                      className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition flex items-center justify-center gap-2"
                    >
                      <FiMessageCircle className="w-4 h-4" />
                      Share on WhatsApp
                    </button>
                  </>
                ) : (
                  <button
                    type="submit"
                    disabled={inviting}
                    className="flex-1 rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600 disabled:opacity-50 transition"
                  >
                    {inviting ? "Sending..." : "Send Invite"}
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Reviews List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-slate-400">Loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="rounded-lg border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-slate-400">No reviews yet. Send invites to collect guest feedback!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-lg border p-4 transition ${
                review.published
                  ? "border-brand-500/30 bg-brand-500/5"
                  : review.quote
                  ? "border-yellow-500/30 bg-yellow-500/5"
                  : "border-slate-700/50 bg-slate-800/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-white truncate">{review.guestName}</h4>
                    {!review.quote && (
                      <span className="inline-block px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-400 whitespace-nowrap">
                        Pending
                      </span>
                    )}
                    {review.published && (
                      <span className="inline-block px-2 py-1 rounded text-xs bg-brand-500/20 text-brand-400 whitespace-nowrap">
                        Published
                      </span>
                    )}
                  </div>

                  {review.quote && (
                    <>
                      <p className="text-slate-300 text-sm mb-2 line-clamp-2">"{review.quote}"</p>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                        <span>{review.role}</span>
                        <span>•</span>
                        <div className="flex gap-1">
                          {[...Array(review.rating || 5)].map((_, i) => (
                            <FiStar key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <p className="text-xs text-slate-500">{review.guestEmail}</p>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  {review.token && !review.quote && (
                    <>
                      <button
                        onClick={() => handleWhatsAppShare(review.token!, review.guestName)}
                        title="Share via WhatsApp"
                        className="p-2 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-green-500/30 hover:bg-green-500/10 transition"
                      >
                        <FiMessageCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCopyLink(review.token)}
                        title="Copy review link"
                        className="p-2 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition"
                      >
                        {copiedId === review.token ? (
                          <span className="text-xs text-green-400">Copied!</span>
                        ) : (
                          <FiCopy className="w-4 h-4" />
                        )}
                      </button>
                    </>
                  )}

                  {review.quote && (
                    <button
                      onClick={() => handleTogglePublish(review.id, review.published)}
                      title={review.published ? "Unpublish" : "Publish"}
                      className={`p-2 rounded-lg border transition ${
                        review.published
                          ? "border-brand-500/30 text-brand-400"
                          : "border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {review.published ? (
                        <FiEye className="w-4 h-4" />
                      ) : (
                        <FiEyeOff className="w-4 h-4" />
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedReview(review)}
                    className="px-3 py-2 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition text-sm"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-2 rounded-lg border border-white/10 text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Review Detail Modal */}
      {selectedReview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedReview(null)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-lg border border-white/10 bg-slate-900 p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Review Details</h3>
              <button
                onClick={() => setSelectedReview(null)}
                className="text-slate-400 hover:text-white"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Name</p>
                <p className="text-white font-semibold">{selectedReview.guestName}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Email</p>
                <p className="text-slate-300">{selectedReview.guestEmail}</p>
              </div>

              {selectedReview.quote && (
                <>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Review</p>
                    <p className="text-slate-300 text-lg">"{selectedReview.quote}"</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Role</p>
                      <p className="text-white">{selectedReview.role}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Rating</p>
                      <div className="flex gap-1">
                        {[...Array(selectedReview.rating || 5)].map((_, i) => (
                          <FiStar key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => {
                        handleTogglePublish(selectedReview.id, selectedReview.published);
                        setSelectedReview(null);
                      }}
                      className={`flex-1 px-4 py-2 rounded-lg transition ${
                        selectedReview.published
                          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          : "bg-brand-500/20 text-brand-400 hover:bg-brand-500/30"
                      }`}
                    >
                      {selectedReview.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(selectedReview.id);
                        setSelectedReview(null);
                      }}
                      className="flex-1 px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}

              {!selectedReview.quote && selectedReview.token && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Share this link with the guest</p>
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={getReviewLink(selectedReview.token)}
                      readOnly
                      className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300"
                    />
                    <button
                      onClick={() => handleCopyLink(selectedReview.token)}
                      className="px-3 py-2 rounded-lg bg-brand-500/20 text-brand-400 hover:bg-brand-500/30 transition"
                    >
                      Copy
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      handleWhatsAppShare(selectedReview.token!, selectedReview.guestName);
                      setSelectedReview(null);
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <FiMessageCircle className="w-4 h-4" />
                    Share on WhatsApp
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
