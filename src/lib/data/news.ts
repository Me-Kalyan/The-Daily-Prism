// The Daily Prism - News Data with Category Colors

export type Category = 'politics' | 'markets' | 'tech' | 'opinion' | 'breaking' | 'environment' | 'sports' | 'entertainment';

export interface Author {
    name: string;
    nameTe: string;
    avatar: string;
    role: string;
    roleTe: string;
}

export interface NewsArticle {
    id: string;
    slug: string;
    slugTe?: string; // Telugu slug for SEO-friendly Telugu URLs
    category: Category;
    categoryLabel: string;
    categoryLabelTe: string;
    title: string;
    titleTe: string;
    excerpt: string;
    excerptTe: string;
    content?: string; // Full article content
    contentTe?: string;
    image: string;
    videoUrl?: string;
    author: Author;
    publishedAt: string;
    readTime: number;
    isBreaking?: boolean;
    isLive?: boolean;
}

export interface PollOption {
    id: string;
    text: string;
    textTe: string;
    votes: number;
}

export interface Poll {
    id: string;
    question: string;
    questionTe: string;
    options: PollOption[];
    totalVotes: number;
}

export interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    altTe: string;
    caption: string;
    captionTe: string;
}

// Category color mapping
export const categoryColors: Record<Category, string> = {
    politics: '#2563EB',
    markets: '#059669',
    tech: '#7C3AED',
    opinion: '#D97706',
    breaking: '#DC2626',
    environment: '#16A34A',
    sports: '#0891B2',
    entertainment: '#DB2777',
};

export const authors: Author[] = [
    {
        name: 'Priya Sharma',
        nameTe: 'ప్రియా శర్మ',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        role: 'Political Correspondent',
        roleTe: 'రాజకీయ ప్రతినిధి',
    },
    {
        name: 'Rahul Verma',
        nameTe: 'రాహుల్ వర్మ',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        role: 'Tech Editor',
        roleTe: 'టెక్ ఎడిటర్',
    },
    {
        name: 'Ananya Reddy',
        nameTe: 'అనన్య రెడ్డి',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        role: 'Markets Analyst',
        roleTe: 'మార్కెట్స్ విశ్లేషకుడు',
    },
];

export const featuredNews: NewsArticle[] = [
    {
        id: '1',
        slug: 'major-policy-reform-parliament',
        category: 'breaking',
        categoryLabel: 'Breaking',
        categoryLabelTe: 'బ్రేకింగ్',
        title: 'Historic Policy Reform Passes Parliament',
        titleTe: 'చారిత్రాత్మక విధాన సంస్కరణ పార్లమెంట్‌లో ఆమోదం',
        excerpt: 'In a decisive vote that will reshape the nation\'s economic landscape, lawmakers approve sweeping changes.',
        excerptTe: 'దేశ ఆర్థిక వ్యవస్థను పునర్నిర్మించే నిర్ణయాత్మక ఓటింగ్‌లో శాసనసభ్యులు ఆమోదం తెలిపారు.',
        image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=800&fit=crop',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        author: authors[0],
        publishedAt: '2024-12-24T18:30:00Z',
        readTime: 8,
        isBreaking: true,
    },
    {
        id: '2',
        slug: 'ai-revolution-tech-industry',
        category: 'tech',
        categoryLabel: 'Technology',
        categoryLabelTe: 'టెక్నాలజీ',
        title: 'AI Revolution Transforms Every Industry',
        titleTe: 'AI విప్లవం ప్రతి పరిశ్రమను మారుస్తోంది',
        excerpt: 'From healthcare to finance, artificial intelligence is reshaping how businesses operate globally.',
        excerptTe: 'ఆరోగ్య సంరక్షణ నుండి ఆర్థిక రంగం వరకు, కృత్రిమ మేధస్సు వ్యాపారాలను మారుస్తోంది.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
        author: authors[1],
        publishedAt: '2024-12-24T16:00:00Z',
        readTime: 6,
    },
    {
        id: '3',
        slug: 'markets-rally-global-optimism',
        category: 'markets',
        categoryLabel: 'Markets',
        categoryLabelTe: 'మార్కెట్లు',
        title: 'Global Markets Rally on Economic Data',
        titleTe: 'ఆర్థిక డేటాతో గ్లోబల్ మార్కెట్లు పెరుగుదల',
        excerpt: 'Stock markets worldwide experience significant gains as investors respond to encouraging data.',
        excerptTe: 'ప్రోత్సాహకరమైన డేటాకు పెట్టుబడిదారులు స్పందించడంతో స్టాక్ మార్కెట్లు పెరుగుతున్నాయి.',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
        author: authors[2],
        publishedAt: '2024-12-24T14:00:00Z',
        readTime: 5,
    },
    {
        id: '4',
        slug: 'opinion-future-democracy',
        category: 'opinion',
        categoryLabel: 'Opinion',
        categoryLabelTe: 'అభిప్రాయం',
        title: 'The Future of Democracy in Digital Age',
        titleTe: 'డిజిటల్ యుగంలో ప్రజాస్వామ్య భవిష్యత్తు',
        excerpt: 'As technology reshapes politics, we must reconsider how democratic institutions adapt.',
        excerptTe: 'సాంకేతికత రాజకీయాలను మార్చుతున్నప్పుడు, ప్రజాస్వామ్య సంస్థలు ఎలా మారాలో పరిశీలించాలి.',
        image: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&h=600&fit=crop',
        author: authors[0],
        publishedAt: '2024-12-24T12:00:00Z',
        readTime: 7,
    },
    {
        id: '5',
        slug: 'politics-new-legislation',
        category: 'politics',
        categoryLabel: 'Politics',
        categoryLabelTe: 'రాజకీయాలు',
        title: 'New Legislation Aims to Transform Education',
        titleTe: 'కొత్త చట్టం విద్యను మార్చడానికి లక్ష్యం',
        excerpt: 'Parliament debates comprehensive education reform bill with bipartisan support.',
        excerptTe: 'పార్లమెంట్‌లో సమగ్ర విద్యా సంస్కరణ బిల్లుపై చర్చ జరుగుతోంది.',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
        author: authors[0],
        publishedAt: '2024-12-24T10:00:00Z',
        readTime: 6,
    },
];

