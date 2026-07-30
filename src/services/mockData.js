// Mock legal database for LegalOS

export const mockJudgments = [
  {
    id: "puttaswamy-2017",
    title: "Justice K. S. Puttaswamy (Retd.) and Anr. v. Union of India and Ors.",
    citation: "(2017) 10 SCC 1",
    court: "Supreme Court of India",
    bench: "J.S. Khehar (CJI), J. Chelameswar, S.A. Bobde, D.Y. Chandrachud, A.M. Sapre, R.F. Nariman, S.K. Kaul, J. Nazeer, A.M. Khanwilkar",
    date: "2017-08-24",
    status: "Active / Landmark",
    bookmarksCount: 2450,
    downloadsCount: 18902,
    sharesCount: 5410,
    aiSummary: {
      overview: "The Supreme Court unanimously held that the Right to Privacy is a fundamental right protected under Article 21 (Right to Life and Personal Liberty) and Part III of the Constitution of India. This judgment overruled previous rulings in M.P. Sharma (1954) and Kharak Singh (1962), establishing that privacy is essential to human dignity.",
      keyTakeaways: [
        "Privacy is an intrinsic part of the right to life and liberty under Article 21.",
        "The right to privacy is not absolute but subject to reasonable restrictions.",
        "Any state intrusion into privacy must satisfy a three-fold test: legality, legitimate state aim, and proportionality.",
        "Informational privacy and data protection are vital aspects of privacy."
      ],
      legalQuestions: [
        "Whether the Right to Privacy is a fundamental right under the Constitution of India?",
        "Whether the decisions in M.P. Sharma and Kharak Singh correctly laid down the law?"
      ],
      impact: "Paved the way for the decriminalization of Section 377 (Navtej Johar), striking down of Adhaar Section 57, and drafting of the Digital Personal Data Protection (DPDP) Act."
    },
    fullText: `1. The judgment of this Court is structured into several parts. The central question is whether there is a constitutionally protected right to privacy under the Indian Constitution.
    
2. The core argument of the Union is that privacy is a common law right, not a fundamental right. They rely on M.P. Sharma v. Satish Chandra (a eight-judge bench) and Kharak Singh v. State of U.P. (a six-judge bench).

3. We hold that the right to privacy is an element of human dignity. The privacy of the individual is an essential aspect of the dignity of the person. To degrade the privacy of a human being is to violate their fundamental rights.

4. Privacy is not a right which is carved out of the Constitution, but is a right that is inalienable to human existence. Article 21 protects the right to life and personal liberty, which must be interpreted broadly.

5. Legitimate State interests include national security, preventing crime, and distributing social welfare benefits. However, the means adopted must be proportional to the object sought to be achieved.

6. Informational privacy is a facet of the right to privacy. The state must construct a robust data protection regime to safeguard individual data from misuse by both state and non-state actors.`,
    referencedActs: [
      { id: "const-art-21", name: "Constitution of India, Article 21", section: "Article 21" },
      { id: "const-art-14", name: "Constitution of India, Article 14", section: "Article 14" },
      { id: "const-art-19", name: "Constitution of India, Article 19", section: "Article 19" }
    ],
    relatedCases: [
      { id: "kharak-singh", title: "Kharak Singh v. State of U.P.", citation: "1964 SCR (1) 332", relation: "Overruled" },
      { id: "mp-sharma", title: "M.P. Sharma v. Satish Chandra", citation: "1954 SCR 1077", relation: "Overruled" },
      { id: "maneka-gandhi", title: "Maneka Gandhi v. Union of India", citation: "1978 SCR (2) 621", relation: "Followed" }
    ],
    timeline: [
      { date: "2012-11-30", title: "Petition Filed", description: "Justice K.S. Puttaswamy files writ petition challenging Aadhaar's mandatory requirement." },
      { date: "2015-08-11", title: "Reference to larger Bench", description: "A three-judge bench refers the question of privacy to a larger bench." },
      { date: "2017-07-18", title: "Hearing Commences", description: "A nine-judge constitution bench is formed and begins daily hearings." },
      { date: "2017-08-24", title: "Final Judgment", description: "The 9-judge bench delivers a unanimous verdict upholding privacy as a fundamental right." }
    ]
  },
  {
    id: "kesavananda-1973",
    title: "Kesavananda Bharati Sripadagalvaru v. State of Kerala",
    citation: "(1973) 4 SCC 225",
    court: "Supreme Court of India",
    bench: "S.M. Sikri (CJI), J.M. Shelat, K.S. Hegde, A.N. Grover, B. Jaganmohan Reddy, D.G. Palekar, H.R. Khanna, A.K. Mukherjee, Y.V. Chandrachud, A.N. Ray, D.G. Palekar, M.H. Beg, S.N. Dwivedi",
    date: "1973-04-24",
    status: "Active / Landmark",
    bookmarksCount: 4200,
    downloadsCount: 35400,
    sharesCount: 9280,
    aiSummary: {
      overview: "A historic 13-judge bench of the Supreme Court outlined the Basic Structure Doctrine of the Indian Constitution. While Parliament has wide powers to amend the Constitution under Article 368, it cannot alter, destroy, or damage the basic structure or framework of the Constitution.",
      keyTakeaways: [
        "Parliament's power to amend the Constitution under Article 368 is not unlimited.",
        "The 'Basic Structure' of the Constitution cannot be amended.",
        "Judicial review, federalism, secularism, and democracy are part of this basic structure.",
        "The judgment upheld the validity of the 24th Constitutional Amendment but limited its scope."
      ],
      legalQuestions: [
        "What is the extent of Parliament's power to amend the Constitution under Article 368?",
        "Whether Parliament can amend the Fundamental Rights?"
      ],
      impact: "Prevented India from sliding into an authoritarian state during the Emergency and established judicial review as a cornerstone of Indian democracy."
    },
    fullText: `1. The petition challenges the Kerala Land Reforms Act, 1963. However, the constitutional question goes to the very core of our democratic system: can Parliament amend any part of the Constitution?
    
2. The petitioner contends that Article 368 does not enable Parliament to take away the fundamental freedoms guaranteed under Part III of the Constitution.

3. We hold that the word 'amendment' implies a revision or addition within the framework. It does not mean abrogation or destruction of the basic framework.

4. The basic structure consists of: Supremacy of the Constitution, Republican and Democratic form of Government, Secular character, Separation of powers, and the Federal character of the Constitution.

5. The fundamental rights are not mere code, they represent the natural rights of the citizens. The Constitution cannot be amended so as to destroy its basic structure.`,
    referencedActs: [
      { id: "const-art-368", name: "Constitution of India, Article 368", section: "Article 368" },
      { id: "const-part-iii", name: "Constitution of India, Part III (Fundamental Rights)", section: "Part III" }
    ],
    relatedCases: [
      { id: "golaknath", title: "I.C. Golaknath v. State of Punjab", citation: "1967 SCR (2) 762", relation: "Overruled" },
      { id: "sankari-prasad", title: "Sankari Prasad v. Union of India", citation: "1951 SCR 89", relation: "Distinguished" }
    ],
    timeline: [
      { date: "1970-03-21", title: "Petition Filed", description: "Kesavananda Bharati challenges land reform laws affecting his Mutt's property." },
      { date: "1972-10-31", title: "Hearing Begins", description: "A 13-judge bench, the largest in the Court's history, begins hearings." },
      { date: "1973-04-24", title: "Judgment Pronounced", description: "The Court rules 7-6 in favor of the Basic Structure Doctrine." }
    ]
  }
];

