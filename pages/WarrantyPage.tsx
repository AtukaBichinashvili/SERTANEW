
import React from 'react';
import { useApp } from '../store.tsx';
import { ShieldCheck, FileText, CheckCircle, HelpCircle } from 'lucide-react';

const WarrantyPage: React.FC = () => {
  const { lang } = useApp();

  const content = {
    ka: {
      title: 'საგარანტიო პირობები',
      subtitle: 'ჩვენ ვენდობით ჩვენს ხარისხს',
      intro: 'Serta-ს ყველა მატრასზე ვრცელდება ხანგრძლივი გარანტია, რაც ადასტურებს პროდუქციის გამძლეობას და საიმედოობას.',
      sections: [
        {
          title: 'რას მოიცავს გარანტია?',
          items: [
            'საგაზაფხულო სისტემის დეფორმაცია.',
            'ქსოვილის ქარხნული წუნი.',
            'ფორმის დაკარგვა (3სმ-ზე მეტი ჩავარდნა).'
          ]
        },
        {
          title: 'როგორ ვისარგებლოთ?',
          items: [
            'შეინახეთ ჩეკი და საგარანტიო ტალონი.',
            'დაუკავშირდით ჩვენს სერვის ცენტრს.',
            'ჩვენი სპეციალისტი შეამოწმებს პროდუქტს.'
          ]
        }
      ]
    },
    en: {
      title: 'Warranty Policy',
      subtitle: 'We Stand Behind Our Quality',
      intro: 'All Serta mattresses come with a long-term warranty, which confirms the durability and reliability of the products.',
      sections: [
        {
          title: 'What does the warranty cover?',
          items: [
            'Spring system deformation.',
            'Manufacturing defects in fabric.',
            'Loss of shape (depression greater than 3cm).'
          ]
        },
        {
          title: 'How to use it?',
          items: [
            'Keep your receipt and warranty card.',
            'Contact our service center.',
            'Our specialist will inspect the product.'
          ]
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <div className="py-20 lg:py-32 container mx-auto px-4 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20 lg:mb-32">
          <div className="w-24 h-24 bg-serta-navy text-serta-yellow rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <ShieldCheck size={48} />
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-serta-navy mb-6 uppercase tracking-tight">{t.title}</h1>
          <p className="text-xl text-gray-400 font-bold uppercase tracking-widest">{t.subtitle}</p>
        </div>

        <div className="bg-white rounded-[48px] shadow-2xl p-10 lg:p-20 border border-gray-50 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 text-gray-50 opacity-10 pointer-events-none">
            <FileText size={200} />
          </div>
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-medium mb-16 text-center lg:text-left">
            {t.intro}
          </p>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {t.sections.map((section, idx) => (
              <div key={idx} className="space-y-8">
                <h2 className="text-2xl font-black text-serta-navy flex items-center gap-3">
                   <div className="w-2 h-8 bg-serta-yellow rounded-full"></div>
                   {section.title}
                </h2>
                <ul className="space-y-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-500 font-bold text-lg">
                      <CheckCircle size={24} className="text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-serta-navy text-white p-10 lg:p-16 rounded-[48px] text-center shadow-2xl">
           <HelpCircle size={40} className="mx-auto mb-6 text-serta-yellow" />
           <h3 className="text-2xl font-black mb-4">
             {lang === 'ka' ? 'გაქვთ კითხვები?' : 'Have Questions?'}
           </h3>
           <p className="text-white/60 font-bold mb-8">
             {lang === 'ka' ? 'ჩვენი გუნდი მზად არის დაგეხმაროთ.' : 'Our team is ready to help you.'}
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a href="tel:+995555123456" className="bg-serta-yellow text-serta-navy px-10 py-4 rounded-2xl font-black hover:scale-105 transition-all">
                {lang === 'ka' ? 'დაგვირეკეთ' : 'Call Us'}
             </a>
             <button className="bg-white/10 px-10 py-4 rounded-2xl font-black hover:bg-white/20 transition-all">
                {lang === 'ka' ? 'მოგვწერეთ' : 'Email Us'}
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WarrantyPage;
