
import React from 'react';
import { useApp } from '../store.tsx';
import { ShieldCheck, Award, Users, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { lang } = useApp();

  const content = {
    ka: {
      title: 'ჩვენს შესახებ',
      subtitle: '90 წლიანი ისტორია ძილის ინდუსტრიაში',
      story: 'Serta არის მსოფლიო ლიდერი მატრასების წარმოებაში. ჩვენი მიზანია შევცვალოთ ადამიანების ცხოვრება უკეთესი ძილის საშუალებით. 1931 წლიდან მოყოლებული, Serta მუშაობს ინოვაციებზე, რათა შექმნას ყველაზე კომფორტული და გამძლე საძინებელი სისტემები.',
      values: [
        { icon: <ShieldCheck size={32} />, title: 'ხარისხი', desc: 'ამერიკული სტანდარტების მკაცრი კონტროლი.' },
        { icon: <Award size={32} />, title: 'ინოვაცია', desc: 'უახლესი ტექნოლოგიები იდეალური ტემპერატურისთვის.' },
        { icon: <Users size={32} />, title: 'ნდობა', desc: 'მილიონობით კმაყოფილი მომხმარებელი მთელ მსოფლიოში.' },
        { icon: <Heart size={32} />, title: 'ზრუნვა', desc: 'ეკოლოგიურად სუფთა და ჯანსაღი მასალები.' }
      ]
    },
    en: {
      title: 'About Us',
      subtitle: '90 Years of Sleeping History',
      story: 'Serta is a global leader in mattress manufacturing. Our mission is to change lives through better sleep. Since 1931, Serta has been innovating to create the most comfortable and durable sleep systems.',
      values: [
        { icon: <ShieldCheck size={32} />, title: 'Quality', desc: 'Strict adherence to American quality standards.' },
        { icon: <Award size={32} />, title: 'Innovation', desc: 'Latest technologies for perfect sleep temperature.' },
        { icon: <Users size={32} />, title: 'Trust', desc: 'Millions of satisfied customers worldwide.' },
        { icon: <Heart size={32} />, title: 'Care', desc: 'Eco-friendly and healthy materials.' }
      ]
    }
  };

  const t = content[lang];

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden bg-serta-navy">
        <img 
          src="https://images.unsplash.com/photo-1505693415957-2830f529501c?q=80&w=2070&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Serta Heritage"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl lg:text-7xl font-black mb-4 uppercase tracking-tighter">{t.title}</h1>
          <p className="text-xl lg:text-2xl font-medium opacity-80">{t.subtitle}</p>
        </div>
      </section>

      <section className="py-20 lg:py-32 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl lg:text-3xl text-gray-600 leading-relaxed font-medium mb-16 lg:mb-24">
            {t.story}
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.values.map((v, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-[32px] hover:bg-white hover:shadow-2xl transition-all group">
                <div className="text-serta-navy mb-6 group-hover:scale-110 transition-transform">{v.icon}</div>
                <h3 className="text-lg font-black text-serta-navy mb-2 uppercase tracking-tight">{v.title}</h3>
                <p className="text-sm text-gray-400 font-bold">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2070&auto=format&fit=crop" 
              className="rounded-[48px] shadow-2xl"
              alt="Comfort"
            />
          </div>
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black text-serta-navy leading-tight">
              {lang === 'ka' ? 'რატომ უნდა აირჩიოთ Serta?' : 'Why Choose Serta?'}
            </h2>
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-serta-yellow flex-shrink-0 flex items-center justify-center font-black">
                    {i}
                  </div>
                  <div>
                    <h4 className="font-black text-serta-navy mb-1 uppercase text-sm">
                      {lang === 'ka' ? `მიზეზი ${i}` : `Reason ${i}`}
                    </h4>
                    <p className="text-gray-500 text-sm font-medium">
                      {lang === 'ka' 
                        ? 'ჩვენ ვიყენებთ მხოლოდ საუკეთესო მასალებს, რომლებიც უზრუნველყოფენ ხერხემლის სწორ მდგომარეობას.' 
                        : 'We use only the best materials that ensure proper spinal alignment.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