export const liveUpdates = [
    { id: '1', time: '5 min ago', timeTe: '5 ని. క్రితం', text: 'Parliament session adjourned', textTe: 'పార్లమెంట్ వాయిదా', isNew: true },
    { id: '2', time: '12 min ago', timeTe: '12 ని. క్రితం', text: 'Opposition calls for vote', textTe: 'ప్రతిపక్షం ఓటింగ్ కోరింది', isNew: true },
    { id: '3', time: '25 min ago', timeTe: '25 ని. క్రితం', text: 'PM addresses concerns', textTe: 'PM ఆందోళనలు ప్రస్తావించారు', isNew: false },
    { id: '4', time: '45 min ago', timeTe: '45 ని. క్రితం', text: 'Budget projections revised', textTe: 'బడ్జెట్ అంచనాలు సవరించారు', isNew: false },
];

export const tickerItems = [
    { id: '1', text: 'BREAKING: Parliament passes reform bill', textTe: 'బ్రేకింగ్: సంస్కరణ బిల్లు ఆమోదం' },
    { id: '2', text: 'SENSEX up 500 points', textTe: 'SENSEX 500 పాయింట్లు పెరిగింది' },
    { id: '3', text: 'Heavy rainfall alert', textTe: 'భారీ వర్షం హెచ్చరిక' },
    { id: '4', text: 'Tech stocks rally', textTe: 'టెక్ స్టాక్స్ పెరుగుదల' },
];

export const poll: Poll = {
    id: 'poll-1',
    question: 'Do you support the new policy reform?',
    questionTe: 'మీరు కొత్త విధాన సంస్కరణకు మద్దతు ఇస్తారా?',
    options: [
        { id: 'opt-1', text: 'Strongly Support', textTe: 'బలంగా మద్దతు', votes: 2340 },
        { id: 'opt-2', text: 'Somewhat Support', textTe: 'కొంతవరకు మద్దతు', votes: 1856 },
        { id: 'opt-3', text: 'Neutral', textTe: 'తటస్థం', votes: 892 },
        { id: 'opt-4', text: 'Oppose', textTe: 'వ్యతిరేకం', votes: 1245 },
    ],
    totalVotes: 6333,
};