export const mockActs = [
  {
    id: "constitution-of-india",
    title: "Constitution of India, 1950",
    sections: [
      {
        id: "art-14",
        number: "Article 14",
        title: "Equality before law",
        content: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India."
      },
      {
        id: "art-19",
        number: "Article 19",
        title: "Protection of certain rights regarding freedom of speech, etc.",
        content: "All citizens shall have the right— (a) to freedom of speech and expression; (b) to assemble peaceably and without arms; (c) to form associations or unions; (d) to move freely throughout the territory of India; (e) to reside and settle in any part of the territory of India; and (g) to practise any profession, or to carry on any occupation, trade or business."
      },
      {
        id: "art-21",
        number: "Article 21",
        title: "Protection of life and personal liberty",
        content: "No person shall be deprived of his life or personal liberty except according to procedure established by law."
      },
      {
        id: "art-32",
        number: "Article 32",
        title: "Remedies for enforcement of rights conferred by this Part",
        content: "The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed."
      },
      {
        id: "art-368",
        number: "Article 368",
        title: "Power of Parliament to amend the Constitution and procedure therefor",
        content: "Notwithstanding anything in this Constitution, Parliament may in exercise of its constituent power amend by way of addition, variation or repeal any provision of this Constitution in accordance with the procedure laid down in this article."
      }
    ],
    toc: [
      { title: "Preamble", sectionId: "" },
      { title: "Part I - The Union and its Territory", sectionId: "" },
      { title: "Part II - Citizenship", sectionId: "" },
      { title: "Part III - Fundamental Rights", sectionId: "art-14" },
      { title: "Article 14 - Equality Before Law", sectionId: "art-14" },
      { title: "Article 19 - Freedom of Speech", sectionId: "art-19" },
      { title: "Article 21 - Protection of Life & Liberty", sectionId: "art-21" },
      { title: "Article 32 - Constitutional Remedies", sectionId: "art-32" },
      { title: "Part XX - Amendment of Constitution", sectionId: "art-368" },
      { title: "Article 368 - Power to Amend", sectionId: "art-368" }
    ]
  },
  {
    id: "indian-penal-code",
    title: "Indian Penal Code (IPC), 1860",
    sections: [
      {
        id: "sec-300",
        number: "Section 300",
        title: "Murder",
        content: "Except in the cases hereinafter excepted, culpable homicide is murder, if the act by which the death is caused is done with the intention of causing death, or secondly, if it is done with the intention of causing such bodily injury as the offender knows to be likely to cause the death of the person to whom the harm is caused..."
      },
      {
        id: "sec-302",
        number: "Section 302",
        title: "Punishment for murder",
        content: "Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine."
      },
      {
        id: "sec-377",
        number: "Section 377",
        title: "Unnatural offences",
        content: "Whoever voluntarily has carnal intercourse against the order of nature with any man, woman or animal, shall be punished with imprisonment for life, or with imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine. (Declared unconstitutional in part by Navtej Singh Johar v. UOI)."
      }
    ],
    toc: [
      { title: "Chapter I - Introduction", sectionId: "" },
      { title: "Chapter XVI - Offences Affecting the Human Body", sectionId: "sec-300" },
      { title: "Section 300 - Murder", sectionId: "sec-300" },
      { title: "Section 302 - Punishment", sectionId: "sec-302" },
      { title: "Section 377 - Unnatural Offences", sectionId: "sec-377" }
    ]
  }
];

