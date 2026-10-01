import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';
import { Globe, ChevronDown, Check } from 'lucide-react';

export const LanguageSelector: React.FC<{ variant?: 'header' | 'mobile' }> = ({ variant = 'header' }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; flag: string; short: string }[] = [
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳', short: 'VI' },
    { code: 'zh', label: '中文 (Chinese)', flag: '🇨🇳', short: 'ZH' },
    { code: 'en', label: 'English', flag: '🇬🇧', short: 'EN' },
  ];

  const current = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'mobile') {
    return (
      <div className="p-3 bg-stone-100 rounded-2xl border border-stone-200">
        <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-amber-700" />
          <span>Chọn ngôn ngữ / Language / 语言</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setLanguage(l.code)}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                language === l.code
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.short}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs"
        aria-label="Chọn ngôn ngữ"
      >
        <span className="text-sm">{current.flag}</span>
        <span className="font-bold">{current.short}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-stone-400 tracking-wider border-b border-stone-100">
            Ngôn ngữ / Language
          </div>
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLanguage(l.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 text-xs font-medium flex items-center justify-between hover:bg-amber-50 hover:text-amber-800 transition-colors ${
                language === l.code ? 'text-amber-800 font-bold bg-amber-50/60' : 'text-stone-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{l.flag}</span>
                <span>{l.label}</span>
              </div>
              {language === l.code && <Check className="w-3.5 h-3.5 text-amber-700 stroke-[3]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
