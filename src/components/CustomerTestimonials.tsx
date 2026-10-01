import React, { useState } from 'react';
import { Star, CheckCircle, Heart, MessageSquarePlus, ThumbsUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CustomerTestimonials: React.FC = () => {
  const { t } = useLanguage();
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likes, setLikes] = useState<Record<string, number>>({
    'owner-1': 48,
    'owner-2': 36,
    'owner-3': 41,
    'owner-4': 52,
  });

  // Form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newStars, setNewStars] = useState(5);
  const [newContent, setNewContent] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filterTabs = [
    { id: 'all', label: t.reviews.filterAll },
    { id: 'odor', label: t.reviews.filterOdor },
    { id: 'dust', label: t.reviews.filterDust },
    { id: 'clump', label: t.reviews.filterClump },
  ];

  const handleLike = (id: string) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newContent) return;

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsModalOpen(false);
      setNewAuthor('');
      setNewRole('');
      setNewContent('');
    }, 2000);
  };

  return (
    <section id="danh-gia" className="py-16 sm:py-24 bg-[#F8F5F0] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-amber-800 bg-amber-100/80 px-3 py-1 rounded-md border border-amber-300 mb-3">
              <Heart className="w-3.5 h-3.5 fill-amber-700 text-amber-700" /> {t.reviews.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-snug">
              {t.reviews.title1} <span className="text-amber-700">{t.reviews.titleHighlight}</span>?
            </h2>
            <p className="text-stone-600 text-base sm:text-lg mt-2 max-w-2xl">
              {t.reviews.desc}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-200" />
              <span>{t.reviews.writeReviewBtn}</span>
            </button>
          </div>
        </div>

        {/* Aggregate Score Bar */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="text-4xl sm:text-5xl font-black text-stone-900">
              4.9<span className="text-xl text-stone-400 font-normal">/5</span>
            </div>
            <div>
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
                {t.reviews.basedOn}
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 divide-x divide-stone-200 text-center">
            {t.reviews.metrics.map((m, idx) => (
              <div key={idx} className="px-2">
                <span className="text-xs text-stone-500 block">{m.label}</span>
                <strong className="text-sm sm:text-base font-extrabold text-amber-800">{m.value}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTag(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedTag === tab.id
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.reviews.items.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center gap-3.5 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-200 shrink-0 shadow-xs"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-stone-900 text-base truncate">
                        {review.author}
                      </span>
                      <span title={t.reviews.verifiedBuyer}>
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 truncate">{review.role}</p>
                    {review.location && (
                      <p className="text-[11px] text-amber-800 font-medium">📍 {review.location}</p>
                    )}
                  </div>
                </div>

                {/* Stars and Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-stone-400">{review.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-stone-700 text-sm leading-relaxed mb-4 italic">
                  "{review.content}"
                </p>
              </div>

              {/* Bottom Helpful Counter */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md">
                  {t.reviews.verifiedBuyer}
                </span>

                <button
                  onClick={() => handleLike(review.id)}
                  className="flex items-center gap-1.5 hover:text-amber-800 transition-colors py-1 px-2.5 rounded-lg hover:bg-stone-50"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-stone-500" />
                  <span>{t.reviews.helpful} ({likes[review.id] || 0})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Write a review */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-stone-900">
                  {t.reviews.modalTitle}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              </div>

              {formSubmitted ? (
                <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <div className="text-base font-bold text-emerald-900">
                    {t.reviews.modalSubmittedTitle}
                  </div>
                  <p className="text-xs text-emerald-700">
                    {t.reviews.modalSubmittedDesc}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {t.reviews.formName}
                    </label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {t.reviews.formLocation}
                    </label>
                    <input
                      type="text"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {t.reviews.formRating}
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewStars(star)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newStars ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-stone-600 ml-2">
                        {newStars} / 5
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {t.reviews.formContent}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 text-sm font-medium"
                    >
                      {t.reviews.formCancel}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-sm font-bold shadow-md"
                    >
                      {t.reviews.formSubmit}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
