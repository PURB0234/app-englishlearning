import { EprtQuestionBank } from '../types/eprt';

export const DEFAULT_QUESTION_BANK: EprtQuestionBank = {
  listeningShort: [
    {
      id: 'ls-1',
      title: 'Lab Partner Inquiry (Contoh Resmi PDF)',
      dialogue: [
        { speaker: 'Man', text: 'Excuse me, Professor. Could you tell me who my lab partner is? My name is Mike Wheeler.' },
        { speaker: 'Woman', text: 'Of course, Mike. Your lab partner is Parvati Sharma.' },
      ],
      question: 'Why does the man see the woman?',
      options: [
        'To ask about his lab partner.',
        'To change his lab partner.',
        'To leave the lab early.',
        'To submit his lab work.',
      ],
      correctIndex: 0,
      explanation:
        'Pria tersebut bertanya "Could you tell me who my lab partner is?", sehingga tujuannya menemui profesor adalah untuk menanyakan siapa rekan laboratoriumnya (To ask about his lab partner).',
    },
    {
      id: 'ls-2',
      title: 'Library Book Return',
      dialogue: [
        { speaker: 'Woman', text: 'Are you heading to the main library now? I need to return these reference books before five.' },
        { speaker: 'Man', text: 'Actually, I am going to the cafeteria first, but I can drop them off for you right after lunch.' },
      ],
      question: 'What does the man offer to do?',
      options: [
        'Buy lunch for the woman.',
        'Return the books after he eats.',
        'Study together in the main library.',
        'Borrow new reference books.',
      ],
      correctIndex: 1,
      explanation:
        'Pria itu menyatakan akan ke kafetaria dulu, lalu mengembalikan buku-buku tersebut setelah makan siang ("drop them off for you right after lunch").',
    },
    {
      id: 'ls-3',
      title: 'Computer Lab Printer',
      dialogue: [
        { speaker: 'Man', text: 'I cannot seem to print my assignment from this workstation.' },
        { speaker: 'Woman', text: 'Oh, that printer ran out of toner this morning. Try sending your file to the printer near the entrance.' },
      ],
      question: 'What does the woman suggest the man do?',
      options: [
        'Replace the printer toner.',
        'Submit his assignment by email.',
        'Use a different printer near the door.',
        'Restart the computer workstation.',
      ],
      correctIndex: 2,
      explanation:
        'Wanita menyarankan mengirim file ke printer di dekat pintu masuk ("the printer near the entrance") karena printer tersebut kehabisan toner.',
    },
    {
      id: 'ls-4',
      title: 'Seminar Schedule Change',
      dialogue: [
        { speaker: 'Woman', text: 'Did you hear that Dr. Henderson postponed tomorrow morning’s economics seminar?' },
        { speaker: 'Man', text: 'Really? That is a relief! I have not finished preparing my presentation slides yet.' },
      ],
      question: 'How does the man feel about the news?',
      options: [
        'Disappointed because he prepared early.',
        'Relieved because he needs more preparation time.',
        'Confused about the new seminar room.',
        'Angry about the sudden cancellation.',
      ],
      correctIndex: 1,
      explanation:
        'Ungkapan "That is a relief!" menunjukkan pria tersebut merasa lega karena slide presentasinya belum selesai.',
    },
    {
      id: 'ls-5',
      title: 'Campus Shuttle Bus',
      dialogue: [
        { speaker: 'Man', text: 'Do you know how often the campus shuttle stops at the engineering building?' },
        { speaker: 'Woman', text: 'Every twenty minutes during peak hours, though you just missed one two minutes ago.' },
      ],
      question: 'How long will the man probably have to wait for the next shuttle?',
      options: [
        'Two minutes.',
        'About eighteen minutes.',
        'Twenty-two minutes.',
        'Half an hour.',
      ],
      correctIndex: 1,
      explanation:
        'Shuttle datang setiap 20 menit dan bus sebelumnya baru lewat 2 menit lalu, jadi ia harus menunggu sekitar 18 menit lagi.',
    },
    {
      id: 'ls-6',
      title: 'Registration Deadline',
      dialogue: [
        { speaker: 'Woman', text: 'I thought the deadline to add or drop courses was next Friday.' },
        { speaker: 'Man', text: 'That was the old calendar. The registrar moved it up to this Wednesday at four.' },
      ],
      question: 'What does the man imply about course registration?',
      options: [
        'The deadline is earlier than the woman thought.',
        'Students can no longer drop any courses.',
        'The registrar extended the deadline to Friday.',
        'The new academic calendar has not been released.',
      ],
      correctIndex: 0,
      explanation:
        'Frasa "moved it up to this Wednesday" berarti tenggat waktunya dimajukan menjadi lebih awal dari perkiraan wanita tersebut.',
    },
  ],

  listeningLong: [
    {
      id: 'll-1',
      title: 'Academic Thesis Supervision (Contoh Resmi PDF)',
      context: 'Questions 1–3 are based on a dialogue between a student and her professor.',
      dialogue: [
        { speaker: 'Woman', text: 'Excuse me, Professor, are you available for today’s academic supervision?' },
        { speaker: 'Man', text: 'Yes, I am free now. How can I assist you?' },
        { speaker: 'Woman', text: 'Well, I need some guidance for my thesis. I am finding it challenging to finalize my topic.' },
        { speaker: 'Man', text: 'That is a common concern among students. Have you considered consulting with your professors more frequently?' },
        { speaker: 'Woman', text: 'Yes, I have, but I am still unsure about the direction. I feel like I am lacking advanced knowledge in my field.' },
        { speaker: 'Man', text: 'It is normal to feel that way. An advanced understanding takes time. Have you thought about expanding your research to include different perspectives?' },
        { speaker: 'Woman', text: 'I have not considered that. Could you provide me with some examples?' },
        { speaker: 'Man', text: 'Certainly. For instance, you could examine the impact of new teaching methods on student performance. This would require analyzing the curriculum being implemented.' },
        { speaker: 'Woman', text: 'That sounds interesting. But I am concerned about the workload. It seems like it would require a lot of effort.' },
        { speaker: 'Man', text: 'It will indeed require effort, but it will also make you a well-rounded researcher. Remember, the effort you put into your thesis now will benefit you in the future.' },
        { speaker: 'Woman', text: 'I guess you are right. I want to make sure my thesis is of high quality and contributes to my field.' },
        { speaker: 'Man', text: 'That is a commendable goal. It is important to remember that your thesis is an opportunity for you to demonstrate your expertise and make a valuable contribution.' },
        { speaker: 'Woman', text: 'Thank you for your advice. I feel more confident now and I am ready to take on the challenge.' },
      ],
      questions: [
        {
          id: 'll-1-q1',
          question: 'What are the speakers discussing?',
          options: [
            "The student's thesis",
            'Research workload',
            'Teaching methods',
            'Developing expertise',
          ],
          correctIndex: 0,
          explanation:
            'Sejak awal percakapan, mahasiswi meminta bimbingan mengenai tesisnya ("I need some guidance for my thesis").',
        },
        {
          id: 'll-1-q2',
          question: 'What specific challenge is the woman facing?',
          options: [
            'Finalizing her topic',
            'Having insufficient knowledge',
            'Doing a curriculum analysis',
            'Recognizing the benefits of the thesis',
          ],
          correctIndex: 0,
          explanation:
            'Mahasiswi tersebut secara eksplisit menyebutkan kesulitannya: "I am finding it challenging to finalize my topic."',
        },
        {
          id: 'll-1-q3',
          question: "What is the man's advice regarding effort and future benefits?",
          options: [
            'Creating a high-quality thesis to make a valuable contribution',
            'Investing time and expertise to create a topic',
            'Broadening research perspectives to lessen the challenges',
            'Analyzing valuable teaching methods before choosing a topic',
          ],
          correctIndex: 0,
          explanation:
            'Profesor menekankan bahwa usaha keras dalam tesis akan membentuk peneliti yang matang dan menghasilkan kontribusi berharga bagi bidang ilmunya.',
        },
      ],
    },
    {
      id: 'll-2',
      title: 'Campus IT Helpdesk & Student Portal',
      context: 'Questions 4–6 are based on a conversation at the university IT support desk.',
      dialogue: [
        { speaker: 'Man', text: 'Hi, I am locked out of my student portal account after trying to reset my password this morning.' },
        { speaker: 'Woman', text: 'Let me check your student ID. Did you receive the verification code on your university email?' },
        { speaker: 'Man', text: 'That is the problem—my email uses the same login credentials, so I cannot open my inbox either.' },
        { speaker: 'Woman', text: 'Understood. I can verify your identity with your physical student card and issue a temporary token valid for two hours.' },
        { speaker: 'Man', text: 'Great, here is my card. Once I log in, should I enable two-factor authentication?' },
        { speaker: 'Woman', text: 'Definitely. Linking an authenticator app prevents lockouts if you forget your password again.' },
      ],
      questions: [
        {
          id: 'll-2-q1',
          question: 'Why could the man not access the verification code?',
          options: [
            'His university email shares the same locked credentials.',
            'He lost his mobile phone earlier in the morning.',
            'The campus Wi-Fi network was down.',
            'His student ID card had expired.',
          ],
          correctIndex: 0,
          explanation:
            'Pria itu menjelaskan bahwa email kampusnya memakai kredensial login yang sama sehingga ia tidak bisa membuka kotak masuknya.',
        },
        {
          id: 'll-2-q2',
          question: 'How does the woman resolve the immediate lockout?',
          options: [
            'By emailing a link to his personal address.',
            'By verifying his student card and issuing a temporary token.',
            'By resetting the campus mail server.',
            'By creating a brand-new student account.',
          ],
          correctIndex: 1,
          explanation:
            'Petugas IT memverifikasi kartu mahasiswa fisiknya dan memberikan token sementara yang berlaku 2 jam.',
        },
        {
          id: 'll-2-q3',
          question: 'What does the woman recommend doing after logging in?',
          options: [
            'Changing his student ID number.',
            'Setting up two-factor authentication.',
            'Writing his password in a notebook.',
            'Contacting the registrar office.',
          ],
          correctIndex: 1,
          explanation:
            'Ia menyarankan mengaktifkan autentikasi dua faktor ("two-factor authentication") dengan aplikasi autentikator.',
        },
      ],
    },
  ],

  listeningLecture: [
    {
      id: 'lec-1',
      title: 'Basics of Investing (Contoh Resmi PDF)',
      topic: 'Finance & Investment Club Orientation',
      transcript:
        'Welcome to the new members of this investment club. Today we will talk about the basics of investment. Investing is an action you take with your money to make it grow. There are many things you could invest your money in. Some popular options for investing are stocks, bonds, and real estate, all of which help your money grow. When you put your money in these avenues they become your investments. On average, the stock market provides a return of around 11% per year over the long term. If you invested $5000 in the stock market today, then in 20 years, you would have around $40,000. And in 30 years, you would have well over a hundred thousand dollars. All from just the original 5000 dollars. That is the power of investing. You could turn $5000 into well over $100,000. What is more, there is a common misconception that you need a lot of money to start investing. But that could not be farther from the truth. Even if you set aside just one dollar every day for investment, that money could grow into over seventy thousand dollars in thirty years. To conclude, always be careful with companies you invest with, always research the company before investing, and always be a smart investor.',
      questions: [
        {
          id: 'lec-1-q1',
          question: 'What is the definition of investing, as mentioned in the lecture?',
          options: [
            'Growing money through financial actions',
            'Putting money in a savings account',
            'Earning money from a part-time job',
            'Acquiring real estate properties',
          ],
          correctIndex: 0,
          explanation:
            'Pembicara mendefinisikan: "Investing is an action you take with your money to make it grow."',
        },
        {
          id: 'lec-1-q2',
          question: 'According to the lecturer, what are two popular avenues for investing?',
          options: [
            'Stocks and real estate',
            'Real estate and savings',
            'Bonding and stocking',
            'Stocks and education',
          ],
          correctIndex: 0,
          explanation:
            'Tiga instrumen populer yang disebut adalah stocks, bonds, dan real estate.',
        },
        {
          id: 'lec-1-q3',
          question: 'What is the average annual return provided by the stock market over the long term?',
          options: [
            '11% per year',
            '20% per year',
            '30% per year',
            '7% per year',
          ],
          correctIndex: 0,
          explanation:
            'Disebutkan secara eksplisit: "On average, the stock market provides a return of around 11% per year over the long term."',
        },
        {
          id: 'lec-1-q4',
          question: 'If someone invested $5000 in the stock market today, how much money would they have after 30 years?',
          options: [
            'Over $100,000',
            'Around $10,000',
            'Around $40,000',
            'Exactly $5000',
          ],
          correctIndex: 0,
          explanation:
            'Setelah 20 tahun menjadi sekitar $40,000, dan setelah 30 tahun menjadi lebih dari $100,000 ("well over a hundred thousand dollars").',
        },
        {
          id: 'lec-1-q5',
          question: 'What advice does the speaker give regarding investing in companies?',
          options: [
            'Invest only in well-researched enterprises.',
            'Invest a large amount of money initially.',
            'Invest mainly in high-risk companies.',
            'Invest by avoiding researching companies.',
          ],
          correctIndex: 0,
          explanation:
            'Di bagian penutup, pembicara berpesan: "always research the company before investing."',
        },
      ],
    },
    {
      id: 'lec-2',
      title: 'Marine Bioluminescence',
      topic: 'Introduction to Marine Biology',
      transcript:
        'In the deep ocean, sunlight disappears completely below one thousand meters. Yet, roughly seventy-six percent of deep-sea organisms produce their own light through a chemical reaction called bioluminescence. This cold light is generated when a light-emitting molecule known as luciferin reacts with oxygen in the presence of an enzyme called luciferase. Unlike an incandescent bulb, bioluminescence releases almost no heat, making it remarkably energy-efficient. Marine species use this ability for several survival strategies: attracting prey, confusing predators with sudden flashes, or communicating with potential mates in pitch-black waters.',
      questions: [
        {
          id: 'lec-2-q1',
          question: 'What percentage of deep-sea organisms are estimated to produce bioluminescence?',
          options: [
            'Around 76 percent',
            'Less than 10 percent',
            'Exactly 50 percent',
            'Nearly 100 percent',
          ],
          correctIndex: 0,
          explanation:
            'Dosen menyebutkan "roughly seventy-six percent of deep-sea organisms produce their own light."',
        },
        {
          id: 'lec-2-q2',
          question: 'What role does luciferase play in bioluminescence?',
          options: [
            'It acts as an enzyme facilitating the chemical reaction.',
            'It absorbs sunlight from the ocean surface.',
            'It generates heat to warm deep-sea fish.',
            'It blocks oxygen from entering cells.',
          ],
          correctIndex: 0,
          explanation:
            'Luciferase adalah enzim yang memicu reaksi antara molekul luciferin dan oksigen.',
        },
        {
          id: 'lec-2-q3',
          question: 'Why is bioluminescence described as energy-efficient?',
          options: [
            'It produces almost no wasted heat.',
            'It relies entirely on solar energy.',
            'It occurs only once a year.',
            'It requires no oxygen to function.',
          ],
          correctIndex: 0,
          explanation:
            'Disebut sebagai "cold light" karena hampir tidak melepaskan panas ("releases almost no heat").',
        },
      ],
    },
  ],

  structureCompletion: [
    {
      id: 'sc-1',
      sentence: 'The ancient Greeks worshiped _____ gods within a culture that tolerated diversity.',
      options: ['many', 'a little', 'every', 'much'],
      correctIndex: 0,
      explanation:
        'Kata benda "gods" adalah kata benda jamak yang dapat dihitung (plural countable noun), sehingga quantifier yang tepat adalah "many" (bukan a little/much untuk uncountable, maupun every untuk singular).',
    },
    {
      id: 'sc-2',
      sentence: 'Neither the laboratory supervisor nor the research assistants _____ aware of the updated safety protocol.',
      options: ['were', 'was', 'has been', 'is being'],
      correctIndex: 0,
      explanation:
        'Pada struktur korelatif "Neither A nor B", kata kerja menyesuaikan subjek yang paling dekat dengannya ("the research assistants" — jamak), sehingga dibutuhkan "were".',
    },
    {
      id: 'sc-3',
      sentence: 'Had the software engineers detected the memory leak earlier, the server crash _____ avoided.',
      options: ['could have been', 'will be', 'can be', 'had been'],
      correctIndex: 0,
      explanation:
        'Ini adalah bentuk inversi Conditional Type 3 ("Had + S + V3"), sehingga klausa akibat memerlukan modal lampau sempurna pasif: "could have been + V3 (avoided)".',
    },
    {
      id: 'sc-4',
      sentence: 'Solar panels convert sunlight directly into electricity _____ semiconductor materials such as silicon.',
      options: ['by using', 'used by', 'which using', 'they use'],
      correctIndex: 0,
      explanation:
        'Untuk menyatakan cara/metode setelah klausa utama lengkap ("Solar panels convert..."), digunakan preposisi "by" diikuti gerund ("using").',
    },
    {
      id: 'sc-5',
      sentence: 'The university committee recommended that every graduate student _____ an ethics seminar before collecting data.',
      options: ['attend', 'attends', 'attended', 'will attend'],
      correctIndex: 0,
      explanation:
        'Kata kerja "recommend that..." memicu bentuk Subjunctive Mood, yang mewajibkan kata kerja dasar tanpa akhiran -s/-ed ("attend") meskipun subjeknya tunggal.',
    },
    {
      id: 'sc-6',
      sentence: 'Not only _____ high-speed data transmission, but fiber-optic cables are also immune to electromagnetic interference.',
      options: ['do they support', 'they support', 'supporting', 'are supported'],
      correctIndex: 0,
      explanation:
        'Frasa negatif "Not only" di awal kalimat mewajibkan inversi antara auxiliary verb dan subjek ("do they support").',
    },
  ],

  structureError: [
    {
      id: 'er-1',
      template: 'Although {{A}} renovations and additions, the White House {{B}} {{C}} {{D}} simple style.',
      segments: [
        { label: 'A', text: 'numerous' },
        { label: 'B', text: 'has retain' },
        { label: 'C', text: 'edits' },
        { label: 'D', text: 'classically' },
      ],
      correctIndex: 1,
      correction: 'has retained',
      explanation:
        'Setelah auxiliary "has" pada bentuk Present Perfect Tense, kata kerja harus berbentuk Past Participle (V3), yaitu "has retained", bukan "has retain".',
    },
    {
      id: 'er-2',
      template: 'The professor {{A}} that all {{B}} reports {{C}} submitted {{D}} Friday afternoon.',
      segments: [
        { label: 'A', text: 'insisted' },
        { label: 'B', text: 'laboratory' },
        { label: 'C', text: 'are' },
        { label: 'D', text: 'before' },
      ],
      correctIndex: 2,
      correction: 'be',
      explanation:
        'Setelah kata kerja "insisted that...", kalimat menggunakan bentuk Subjunctive pasif ("be submitted"), bukan "are submitted".',
    },
    {
      id: 'er-3',
      template: 'Each of the {{A}} in the robotics competition {{B}} required {{C}} present a {{D}} prototype.',
      segments: [
        { label: 'A', text: 'teams' },
        { label: 'B', text: 'are' },
        { label: 'C', text: 'to' },
        { label: 'D', text: 'working' },
      ],
      correctIndex: 1,
      correction: 'is',
      explanation:
        'Subjek utama kalimat adalah kata ganti tunggal "Each" (bukan "teams"), sehingga kata kerja yang tepat adalah "is".',
    },
    {
      id: 'er-4',
      template: 'Because {{A}} its high thermal conductivity, copper is {{B}} used in {{C}} heat exchangers and electrical {{D}}.',
      segments: [
        { label: 'A', text: 'of' },
        { label: 'B', text: 'wide' },
        { label: 'C', text: 'industrial' },
        { label: 'D', text: 'wiring' },
      ],
      correctIndex: 1,
      correction: 'widely',
      explanation:
        'Untuk menerangkan kata kerja pasif "used", diperlukan kata keterangan (adverb) "widely", bukan kata sifat "wide".',
    },
    {
      id: 'er-5',
      template: 'Modern smartphones are {{A}} powerful {{B}} they can perform tasks {{C}} once required {{D}} desktop computer.',
      segments: [
        { label: 'A', text: 'such' },
        { label: 'B', text: 'that' },
        { label: 'C', text: 'which' },
        { label: 'D', text: 'a' },
      ],
      correctIndex: 0,
      correction: 'so',
      explanation:
        'Sebelum kata sifat tanpa kata benda ("powerful"), pola sebab-akibat yang benar adalah "so + adjective + that", bukan "such".',
    },
  ],

  readingPassages: [
    {
      id: 'rp-1',
      title: 'Glass Fibers and Glass Wool (Contoh Resmi PDF)',
      category: 'Materials Science & Engineering',
      paragraphs: [
        'Glass fibers are extremely strong; for their weight, they are stronger than steel. They are made by forcing molten glass through tiny holes called spinnerets. As many as four hundred spinnerets are placed together, and threads of glass much thinner than human hairs are drawn off at great speed—miles of thread per minute. As they speed along, the threads are coated thinly with a type of glue and twisted into a yarn. The glass fibers are used with plastics to make boats and car bodies. They are also woven into heavy cloth for window draperies and into strong belts for making tires stronger.',
        'A special kind of glass fiber is causing a revolution in communications. A signal of light can be made to travel along the fiber for very long distances. By changing the quality of the light, many messages can be sent at once along one strand of glass. New office buildings are being "wired" with glass fibers as they are built. The glass fibers will be used to connect telephones and computers in ways that not long ago were either impossible or too expensive.',
        'Glass wool traps air in a thick, light blanket of fibers. This blanket is then put into walls and ceilings to keep warm air in during the winter and cool air in during the summer.',
        'To make glass wool, molten glass is fed into a spinning drum with many holes in it. As the glass threads stream out of the holes, they are forced downward by a blast of hot air and through a spray of glues. The threads are then further blown about to mix them up as they fall in a thick mat on a moving belt. The glass we see through and drink out of has many, many other uses besides the ones described here.',
      ],
      questions: [
        {
          id: 'rp-1-q1',
          paragraphRef: 1,
          question: "What was the author's main purpose in writing the article?",
          options: [
            'To inform you how special kinds of glass are made and used',
            'To persuade you to investigate the many uses of glass beyond those mentioned',
            'To inform you about the strength of glass fibers',
            'To inform you that glue is used to hold strands of glass together',
          ],
          correctIndex: 0,
          explanation:
            'Seluruh teks menjelaskan cara pembuatan (melalui spinnerets dan spinning drum) serta berbagai kegunaan serat kaca, serat optik, dan glass wool.',
        },
        {
          id: 'rp-1-q2',
          paragraphRef: 1,
          question: 'How are glass fibers produced according to the first paragraph?',
          options: [
            'By forcing molten glass through tiny holes called spinnerets',
            'By cooling thick sheets of glass in cold water',
            'By twisting steel wires with melted plastic',
            'By blowing cold air onto solid glass rods',
          ],
          correctIndex: 0,
          explanation:
            'Paragraf 1 kalimat ke-2 menyatakan: "They are made by forcing molten glass through tiny holes called spinnerets."',
        },
        {
          id: 'rp-1-q3',
          paragraphRef: 2,
          question: 'Why are special glass fibers revolutionizing communications?',
          options: [
            'They allow multiple light signals to travel long distances on one strand.',
            'They replace the need for computers in office buildings.',
            'They are heavier and cheaper than copper cables.',
            'They generate electricity from sunlight.',
          ],
          correctIndex: 0,
          explanation:
            'Paragraf 2 menjelaskan bahwa sinyal cahaya dapat menempuh jarak sangat jauh dan mengirim banyak pesan sekaligus dalam satu helai kaca.',
        },
        {
          id: 'rp-1-q4',
          paragraphRef: 3,
          question: 'What is the primary function of glass wool in buildings?',
          options: [
            'To insulate walls and ceilings against heat and cold',
            'To reinforce concrete foundations',
            'To decorate windows and office doors',
            'To transmit telephone signals between floors',
          ],
          correctIndex: 0,
          explanation:
            'Paragraf 3 menyebutkan glass wool dipasang di dinding dan plafon untuk menjaga udara hangat di musim dingin dan udara sejuk di musim panas (insulasi termal).',
        },
      ],
    },
    {
      id: 'rp-2',
      title: 'Urban Heat Islands',
      category: 'Environmental Science & Urban Planning',
      paragraphs: [
        'Metropolitan areas frequently experience significantly higher temperatures than their surrounding rural regions, a phenomenon known as the urban heat island (UHI) effect. The primary driver of this temperature disparity is the replacement of natural vegetation with dark, impermeable surfaces such as asphalt roads, concrete sidewalks, and dark roofs. Whereas trees and soil cool the air through evapotranspiration, dense urban materials absorb solar radiation during the day and slowly release stored heat throughout the night.',
        'Elevated urban temperatures carry measurable consequences for both public health and energy consumption. During summer heat waves, higher nighttime minimum temperatures prevent buildings and human bodies from cooling down, increasing the risk of heat exhaustion. Simultaneously, heightened demand for air conditioning places peak loads on municipal power grids and increases greenhouse gas emissions.',
        'To mitigate the urban heat island effect, city planners are adopting passive cooling strategies. Installing reflective "cool roofs," expanding urban tree canopies, and incorporating permeable pavements allow cities to reflect more sunlight and retain moisture, lowering ambient neighborhood temperatures by up to three degrees Celsius.',
      ],
      questions: [
        {
          id: 'rp-2-q1',
          paragraphRef: 1,
          question: 'What is the main cause of the urban heat island effect?',
          options: [
            'Replacing vegetation with heat-absorbing asphalt and concrete',
            'Excessive rainfall in metropolitan neighborhoods',
            'High altitude of modern office buildings',
            'Decreased solar radiation in rural areas',
          ],
          correctIndex: 0,
          explanation:
            'Paragraf 1 menjelaskan penyebab utamanya adalah penggantian vegetasi alami dengan permukaan gelap kedap air seperti aspal dan beton yang menyerap panas.',
        },
        {
          id: 'rp-2-q2',
          paragraphRef: 1,
          question: 'How do trees and soil naturally cool the surrounding environment?',
          options: [
            'Through the process of evapotranspiration',
            'By reflecting all light back into space',
            'By trapping heat underground during winter',
            'By increasing wind speed in city streets',
          ],
          correctIndex: 0,
          explanation:
            'Kalimat terakhir paragraf 1 menyatakan: "trees and soil cool the air through evapotranspiration."',
        },
        {
          id: 'rp-2-q3',
          paragraphRef: 3,
          question: 'Which of the following is mentioned as a strategy to reduce urban heat?',
          options: [
            'Installing reflective roofs and planting more trees',
            'Paving parks with dark asphalt',
            'Turning off municipal power grids at night',
            'Constructing taller glass skyscrapers',
          ],
          correctIndex: 0,
          explanation:
            'Paragraf 3 menyebutkan pemasangan "cool roofs" reflektif, perluasan kanopi pohon kota, dan perkerasan berpori.',
        },
      ],
    },
  ],
};
