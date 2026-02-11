import React, { useState } from 'react';
import { ChevronLeft, RefreshCcw, Info, CheckCircle, BarChart2, Star, Zap, Target, HelpCircle } from 'lucide-react';

// --- Data & Content ---

const PART_1_QUESTIONS = [
  { id: 1, text: "אני רואה את עצמי חלק מתמונה רחבה מעבר ליחידה שלי." },
  { id: 2, text: "כשאני מקבל/ת החלטות – אני בוחן/ת את ההשפעה על הארגון כולו." },
  { id: 3, text: "חשוב לי ליישר קו עם החזון המשותף, גם כשיש מורכבות." },
  { id: 4, text: "אני מחפש/ת הזדמנויות לתרום ליעדים מערכתיים." },
  { id: 5, text: "אני מרגיש/ה שההצלחה שלי כרוכה בהצלחת אחרים בארגון." },
];

const PART_2_QUESTIONS = [
  { id: 6, text: "אני יוזם/ת שיתופי פעולה ולא מחכה שיפנו אליי." },
  { id: 7, text: "אני מביע/ה עמדה גם כשזה לא נוח." },
  { id: 8, text: "יש לי קשרים משמעותיים מעבר למעגל הקרוב שלי." },
  { id: 9, text: "כשיש מתח או אי-הסכמה – אני בוחר/ת להיכנס לשיחה ולא להימנע." },
  { id: 10, text: "אנשים רואים בי גורם מחבר ומשפיע." },
];

type ResultType = {
  title: string;
  icon: React.ReactNode;
  themeColor: string; 
  bgGradient: string;
  description: string;
  subDescription: string;
  advice: string;
};

// --- Deciphering Logic ---

const getResultData = (alignmentScore: number, presenceScore: number): ResultType => {
  const HIGH_MIN = 20;
  const MED_MIN = 15;

  const isHighA = alignmentScore >= HIGH_MIN;
  const isMedA = alignmentScore >= MED_MIN && alignmentScore < HIGH_MIN;
  const isLowA = alignmentScore < MED_MIN;

  const isHighP = presenceScore >= HIGH_MIN;
  const isMedP = presenceScore >= MED_MIN && presenceScore < HIGH_MIN;
  const isLowP = presenceScore < MED_MIN;

  // 🟢 ינשוף/ה מובהק/ת (High/High)
  if (isHighA && isHighP) {
    return {
      title: "ינשוף/ה מובהק/ת",
      icon: <Star className="w-16 h-16 text-emerald-600" />,
      themeColor: "text-emerald-900",
      bgGradient: "from-emerald-50 to-emerald-100",
      description: "את/ה שותף/ה אסטרטגי/ת מלא/ה",
      subDescription: "את/ה מחובר/ת לחזון ופועל/ת בזירה. יש בך גם מחויבות מערכתית וגם נוכחות שמשפיעה על אחרים. אנשים סביבך מרגישים שיש על מי להישען כשצריך חיבור בין חלקים.",
      advice: "כיוון תנועה: לשמור על ענווה והקשבה, ולוודא שאת/ה לא נושא/ת את המערכת לבד."
    };
  }

  // 🟢 ינשוף/ה בהתהוות (One High, One Medium)
  if ((isHighA && isMedP) || (isMedA && isHighP)) {
    const missingPart = isHighA ? "נוכחות" : "הלימה";
    return {
      title: "ינשוף/ה בהתהוות",
      icon: <Target className="w-16 h-16 text-emerald-500" />,
      themeColor: "text-emerald-800",
      bgGradient: "from-emerald-50 to-blue-50",
      description: "את/ה בדרך לשותפות אסטרטגית מלאה",
      subDescription: "יש לך או חיבור עמוק או נוכחות חזקה – ואחד מהם עדיין מתפתח. הפוטנציאל שם, והוא ברור. זה רגע מצוין לדייק את האיזון בין מחויבות להשפעה.",
      advice: `כיוון תנועה: מה הציר שחסר לו 2–3 נקודות? שם נמצאת הקפיצה הבאה שלך (ציר ה${missingPart}).`
    };
  }

  // 🐑 כבש/ה מובהק/ת (High A, Low P)
  if (isHighA && isLowP) {
    return {
      title: "כבש/ה מובהק/ת",
      icon: <Info className="w-16 h-16 text-blue-600" />,
      themeColor: "text-blue-900",
      bgGradient: "from-blue-50 to-blue-100",
      description: "הלב שלך במקום הנכון",
      subDescription: "את/ה מחובר/ת לערכים ולחזון ומזדהה עם הדרך. עם זאת, הקול שלך פחות נשמע בזירה המשותפת. יש בך פוטנציאל השפעה שלא תמיד בא לידי ביטוי.",
      advice: "כיוון תנועה: לבחור רגע אחד שבו את/ה נכנס/ת לשיחה גם אם זה מעט לא נוח."
    };
  }

  // 🐑 כבש/ה מתעורר/ת (High A, Med P)
  if (isHighA && isMedP) {
     return {
      title: "כבש/ה מתעורר/ת",
      icon: <Zap className="w-16 h-16 text-cyan-600" />,
      themeColor: "text-cyan-900",
      bgGradient: "from-cyan-50 to-cyan-100",
      description: "את/ה מתחיל/ה לקחת מקום",
      subDescription: "יש בך מחויבות אמיתית וגם התחלה של נוכחות. ייתכן שאת/ה עדיין בודק/ת את גבולות ההשפעה שלך. זו נקודת צמיחה עדינה ומשמעותית.",
      advice: "כיוון תנועה: לזהות איפה את/ה כבר משפיע/ה — ולהרחיב את זה במודע."
    };
  }

  // 🦊 שועל/ה מובהק/ת (Low A, High P)
  if (isLowA && isHighP) {
    return {
      title: "שועל/ה מובהק/ת",
      icon: <BarChart2 className="w-16 h-16 text-orange-600" />,
      themeColor: "text-orange-900",
      bgGradient: "from-orange-50 to-orange-100",
      description: "את/ה שחקן/ית חזק/ה בזירה",
      subDescription: "יש לך נוכחות, הבנה מערכתית ויכולת להשפיע. יחד עם זאת, החיבור לחזון הרחב אינו מלא או עקבי. ההשפעה שלך משמעותית – השאלה היא לאיזה כיוון היא מופנית.",
      advice: "כיוון תנועה: לבחור רגע שבו את/ה בוחר/ת בטובת המערכת באופן מפורש."
    };
  }

  // 🦊 שועל/ה מתאזן/ת (Med A, High P)
  if (isMedA && isHighP) {
    return {
      title: "שועל/ה מתאזן/ת",
      icon: <Zap className="w-16 h-16 text-amber-600" />,
      themeColor: "text-amber-900",
      bgGradient: "from-amber-50 to-amber-100",
      description: "את/ה בצומת משמעותי",
      subDescription: "יש לך יכולת השפעה גבוהה ואת/ה מתחיל/ה לחזק את הלימה למטרות הרחבות. זה רגע של בחירה מודעת. כששני הצירים יתלכדו — העוצמה שלך תגדל מאוד.",
      advice: "כיוון תנועה: לחפש החלטה אחת שבה את/ה בוחר/ת במפורש בטובת המערכת."
    };
  }

  // 🐴 פרד/ה
  return {
    title: "פרד/ה",
    icon: <HelpCircle className="w-16 h-16 text-gray-500" />,
    themeColor: "text-gray-900",
    bgGradient: "from-gray-100 to-gray-200",
    description: "את/ה כרגע בשוליים של השותפות",
    subDescription: "רמת המעורבות או ההלימה שלך אינן גבוהות בשלב זה. ייתכן שאת/ה בעומס, בתסכול או במרחק רגשי מהארגון. זה לא בהכרח מצב קבוע — אבל הוא ראוי להתבוננות.",
    advice: "כיוון תנועה: לשאול את עצמך מה יחזיר אותך למרחב של חיבור והשפעה."
  };
};

