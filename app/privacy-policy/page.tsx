'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const PrivacyPolicyPage = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Topbar />
      
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-[#C4312E] hover:text-[#A02820] mb-8 transition"
          >
            <ArrowLeft size={20} />
            <span>{language === 'bg' ? 'Назад към началото' : 'Back to Home'}</span>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-[#7A0B18] mb-4">
              {language === 'bg' ? 'Политика за поверителност' : 'Privacy Policy'}
            </h1>
            <p className="text-[#6B4423]">
              {language === 'bg'
                ? 'Последна актуализация: 31 октомври 2025'
                : 'Last updated: October 31, 2025'}
            </p>
          </div>

          {/* Content */}
          {language === 'bg' ? (
            <div className="prose prose-lg max-w-none">
              {/* Bulgarian Content */}
              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">1. Въведение</h2>
                <p className="text-[#6B4423] mb-4">
                  Kasameri EOOD ("ние", "нас", "нашето") зачита вашата поверителност и се ангажира да защитава вашите
                  лични данни. Тази политика за поверителност обяснява как събираме, използваме и защитаваме вашата
                  информация, когато посещавате нашия уебсайт kasameri.bg и използвате нашите услуги.
                </p>
                <p className="text-[#6B4423]">
                  Ние сме регистрирани в България и действаме в съответствие с Общия регламент за защита на данните
                  (GDPR) и българското законодателство за защита на личните данни.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">2. Данни, които събираме</h2>
                
                <h3 className="font-semibold text-xl text-[#7A0B18] mb-3">2.1. Информация, която ни предоставяте:</h3>
                <ul className="list-disc pl-6 text-[#6B4423] space-y-2 mb-4">
                  <li><strong>Данни за поръчка:</strong> Име, телефон, имейл адрес, адрес за доставка</li>
                  <li><strong>Комуникация:</strong> Съобщения, които ни изпращате чрез формуляри за контакт или Viber/Messenger</li>
                  <li><strong>Предпочитания:</strong> Езикови предпочитания, съдържание на количката</li>
                </ul>

                <h3 className="font-semibold text-xl text-[#7A0B18] mb-3">2.2. Информация, която събираме автоматично:</h3>
                <ul className="list-disc pl-6 text-[#6B4423] space-y-2">
                  <li><strong>Технически данни:</strong> IP адрес, тип на браузъра, устройство, операционна система</li>
                  <li><strong>Данни за използване:</strong> Страници, които посещавате, време прекарано на сайта</li>
                  <li><strong>Бисквитки:</strong> Информация, съхранявана чрез бисквитки (вижте секция 5)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">3. Как използваме вашите данни</h2>
                <p className="text-[#6B4423] mb-4">Използваме събраната информация за следните цели:</p>
                <ul className="list-disc pl-6 text-[#6B4423] space-y-2">
                  <li><strong>Обработка на поръчки:</strong> За изпълнение на вашите заявки за продукти</li>
                  <li><strong>Комуникация:</strong> За да отговорим на вашите запитвания и да предоставим поддръжка</li>
                  <li><strong>Подобряване на услугите:</strong> За анализ и оптимизация на нашия уебсайт</li>
                  <li><strong>Правни задължения:</strong> За спазване на законови изисквания и защита на нашите права</li>
                  <li><strong>Маркетинг:</strong> Само със ваше изрично съгласие</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">4. Правно основание за обработка</h2>
                <p className="text-[#6B4423] mb-4">Обработваме вашите лични данни на следните основания:</p>
                <ul className="list-disc pl-6 text-[#6B4423] space-y-2">
                  <li><strong>Изпълнение на договор:</strong> Когато обработваме поръчка от вас</li>
                  <li><strong>Съгласие:</strong> Когато сте дали изрично съгласие (напр. за маркетинг или незадължителни бисквитки)</li>
                  <li><strong>Легитимен интерес:</strong> За подобряване на нашите услуги и защита на нашия бизнес</li>
                  <li><strong>Законово задължение:</strong> Когато законът изисква да съхраняваме определени данни</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">5. Бисквитки (Cookies)</h2>
                <p className="text-[#6B4423] mb-4">
                  Нашият уебсайт използва бисквитки за подобряване на вашето преживяване. Бисквитките са малки текстови
                  файлове, съхранявани на вашето устройство.
                </p>
                
                <h3 className="font-semibold text-xl text-[#7A0B18] mb-3">Видове бисквитки, които използваме:</h3>
                <ul className="list-disc pl-6 text-[#6B4423] space-y-2 mb-4">
                  <li><strong>Необходими бисквитки:</strong> Изискват се за основната функционалност на сайта (количка, език)</li>
                  <li><strong>Функционални бисквитки:</strong> Запомнят вашите предпочитания</li>
                  <li><strong>Аналитични бисквитки:</strong> Помагат ни да разберем как използвате сайта (само със съгласие)</li>
                </ul>

                <p className="text-[#6B4423]">
                  Можете да управлявате вашите предпочитания за бисквитки чрез нашия банер за съгласие или настройките на
                  вашия браузър.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">6. Споделяне на данни</h2>
                <p className="text-[#6B4423] mb-4">
                  Ние НЕ продаваме вашите лични данни. Споделяме информация само когато е необходимо:
                </p>
                <ul className="list-disc pl-6 text-[#6B4423] space-y-2">
                  <li><strong>Доставчици на услуги:</strong> Куриерски фирми за доставка на поръчки</li>
                  <li><strong>Платформи за комуникация:</strong> Viber, Messenger (когато избирате да комуникирате чрез тях)</li>
                  <li><strong>Правни изисквания:</strong> Когато законът изисква или за защита на нашите права</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">7. Съхранение на данни</h2>
                <p className="text-[#6B4423] mb-4">
                  Съхраняваме вашите лични данни само докато е необходимо за целите, за които са събрани:
                </p>
                <ul className="list-disc pl-6 text-[#6B4423] space-y-2">
                  <li><strong>Данни за поръчки:</strong> 5 години (счетоводни и данъчни изисквания)</li>
                  <li><strong>Данни за комуникация:</strong> 2 години или до изтриване по ваше искане</li>
                  <li><strong>Бисквитки:</strong> До 12 месеца или до оттегляне на съгласието</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">8. Вашите права</h2>
                <p className="text-[#6B4423] mb-4">Съгласно GDPR имате следните права:</p>
                <ul className="list-disc pl-6 text-[#6B4423] space-y-2">
                  <li><strong>Право на достъп:</strong> Да получите копие от личните си данни</li>
                  <li><strong>Право на коригиране:</strong> Да поправите неточна или непълна информация</li>
                  <li><strong>Право на изтриване:</strong> Да поискате изтриване на вашите данни ("Правото да бъдете забравени")</li>
                  <li><strong>Право на ограничаване:</strong> Да ограничите обработката на вашите данни</li>
                  <li><strong>Право на преносимост:</strong> Да получите данните си в машинно четим формат</li>
                  <li><strong>Право на възражение:</strong> Да възразите срещу обработката за маркетингови цели</li>
                  <li><strong>Право на оттегляне на съгласие:</strong> По всяко време, без да засегне законността на предишната обработка</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">9. Сигурност на данните</h2>
                <p className="text-[#6B4423]">
                  Прилагаме подходящи технически и организационни мерки за защита на вашите лични данни от неразрешен
                  достъп, загуба или злоупотреба. Въпреки това, нито един метод на предаване по интернет или електронно
                  съхранение не е 100% сигурен.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">10. Деца</h2>
                <p className="text-[#6B4423]">
                  Нашите услуги не са предназначени за лица под 16 години. Не събираме съзнателно лични данни от деца.
                  Ако научим, че сме събрали данни от дете без съгласието на родител или настойник, ще ги изтрием незабавно.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">11. Промени в тази политика</h2>
                <p className="text-[#6B4423]">
                  Можем да актуализираме тази политика за поверителност периодично. Ще ви уведомим за всички съществени
                  промени чрез банер на нашия уебсайт. Препоръчваме да преглеждате тази страница редовно.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">12. Контакт</h2>
                <p className="text-[#6B4423] mb-4">
                  За въпроси относно тази политика за поверителност или за упражняване на вашите права, моля свържете се с нас:
                </p>
                <div className="bg-[#FFF7ED] border-l-4 border-[#C4312E] p-6 rounded-lg space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-[#C4312E]"><MapPin size={20} /></div>
                    <div className="text-[#6B4423]">
                      <strong>Kasameri EOOD</strong><br />
                      с. Александрово 5572<br />
                      Община Ловеч, България
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-[#C4312E]"><Mail size={20} /></div>
                    <a href="mailto:teamkasameri@gmail.com" className="text-[#C4312E] hover:underline">
                      teamkasameri@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-[#C4312E]"><Phone size={20} /></div>
                    <a href="tel:+359XXXXXXXXX" className="text-[#C4312E] hover:underline">
                      +359 XXX XXX XXX
                    </a>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">13. Жалби</h2>
                <p className="text-[#6B4423] mb-4">
                  Ако имате оплаквания относно начина, по който обработваме вашите лични данни, имате право да подадете жалба до:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-[#6B4423]">
                    <strong>Комисия за защита на личните данни (КЗЛД)</strong><br />
                    гр. София 1592, бул. "Проф. Цветан Лазаров" № 2<br />
                    Телефон: +359 2 915 3 518<br />
                    Email: kzld@cpdp.bg<br />
                    Уебсайт: <a href="https://www.cpdp.bg" className="text-[#C4312E] hover:underline" target="_blank" rel="noopener noreferrer">www.cpdp.bg</a>
                  </p>
                </div>
              </section>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              {/* English Content */}
              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">1. Introduction</h2>
                <p className="text-[#6B4423] mb-4">
                  Kasameri EOOD ("we", "us", "our") respects your privacy and is committed to protecting your personal
                  data. This privacy policy explains how we collect, use, and protect your information when you visit our
                  website kasameri.bg and use our services.
                </p>
                <p className="text-[#6B4423]">
                  We are registered in Bulgaria and operate in accordance with the General Data Protection Regulation
                  (GDPR) and Bulgarian data protection legislation.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">2. Data We Collect</h2>
                
                <h3 className="font-semibold text-xl text-[#7A0B18] mb-3">2.1. Information You Provide:</h3>
                <ul className="list-disc pl-6 text-[#6B4423] space-y-2 mb-4">
                  <li><strong>Order Data:</strong> Name, phone, email address, delivery address</li>
                  <li><strong>Communication:</strong> Messages you send us through contact forms or Viber/Messenger</li>
                  <li><strong>Preferences:</strong> Language preferences, cart contents</li>
                </ul>

                <h3 className="font-semibold text-xl text-[#7A0B18] mb-3">2.2. Information We Collect Automatically:</h3>
                <ul className="list-disc pl-6 text-[#6B4423] space-y-2">
                  <li><strong>Technical Data:</strong> IP address, browser type, device, operating system</li>
                  <li><strong>Usage Data:</strong> Pages you visit, time spent on site</li>
                  <li><strong>Cookies:</strong> Information stored through cookies (see section 5)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">3. How We Use Your Data</h2>
                <p className="text-[#6B4423] mb-4">We use the collected information for the following purposes:</p>
                <ul className="list-disc pl-6 text-[#6B4423] space-y-2">
                  <li><strong>Order Processing:</strong> To fulfill your product requests</li>
                  <li><strong>Communication:</strong> To respond to your inquiries and provide support</li>
                  <li><strong>Service Improvement:</strong> To analyze and optimize our website</li>
                  <li><strong>Legal Obligations:</strong> To comply with legal requirements and protect our rights</li>
                  <li><strong>Marketing:</strong> Only with your explicit consent</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">4. Legal Basis for Processing</h2>
                <p className="text-[#6B4423] mb-4">We process your personal data on the following grounds:</p>
                <ul className="list-disc pl-6 text-[#6B4423] space-y-2">
                  <li><strong>Contract Performance:</strong> When processing an order from you</li>
                  <li><strong>Consent:</strong> When you have given explicit consent (e.g., for marketing or optional cookies)</li>
                  <li><strong>Legitimate Interest:</strong> For improving our services and protecting our business</li>
                  <li><strong>Legal Obligation:</strong> When the law requires us to retain certain data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">5. Cookies</h2>
                <p className="text-[#6B4423] mb-4">
                  Our website uses cookies to improve your experience. Cookies are small text files stored on your device.
                </p>
                
                <h3 className="font-semibold text-xl text-[#7A0B18] mb-3">Types of cookies we use:</h3>
                <ul className="list-disc pl-6 text-[#6B4423] space-y-2 mb-4">
                  <li><strong>Necessary Cookies:</strong> Required for basic site functionality (cart, language)</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how you use the site (with consent only)</li>
                </ul>

                <p className="text-[#6B4423]">
                  You can manage your cookie preferences through our consent banner or your browser settings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">6. Data Sharing</h2>
                <p className="text-[#6B4423] mb-4">
                  We DO NOT sell your personal data. We share information only when necessary:
                </p>
                <ul className="list-disc pl-6 text-[#6B4423] space-y-2">
                  <li><strong>Service Providers:</strong> Courier companies for order delivery</li>
                  <li><strong>Communication Platforms:</strong> Viber, Messenger (when you choose to communicate through them)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">7. Data Retention</h2>
                <p className="text-[#6B4423] mb-4">
                  We retain your personal data only as long as necessary for the purposes for which it was collected:
                </p>
                <ul className="list-disc pl-6 text-[#6B4423] space-y-2">
                  <li><strong>Order Data:</strong> 5 years (accounting and tax requirements)</li>
                  <li><strong>Communication Data:</strong> 2 years or until deletion upon your request</li>
                  <li><strong>Cookies:</strong> Up to 12 months or until consent withdrawal</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">8. Your Rights</h2>
                <p className="text-[#6B4423] mb-4">Under GDPR, you have the following rights:</p>
                <ul className="list-disc pl-6 text-[#6B4423] space-y-2">
                  <li><strong>Right of Access:</strong> To receive a copy of your personal data</li>
                  <li><strong>Right to Rectification:</strong> To correct inaccurate or incomplete information</li>
                  <li><strong>Right to Erasure:</strong> To request deletion of your data ("Right to be Forgotten")</li>
                  <li><strong>Right to Restriction:</strong> To restrict processing of your data</li>
                  <li><strong>Right to Portability:</strong> To receive your data in machine-readable format</li>
                  <li><strong>Right to Object:</strong> To object to processing for marketing purposes</li>
                  <li><strong>Right to Withdraw Consent:</strong> At any time, without affecting lawfulness of prior processing</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">9. Data Security</h2>
                <p className="text-[#6B4423]">
                  We implement appropriate technical and organizational measures to protect your personal data from
                  unauthorized access, loss, or misuse. However, no method of transmission over the internet or electronic
                  storage is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">10. Children</h2>
                <p className="text-[#6B4423]">
                  Our services are not intended for individuals under 16 years of age. We do not knowingly collect personal
                  data from children. If we learn we have collected data from a child without parental consent, we will
                  delete it immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">11. Changes to This Policy</h2>
                <p className="text-[#6B4423]">
                  We may update this privacy policy periodically. We will notify you of any material changes through a
                  banner on our website. We recommend reviewing this page regularly.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">12. Contact</h2>
                <p className="text-[#6B4423] mb-4">
                  For questions about this privacy policy or to exercise your rights, please contact us:
                </p>
                <div className="bg-[#FFF7ED] border-l-4 border-[#C4312E] p-6 rounded-lg space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-[#C4312E]"><MapPin size={20} /></div>
                    <div className="text-[#6B4423]">
                      <strong>Kasameri EOOD</strong><br />
                      Aleksandrovo 5572<br />
                      Lovech Municipality, Bulgaria
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-[#C4312E]"><Mail size={20} /></div>
                    <a href="mailto:teamkasameri@gmail.com" className="text-[#C4312E] hover:underline">
                      teamkasameri@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-[#C4312E]"><Phone size={20} /></div>
                    <a href="tel:+359XXXXXXXXX" className="text-[#C4312E] hover:underline">
                      +359 XXX XXX XXX
                    </a>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-[#7A0B18] mb-4">13. Complaints</h2>
                <p className="text-[#6B4423] mb-4">
                  If you have complaints about how we process your personal data, you have the right to lodge a complaint with:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-[#6B4423]">
                    <strong>Commission for Personal Data Protection (CPDP)</strong><br />
                    Sofia 1592, 2 Prof. Tsvetan Lazarov Blvd<br />
                    Phone: +359 2 915 3 518<br />
                    Email: kzld@cpdp.bg<br />
                    Website: <a href="https://www.cpdp.bg" className="text-[#C4312E] hover:underline" target="_blank" rel="noopener noreferrer">www.cpdp.bg</a>
                  </p>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;