export const mockAiAnswers = {
  "privacy judgement after puttaswamy": {
    query: "Privacy judgement after Puttaswamy",
    answer: "Following the landmark decision in **Justice K.S. Puttaswamy v. Union of India (2017)**, which declared privacy a fundamental right under Article 21, the Supreme Court and high courts have applied the three-fold test (legality, legitimate aim, and proportionality) to multiple cases:\n\n1. **Navtej Singh Johar v. Union of India (2018)**: Decriminalized consensual sexual acts between adults in private, holding Section 377 of the IPC unconstitutional as it violated the right to sexual privacy and dignity.\n2. **Joseph Shine v. Union of India (2018)**: Struck down Section 497 of the IPC (adultery), ruling that it infringed on sexual privacy and individual autonomy.\n3. **Anuradha Bhasin v. Union of India (2020)**: Addressed internet shutdowns in Jammu and Kashmir. The Court held that freedom of speech and carrying out trade online are protected rights, and shut downs must satisfy the test of proportionality outlined in Puttaswamy.",
    confidence: "98%",
    sources: [
      { title: "Justice K.S. Puttaswamy v. Union of India", citation: "(2017) 10 SCC 1", id: "puttaswamy-2017", type: "judgment" },
      { title: "Navtej Singh Johar v. Union of India", citation: "(2018) 10 SCC 1", id: "navtej-2018", type: "judgment" },
      { title: "Constitution of India, Article 21", citation: "Article 21", id: "const-art-21", type: "act" },
      { title: "Indian Penal Code, Section 377", citation: "Section 377", id: "sec-377", type: "act" }
    ]
  },
  "basic structure doctrine": {
    query: "Basic Structure Doctrine",
    answer: "The **Basic Structure Doctrine** is an Indian judicial principle that the Constitution of India has certain basic features that cannot be altered or destroyed through amendments by the Parliament. \n\nEstablished in the landmark case **Kesavananda Bharati v. State of Kerala (1973)** by a narrow 7:6 majority, the court held that while Parliament has wide power to amend the constitution under Article 368, it cannot touch its essential framework. Elements of the basic structure include: Supremacy of the Constitution, separation of powers, judicial review, democratic structure, federalism, and secularism.",
    confidence: "99%",
    sources: [
      { title: "Kesavananda Bharati v. State of Kerala", citation: "(1973) 4 SCC 225", id: "kesavananda-1973", type: "judgment" },
      { title: "Constitution of India, Article 368", citation: "Article 368", id: "const-art-368", type: "act" },
      { title: "I.C. Golaknath v. State of Punjab", citation: "1967 SCR (2) 762", id: "golaknath", type: "judgment" }
    ]
  }
};