export default function LeadershipQuiz() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const allQuestions = [...PART_1_QUESTIONS, ...PART_2_QUESTIONS];

  const handleStart = () => {
    setStep('quiz');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleAnswer = (score: number) => {
    setAnswers(prev => ({ ...prev, [allQuestions[currentQuestionIndex].id]: score }));
    setTimeout(() => {
      if (currentQuestionIndex < allQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setStep('results');
      }
    }, 200);
  };

  const calculateScores = () => {
    let alignmentScore = 0;
    let presenceScore = 0;
    PART_1_QUESTIONS.forEach(q => alignmentScore += (answers[q.id] || 0));
    PART_2_QUESTIONS.forEach(q => presenceScore += (answers[q.id] || 0));
    return { alignmentScore, presenceScore };
  };

  const renderIntro = () => (
    <div className="flex flex-col items-center text-center p-6 animate-fadeIn min-h-screen justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-2xl border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
          🧭 איזה שותף/ה אני בהנהגה הארגונית?
        </h1>
        
        <div className="text-right space-y-6 text-gray-700 text-lg leading-relaxed mb-10">
          <p className="font-bold border-r-4 border-blue-600 pr-4">שותפות בהנהגה איננה רק תפקיד – היא עמדה פנימית.</p>
          <p>היא נוגעת במידת החיבור שלנו לחזון המשותף, ובמידת הנוכחות שלנו במרחב שבו מתקבלות החלטות.</p>
          <p>השאלון שלפניכם הוא הזמנה להתבוננות כנה על המקום שבו אתם עומדים היום בתוך מרחב השותפות הארגונית.</p>
          
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 text-sm">
            <p className="font-bold text-gray-900 mb-1 tracking-wide">הנחיה:</p>
            <p>דרגו כל היגד מ־1 עד 5 בהתאם לאופן שבו אתם מתנהלים בפועל – לא כפי שהייתם רוצים להיות, אלא כפי שאתם כיום.</p>
          </div>
        </div>

        <button 
          onClick={handleStart}
          className="w-full sm:w-auto px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 mx-auto shadow-lg"
        >
          התחילו את המיפוי העצמי
          <ChevronLeft className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => {
    const question = allQuestions[currentQuestionIndex];
    const isPart1 = currentQuestionIndex < 5;
    const progress = ((currentQuestionIndex) / allQuestions.length) * 100;

    return (
      <div className="w-full max-w-2xl mx-auto p-4 flex flex-col justify-center min-h-screen">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-50 transition-all">
          
          <div className="w-full bg-gray-100 rounded-full h-2 mb-12">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="text-center mb-8">
            <span className={`inline-block px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase mb-3 ${isPart1 ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'}`}>
              {isPart1 ? 'חלק א׳ – הלימה מערכתית' : 'חלק ב׳ – נוכחות והשפעה'}
            </span>
          </div>

          <div className="flex flex-col items-center space-y-12 animate-slideUp">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center leading-tight min-h-[100px] flex items-center justify-center">
              {question.text}
            </h3>

            <div className="grid grid-cols-5 gap-3 md:gap-4 w-full max-w-md">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleAnswer(num)}
                  className={`
                    aspect-square rounded-xl flex items-center justify-center text-xl font-bold transition-all duration-150 border-2
                    ${answers[question.id] === num 
                      ? 'border-blue-600 bg-blue-600 text-white shadow-md transform scale-105' 
                      : 'border-gray-100 text-gray-400 hover:border-blue-300 hover:text-blue-600 bg-gray-50/30'}
                  `}
                >
                  {num}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between w-full max-w-md text-xs font-bold text-gray-400 px-1 uppercase tracking-tighter">
              <span>לא נכון בכלל</span>
              <span>נכון מאוד</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const { alignmentScore, presenceScore } = calculateScores();
    const result = getResultData(alignmentScore, presenceScore);

    return (
      <div className="w-full max-w-4xl mx-auto p-4 animate-fadeIn py-12">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
           
           <div className={`p-10 md:p-16 bg-gradient-to-br ${result.bgGradient} flex flex-col items-center text-center border-b border-gray-100`}>
             <div className="bg-white p-6 rounded-full shadow-sm mb-6 border border-white/50">
                {result.icon}
             </div>
             <h2 className={`text-4xl md:text-5xl font-extrabold ${result.themeColor} mb-4`}>{result.title}</h2>
             <p className="text-xl md:text-2xl font-bold text-gray-700 opacity-90">{result.description}</p>
           </div>
           
           <div className="p-8 md:p-14 bg-white space-y-10">
             <div className="grid md:grid-cols-2 gap-10">
               
               <div className="space-y-6">
                 <div className="bg-gray-50 rounded-2xl p-6 border-r-4 border-blue-600">
                   <h4 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
                     <Info className="w-5 h-5 text-blue-600" />
                     אבחון המקום שלך
                   </h4>
                   <p className="text-gray-700 leading-relaxed font-medium">{result.subDescription}</p>
                 </div>
                 
                 <div className="bg-emerald-50 rounded-2xl p-6 border-r-4 border-emerald-600">
                   <h4 className="font-bold text-emerald-900 text-lg mb-3 flex items-center gap-2">
                     <CheckCircle className="w-5 h-5 text-emerald-600" />
                     כיוון תנועה מומלץ
                   </h4>
                   <p className="text-emerald-800 font-bold leading-relaxed">{result.advice}</p>
                 </div>
               </div>

               <div className="flex flex-col justify-center space-y-6">
                  <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">הלימה מערכתית</span>
                      <span className="text-2xl font-bold text-blue-600">{alignmentScore}<span className="text-sm text-gray-300">/25</span></span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${alignmentScore >= 20 ? 'bg-emerald-500' : alignmentScore >= 15 ? 'bg-amber-500' : 'bg-rose-500'}`}
                        style={{ width: `${(alignmentScore / 25) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">נוכחות והשפעה</span>
                      <span className="text-2xl font-bold text-purple-600">{presenceScore}<span className="text-sm text-gray-300">/25</span></span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${presenceScore >= 20 ? 'bg-emerald-500' : presenceScore >= 15 ? 'bg-amber-500' : 'bg-rose-500'}`}
                        style={{ width: `${(presenceScore / 25) * 100}%` }}
                      ></div>
                    </div>
                  </div>
               </div>
             </div>

             <div className="pt-8 border-t border-gray-50 text-center">
                <button 
                  onClick={() => setStep('intro')}
                  className="px-10 py-3.5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-all flex items-center gap-2 mx-auto shadow-md"
                >
                  <RefreshCcw className="w-4 h-4 ml-1" />
                  התחילו מיפוי חדש
                </button>
             </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans text-gray-900" dir="rtl">
      <main className="max-w-5xl mx-auto px-4">
        {step === 'intro' && renderIntro()}
        {step === 'quiz' && renderQuiz()}
        {step === 'results' && renderResults()}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700;800&display=swap');
        body { 
          font-family: 'Assistant', sans-serif;
          background-color: #fcfcfd;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}