export const galleryImages: GalleryImage[] = [
    { id: 'img-1', src: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=800&fit=crop', alt: 'Parliament session', altTe: 'పార్లమెంట్ సమావేశం', caption: 'Historic moment as lawmakers gather', captionTe: 'శాసనసభ్యులు సమావేశమైన చారిత్రాత్మక క్షణం' },
    { id: 'img-2', src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=800&fit=crop', alt: 'Protesters', altTe: 'నిరసనకారులు', caption: 'Citizens voice opinions', captionTe: 'పౌరులు అభిప్రాయాలు వ్యక్తం చేస్తున్నారు' },
    { id: 'img-3', src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=600&fit=crop', alt: 'Media', altTe: 'మీడియా', caption: 'Global media coverage', captionTe: 'ప్రపంచ మీడియా కవరేజ్' },
    { id: 'img-4', src: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=600&fit=crop', alt: 'Markets', altTe: 'మార్కెట్లు', caption: 'Market response', captionTe: 'మార్కెట్ స్పందన' },
    { id: 'img-5', src: 'https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=800&h=600&fit=crop', alt: 'Parliament building', altTe: 'పార్లమెంట్ భవనం', caption: 'The iconic building', captionTe: 'ఐకానిక్ భవనం' },
    { id: 'img-6', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=600&fit=crop', alt: 'Discussion', altTe: 'చర్చ', caption: 'Cross-party talks', captionTe: 'క్రాస్-పార్టీ చర్చలు' },
];

export const navCategories = [
    { name: 'Politics', nameTe: 'రాజకీయాలు', href: '/politics', category: 'politics' as Category },
    { name: 'Markets', nameTe: 'మార్కెట్లు', href: '/markets', category: 'markets' as Category },
    { name: 'Technology', nameTe: 'టెక్నాలజీ', href: '/technology', category: 'tech' as Category },
    { name: 'Opinion', nameTe: 'అభిప్రాయం', href: '/opinion', category: 'opinion' as Category },
    { name: 'Sports', nameTe: 'క్రీడలు', href: '/sports', category: 'sports' as Category },
    { name: 'Entertainment', nameTe: 'వినోదం', href: '/entertainment', category: 'entertainment' as Category },
];

// Fact Check Data - Exported for server components
export type VerdictType = 'true' | 'misleading' | 'false';

export interface FactCheck {
    id: string;
    slug: string;
    claim: string;
    claimTe: string;
    source: string;
    sourceTe: string;
    verdict: VerdictType;
    summary: string;
    summaryTe: string;
    image?: string;
}

export const factChecks: FactCheck[] = [
    {
        id: '1',
        slug: 'fact-check-economic-growth',
        claim: '"India\'s economy grew 12% last quarter"',
        claimTe: '"భారతదేశ ఆర్థిక వ్యవస్థ గత త్రైమాసికంలో 12% వృద్ధి చెందింది"',
        source: 'Viral WhatsApp Forward',
        sourceTe: 'వైరల్ వాట్సాప్ ఫార్వర్డ్',
        verdict: 'misleading',
        summary: 'The actual growth was 7.8%. The 12% figure refers to nominal GDP, not real GDP growth.',
        summaryTe: 'వాస్తవ వృద్ధి 7.8%. 12% గణాంకం నామీనల్ GDP ని సూచిస్తుంది, రియల్ GDP వృద్ధిని కాదు.',
    },
    {
        id: '2',
        slug: 'fact-check-new-policy',
        claim: '"Government to provide free laptops to all students"',
        claimTe: '"ప్రభుత్వం విద్యార్థులందరికీ ఉచిత ల్యాప్‌టాప్‌లు అందిస్తుంది"',
        source: 'Social Media Post',
        sourceTe: 'సోషల్ మీడియా పోస్ట్',
        verdict: 'false',
        summary: 'No such policy has been announced. The circulating message is a fabrication.',
        summaryTe: 'అలాంటి పాలసీ ప్రకటించబడలేదు. సర్క్యులేట్ అవుతున్న సందేశం కల్పితం.',
    },
    {
        id: '3',
        slug: 'fact-check-election-results',
        claim: '"Record voter turnout of 68% in state elections"',
        claimTe: '"రాష్ట్ర ఎన్నికల్లో 68% రికార్డు ఓటింగ్"',
        source: 'Election Commission',
        sourceTe: 'ఎన్నికల సంఘం',
        verdict: 'true',
        summary: 'Official EC data confirms 68.3% turnout, the highest in the state\'s history.',
        summaryTe: 'అధికారిక EC డేటా 68.3% ఓటింగ్‌ను ధృవీకరిస్తుంది, ఇది రాష్ట్ర చరిత్రలో అత్యధికం.',
    },
];