export const defaultBookmarks = {
  folders: [
    { id: "folder-1", name: "Landmark Constitutional Cases", color: "#2563EB" },
    { id: "folder-2", name: "Privacy & Data Protection", color: "#16A34A" },
    { id: "folder-3", name: "Criminal Law Research", color: "#F59E0B" }
  ],
  items: [
    { id: "item-1", folderId: "folder-1", type: "judgment", title: "Kesavananda Bharati v. State of Kerala", citation: "(1973) 4 SCC 225", refId: "kesavananda-1973" },
    { id: "item-2", folderId: "folder-2", type: "judgment", title: "Justice K. S. Puttaswamy v. Union of India", citation: "(2017) 10 SCC 1", refId: "puttaswamy-2017" },
    { id: "item-3", folderId: "folder-2", type: "act", title: "Constitution of India, Article 21", citation: "Article 21", refId: "constitution-of-india" }
  ]
};

export const mockDashboardData = {
  recentSearches: [
    { query: "Privacy judgement after Puttaswamy", timestamp: "2 hours ago" },
    { query: "Basic Structure Doctrine", timestamp: "1 day ago" },
    { query: "Section 302 IPC punishment criteria", timestamp: "3 days ago" },
    { query: "Adultery decriminalization judgment", timestamp: "4 days ago" }
  ],
  pinnedJudgments: [
    { id: "puttaswamy-2017", title: "Justice K. S. Puttaswamy v. Union of India", citation: "(2017) 10 SCC 1", court: "Supreme Court of India" },
    { id: "kesavananda-1973", title: "Kesavananda Bharati v. State of Kerala", citation: "(1973) 4 SCC 225", court: "Supreme Court of India" }
  ],
  bookmarkedActs: [
    { id: "constitution-of-india", title: "Constitution of India, 1950", bookmarkedCount: 5, activeArticle: "Article 21" },
    { id: "indian-penal-code", title: "Indian Penal Code (IPC), 1860", bookmarkedCount: 3, activeArticle: "Section 300" }
  ],
  continueReading: [
    { type: "judgment", title: "Justice K. S. Puttaswamy v. Union of India", progress: 65, lastRead: "Yesterday", refId: "puttaswamy-2017" },
    { type: "act", title: "Constitution of India - Article 19", progress: 40, lastRead: "3 days ago", refId: "constitution-of-india" }
  ],
  recentDocuments: [
    { id: "doc-1", name: "High_Court_Appellate_Brief.pdf", size: "4.2 MB", date: "Jul 28, 2026", status: "Analyzed" },
    { id: "doc-2", name: "Client_Affidavit_Draft.docx", size: "840 KB", date: "Jul 25, 2026", status: "Ready" }
  ]
};
