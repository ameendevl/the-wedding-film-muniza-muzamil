import { CoupleUniverseData } from '../types/universe';

export const INITIAL_UNIVERSE_DATA: CoupleUniverseData = {
  brideName: 'Muniza',
  groomName: 'Muzamil',
  weddingDate: '2026-12-17',

  // 1. Two Hearts — Two Stories ("The Same Day. Two Different Hearts.")
  twoHearts: {
    her: {
      authorName: 'Muniza',
      authorRole: 'bride',
      feeling: 'Like the whole world had quietly paused. My hands were shaking a little while tucking my hair behind my ear, but the moment I saw him smile, my entire heart felt still and grounded.',
      remember: 'The exact scent of wet rain on the courtyard tiles, the sound of tea cups clinking in the corner, and the way he looked at me like he was listening to the unsaid words.',
      thinking: '“Is this really happening? Can someone feel this familiar on the very first day?” I was wondering if he could tell how fast my heart was beating.',
      smile: 'The way he laughed at his own clumsy joke about spilled cardamom tea, trying so hard to be polite and composed.',
      nervous: 'I was terrified that the silence between sentences would be awkward. But with him, even the quiet was warm and comforting.',
      neverForget: 'The exact second he handed me the book, our fingers brushed for half a second, and he said, “I think this chapter was meant for you.”',
    },
    his: {
      authorName: 'Muzamil',
      authorRole: 'groom',
      feeling: 'A breathless awe. I had prepared five different conversations in my head that morning, but when she walked through the arched doorway in that olive kurta, all my words dissolved.',
      remember: 'The soft golden afternoon light coming through the high stained glass windows, reflecting in her eyes. I remember thinking I never wanted the sun to set.',
      thinking: '“Don’t say something silly. Just breathe.” I was praying that this meeting wouldn’t end, that she wouldn’t look at her watch.',
      smile: 'The gentle crinkle by her eyes when she finally laughed. It was the most effortless, beautiful sound in that entire crowded hall.',
      nervous: 'I accidentally dropped my pen twice and almost knocked over the chai saucer. I was praying she thought it was endearing rather than clumsy.',
      neverForget: 'Walking back to my car that evening, calling my closest friend, and saying only one sentence: “Bro, I just met the girl I am going to marry.”',
    },
    unitedVow: {
      title: 'ONE STORY',
      text: 'We entered that rainy afternoon as two separate strangers carrying our own quiet hopes. By sunset, our lives had woven into a single unwritten tapestry. Every doubt became certainty. Every path led directly here. Two hearts that beat to the exact same melody.',
      date: 'Lahore • The Beginning',
    },
  },

  // 2. Why I Chose You
  whyIChoseYou: {
    herReasons: [
      {
        id: 'hr-1',
        text: 'Because you make the most ordinary, mundane days feel like sacred cinema.',
        authorRole: 'bride',
        createdAt: 'October 2025',
      },
      {
        id: 'hr-2',
        text: 'Because in a room full of noise, your voice is the only anchor my anxiety needs to calm down.',
        authorRole: 'bride',
        createdAt: 'December 2025',
      },
      {
        id: 'hr-3',
        text: 'Because you remember the little things I never thought anyone noticed—like how I like my tea lukewarm and my books folded at the corner.',
        authorRole: 'bride',
        createdAt: 'January 2026',
      },
      {
        id: 'hr-4',
        text: 'Because you protect my peace even when I am too stubborn to ask for help.',
        authorRole: 'bride',
        createdAt: 'March 2026',
      },
      {
        id: 'hr-5',
        text: 'Because whenever you look at me, you remind me of the gentlest version of myself.',
        authorRole: 'bride',
        createdAt: 'May 2026',
      },
      {
        id: 'hr-6',
        text: 'Because loving you has been the easiest, most natural decision of my entire existence.',
        authorRole: 'bride',
        createdAt: 'August 2026',
      },
    ],
    hisReasons: [
      {
        id: 'mr-1',
        text: 'Because your kindness is not a performance—it is the quiet warmth you give to everyone around you.',
        authorRole: 'groom',
        createdAt: 'October 2025',
      },
      {
        id: 'mr-2',
        text: 'Because you are my safest place in this chaotic world. When I am with you, I am home.',
        authorRole: 'groom',
        createdAt: 'November 2025',
      },
      {
        id: 'mr-3',
        text: 'Because you believe in my dreams even on days when I struggle to believe in myself.',
        authorRole: 'groom',
        createdAt: 'February 2026',
      },
      {
        id: 'mr-4',
        text: 'Because the sound of your laughter can undo twelve hours of exhaustion in a single heartbeat.',
        authorRole: 'groom',
        createdAt: 'April 2026',
      },
      {
        id: 'mr-5',
        text: 'Because you bring light into rooms you don’t even realize you’re illuminating.',
        authorRole: 'groom',
        createdAt: 'June 2026',
      },
      {
        id: 'mr-6',
        text: 'Because out of every soul on this earth, yours was the only one that matched mine.',
        authorRole: 'groom',
        createdAt: 'September 2026',
      },
    ],
    finalVow: 'AND I WOULD CHOOSE YOU AGAIN. IN EVERY LIFETIME. IN EVERY UNIVERSE.',
  },

  // 3. Secret Letters ("A Letter For You")
  secretLetters: [
    {
      id: 'sl-1',
      title: 'For Muniza on the Morning of Our Wedding',
      senderRole: 'groom',
      recipientRole: 'bride',
      content: `My dearest Muniza,

As you sit in front of the mirror right now with jasmine in your hair and family bustling around you, I hope you take one slow, deep breath. 

I wrote this for you so that before the noise of the day starts, you know this: Today is not about the decor, the lights, or the cameras. Today is just about you and me, standing before God and our parents, promising to love each other through every season of life.

You are the answer to every quiet prayer I ever whispered late at night. I cannot wait to look into your eyes today and call you my wife. 

Yours forever,
Muzamil`,
      unlockCondition: 'wedding_day',
      unlockDate: '2026-12-18',
      paperTone: 'ivory',
      isSealed: true,
      createdAt: '2026-09-01',
    },
    {
      id: 'sl-2',
      title: 'For Muzamil Before We Say Our Vows',
      senderRole: 'bride',
      recipientRole: 'groom',
      content: `Muzamil,

If you are reading this, it means the hour is close. 

I want you to know that my heart is completely at peace. Thank you for being the man who held my trust with such delicate care. Thank you for making me laugh when I was stressed about fittings and cards.

From today on, your triumphs are my triumphs, your grief is my grief, and your happiness is my life’s sweetest purpose. 

Go adjust your sherwani, take a breath, and smile. I am walking toward you.

With all my love,
Muniza`,
      unlockCondition: 'wedding_day',
      unlockDate: '2026-12-18',
      paperTone: 'parchment',
      isSealed: true,
      createdAt: '2026-09-02',
    },
    {
      id: 'sl-3',
      title: 'For Our Very First Anniversary (Year 1)',
      senderRole: 'groom',
      recipientRole: 'bride',
      content: `Happy 1st Anniversary, my love!

Look at us. 365 days of sharing our mornings, learning each other’s little habits, cooking midnight dinners, and building the home we dreamed about. 

If this first year was a glimpse of what the rest of our lives will look like, then I am the most blessed man to walk this earth. 

I love you more today than on the day we signed the paper.`,
      unlockCondition: 'first_anniversary',
      unlockDate: '2027-12-18',
      paperTone: 'rose',
      isSealed: true,
      createdAt: '2026-09-03',
    },
  ],

  // 4. Open When...
  openWhenEnvelopes: [
    {
      id: 'ow-1',
      title: 'OPEN WHEN YOU MISS ME',
      subtitle: 'For when the miles or hours feel a little too long',
      category: 'miss_me',
      recipientRole: 'both',
      message: 'Put your hand over your heart right now. That steady rhythm? I am right there with you. No matter how many kilometers or busy work hours sit between us, not a single hour passes where my mind doesn’t gently wander back to you. Call me as soon as you read this.',
      imageUrl: './images/hero.jpg',
      isLocked: false,
      waxSealColor: '#a43b44',
    },
    {
      id: 'ow-2',
      title: 'OPEN WHEN YOU NEED A SMILE',
      subtitle: 'A reminder of our silly, unfiltered joy',
      category: 'need_smile',
      recipientRole: 'both',
      message: 'Remember the time we tried to bake brownies at 1:00 AM, forgot the baking powder, and ended up eating chocolate batter with soup spoons off the counter while crying from laughter? Life is too short to be taken so seriously. You are loved, you are hilarious, and I adore your goofy grin.',
      imageUrl: './images/details.jpg',
      isLocked: false,
      waxSealColor: '#c9a96e',
    },
    {
      id: 'ow-3',
      title: 'OPEN WHEN TODAY WAS HARD',
      subtitle: 'When the world feels heavy on your shoulders',
      category: 'hard_day',
      recipientRole: 'both',
      message: 'Leave your shoes by the door. Put your phone on silent. You don’t have to explain anything to anyone right now. Tonight, I will make the chai, fluff your pillows, and sit with you. You carried so much today; let me carry the rest of the evening for you.',
      isLocked: false,
      waxSealColor: '#536b60',
    },
    {
      id: 'ow-4',
      title: 'OPEN WHEN YOU WANT TO REMEMBER US',
      subtitle: 'The feeling of where it all started',
      category: 'remember_us',
      recipientRole: 'both',
      message: 'Close your eyes. Remember our very first drive along the canal road with the windows down, cool Lahore breeze blowing, playing that Coke Studio track on repeat? We didn’t know how the future would unfold, but we knew we never wanted that car ride to end. That feeling is still alive right now.',
      imageUrl: './images/proposal.jpg',
      isLocked: false,
      waxSealColor: '#96343c',
    },
    {
      id: 'ow-5',
      title: 'OPEN WHEN WE HAVE OUR FIRST BIG FIGHT',
      subtitle: 'Read this before you say another word',
      category: 'big_fight',
      recipientRole: 'both',
      message: 'Stop. Breathe. Look across the room at the person you are angry with. That person is not your enemy—they are your teammate. Whatever we are arguing about right now is temporary, but our sacred vows are forever. I am sorry for my pride, my tone, and my defensiveness. I love you more than this argument. Come here and let’s hug it out.',
      isLocked: false,
      waxSealColor: '#4a3b32',
    },
    {
      id: 'ow-6',
      title: 'OPEN WHEN IT’S OUR ANNIVERSARY',
      subtitle: 'Celebrating another milestone of our covenant',
      category: 'anniversary',
      recipientRole: 'both',
      message: 'Happy Anniversary to the only person I would ever want to share a bathroom sink, a Netflix account, and an entire lifetime with. We made another year of memories, solved another year of challenges, and loved each other through it all. Here is to 50 more.',
      isLocked: true,
      unlockDate: '2027-12-18',
      waxSealColor: '#c29236',
    },
    {
      id: 'ow-7',
      title: 'OPEN WHEN WE’RE OLD',
      subtitle: 'When our hair is silver and our steps are slow',
      category: 'when_old',
      recipientRole: 'both',
      message: 'Look at us now. Decades have passed since that December night when we wore our bridal finery and danced under crystal chandeliers. The wrinkles around your eyes are just lines where fifty years of laughter settled. You are still the prettiest soul I have ever laid eyes on.',
      isLocked: true,
      unlockDate: '2046-12-18',
      waxSealColor: '#2b231d',
    },
  ],

  // 5. Future Us Time Capsule
  futureUs: {
    title: 'A MESSAGE FOR OUR FUTURE SELVES',
    subtitle: 'Written on our wedding threshold • Sealed for the decades ahead',
    promises: [
      {
        id: 'fu-1',
        question: 'Where do you think we will be in 5 years?',
        herAnswer: 'In a home full of warm sunlight, potted herbs in the kitchen balcony, books piled high, probably laughing over a burnt dinner while chasing our little one around.',
        hisAnswer: 'Established in our careers, traveling to Istanbul or Kyoto like we promised, and still stealing glances at her across breakfast tables like newlyweds.',
        unlockMilestone: '5_years',
        unlockDate: '2031-12-18',
      },
      {
        id: 'fu-2',
        question: 'What do you hope never changes between us?',
        herAnswer: 'The way he listens to me with his full attention, and how we laugh at things nobody else finds funny.',
        hisAnswer: 'Her gentle warmth, our late-night chai rituals, and the effortless peace that enters the room whenever she walks in.',
        unlockMilestone: '1_year',
        unlockDate: '2027-12-18',
      },
      {
        id: 'fu-3',
        question: 'What is one promise you want to keep forever?',
        herAnswer: 'To always be his safe refuge, to never let anger linger past sundown, and to remind him how deeply he is valued.',
        hisAnswer: 'To protect her honor, her dignity, and her joy above my own comfort, and to hold her hand every single day.',
        unlockMilestone: '10_years',
        unlockDate: '2036-12-18',
      },
      {
        id: 'fu-4',
        question: 'What do you want to tell your future self?',
        herAnswer: 'Remember how excited, grateful, and deeply loved you felt on this day. Don’t take a single ordinary Tuesday for granted.',
        hisAnswer: 'Look at the woman standing beside you. Never forget the effort it took to earn her heart. Cherish her every day.',
        unlockMilestone: '5_years',
        unlockDate: '2031-12-18',
      },
      {
        id: 'fu-5',
        question: 'What do you hope our home feels like?',
        herAnswer: 'Like a sanctuary. Fresh flowers on Fridays, the scent of cardamom and oud, quiet prayers, and an open door for family.',
        hisAnswer: 'Safe, serene, welcoming, filled with good music, genuine laughter, and zero pretense. A fortress of peace.',
        unlockMilestone: '1_year',
        unlockDate: '2027-12-18',
      },
    ],
  },

  // 6. When We’re Old
  whenWeAreOld: {
    unlockYear: 2046,
    title: 'WHEN WE’RE OLD',
    subtitle: 'Some memories are meant to wait for silver hair and quiet mornings.',
    message: `To Muniza & Muzamil in the year 2046:

If you are reading this, two decades have passed since the night you stood before your families in Lahore and said yes to forever. 

You have navigated houses, children, job changes, wrinkles, hospital visits, celebrations, and quiet rainy afternoons. 

Take a moment right now. Look at each other’s hands—the ones that have held each other through 7,300 days of life. Smile, because the young boy and girl from 2026 are looking at you with immense pride.

We kept our promise. We built a beautiful life.`,
    photos: ['./images/hero.jpg', './images/walima.jpg'],
    vowToOldAge: '“I will love you when your hair turns white, when your steps grow slow, and when our memories become our greatest treasure.”',
  },

  // 7. Our Firsts
  ourFirsts: [
    {
      id: 'f-1',
      title: 'OUR FIRST MEETING',
      subtitle: 'The Library Courtyard, Lahore',
      date: '14 October 2019',
      location: 'Old Anarkali, Lahore',
      story: 'A rainy afternoon at the architectural archives. We both reached for the same vintage volume on Mughal archways. One clumsy conversation, cardamom chai, and four hours passed like four minutes.',
      photoUrl: './images/details.jpg',
      voiceDurationSec: 28,
    },
    {
      id: 'f-2',
      title: 'OUR FIRST MESSAGE',
      subtitle: '“Did you find that chapter on geometry?”',
      date: '14 October 2019 • 9:42 PM',
      location: 'WhatsApp',
      story: 'A casual excuse to continue the conversation. That message turned into a 3:00 AM text chain that hasn’t stopped in seven years.',
    },
    {
      id: 'f-3',
      title: 'OUR FIRST CALL',
      subtitle: 'Five minutes turned into three hours',
      date: '28 October 2019',
      location: 'Voice Call',
      story: 'Neither of us wanted to hang up. We talked about childhood fears, family traditions, favourite poets, and what our dream homes would look like.',
      voiceDurationSec: 42,
    },
    {
      id: 'f-4',
      title: 'OUR FIRST PHOTO',
      subtitle: 'A blurry Polaroid by the canal',
      date: '12 December 2019',
      location: 'Lahore Canal',
      story: 'Both of us looking away from the camera, shy and awkward, yet secretly hoping this picture would last forever.',
      photoUrl: './images/proposal.jpg',
    },
    {
      id: 'f-5',
      title: 'OUR FIRST DATE',
      subtitle: 'Hot chai & parathas at dusk',
      date: '18 January 2020',
      location: 'Mian Mir Colony, Lahore',
      story: 'No fancy restaurants. Just steaming dhabba chai in clay cups, chilly winter air, and the realization that neither of us wanted to be anywhere else in the world.',
    },
    {
      id: 'f-6',
      title: 'OUR FIRST TRIP',
      subtitle: 'The Pines of Bhurban & Murree Hills',
      date: '24 September 2021',
      location: 'Bhurban Hills',
      story: 'Walking through mist-covered pine trails, freezing hands, sharing one umbrella, and watching fog roll over the valley.',
      photoUrl: './images/hero.jpg',
    },
    {
      id: 'f-7',
      title: 'OUR FIRST “I LOVE YOU”',
      subtitle: 'Under a sky of winter stars',
      date: '02 January 2022',
      location: 'Rooftop Terrace',
      story: 'Muzamil said it first, barely above a whisper. Muniza looked down, smiled with tears in her eyes, and said, “I loved you three months before you even noticed.”',
    },
    {
      id: 'f-8',
      title: 'OUR FIRST EID TOGETHER',
      subtitle: 'Delivering sheer khurma in the rain',
      date: 'May 2022',
      location: 'Family Home',
      story: 'Exchanging little boxes of sweetmeats, dressed in festive kurtas, stealing a five-minute conversation on the porch while the family gathered.',
    },
    {
      id: 'f-9',
      title: 'OUR FIRST BIG FIGHT',
      subtitle: 'Miscommunication & stubborn pride',
      date: 'November 2023',
      location: 'Over the phone',
      story: 'Twenty-four hours of cold silence that felt like twenty-four days. We met the next evening, both apologized at the exact same second, and learned how to fight for each other rather than against each other.',
    },
    {
      id: 'f-10',
      title: 'OUR FIRST FAMILY BLESSING',
      subtitle: 'When our parents met for the first time',
      date: '15 March 2025',
      location: 'Family Living Room',
      story: 'Nervous energy, endless trays of mithai and samosas, and then hearing both mothers burst into joyous laughter from the dining room.',
    },
    {
      id: 'f-11',
      title: 'OUR PROPOSAL',
      subtitle: 'One question. One eternal answer.',
      date: '20 September 2025',
      location: 'Badshahi Mosque Viewpoint Terrace',
      story: 'Under the amber glow of century-old minarets at dusk, Muzamil knelt down with trembling hands and an heirloom ring.',
      photoUrl: './images/mehndi.jpg',
    },
    {
      id: 'f-12',
      title: 'OUR WEDDING',
      subtitle: 'The beginning of forever',
      date: '18 December 2026',
      location: 'The Royal Palm, Lahore',
      story: 'Two families, five hundred prayers, and two souls stepping across the threshold of destiny.',
      photoUrl: './images/baraat.jpg',
    },
  ],

  // 8. One Photo — Two Memories
  onePhotoTwoMemories: [
    {
      id: 'op-1',
      title: 'The Terrace Proposal at Dusk',
      photoUrl: './images/hero.jpg',
      date: '20 September 2025',
      location: 'Walled City Rooftop, Lahore',
      herMemory: '“I could see how nervous he was from the way he kept adjusting his ring finger and touching his coat pocket. When he got down on one knee, I forgot every single word of the speech he had prepared. I just saw the purest sincerity in his eyes and started crying before he could even finish the question.”',
      hisMemory: '“My knees were shaking so badly I almost dropped the velvet box. I had practiced the proposal for two weeks in front of my bathroom mirror, but the second she turned around in that ivory dupatta, my mind went completely blank. I just knew that if she said yes, my life would be complete.”',
      sharedMoment: 'WE BOTH REMEMBER THIS MOMENT: The city around us faded into absolute silence. It was just two souls making a promise that time can never undo.',
    },
    {
      id: 'op-2',
      title: 'The Dholak Rehearsal Night',
      photoUrl: './images/mehndi.jpg',
      date: '10 December 2026',
      location: 'Courtyard Garden',
      herMemory: '“He looked so ridiculous trying to dance to that Punjabi song with his cousins, but I had never seen him smile with so much pure abandon. I sat with my ammi watching him and whispered, ‘Look at my boy.’”',
      hisMemory: '“I have zero rhythm, but every single beat of that dholak was just an excuse to make her laugh from across the carpet. Catching her eye through the marigold garlands was the highlight of my entire month.”',
      sharedMoment: 'WE BOTH REMEMBER THIS MOMENT: The warmth of family, the smell of fresh henna, and the realization that the big day had finally arrived.',
    },
  ],

  // 9. The Wedding Day — 24 Hours
  weddingDay24Hours: [
    {
      id: 'wd-1',
      time: '07:30',
      title: 'Quiet Awakening',
      description: 'The morning mist clears over Lahore. Both homes wake to quiet prayers, Quran recitation, and the sweet aroma of cardamom chai.',
      authorRole: 'family',
    },
    {
      id: 'wd-2',
      time: '10:00',
      title: 'Bridal Preparation & Hair Ornaments',
      description: 'Muniza begins her bridal transformation. Fresh jasmine garlands, heirloom gold jhumkas, and the soft chatter of cousins.',
      authorRole: 'bride',
      photoUrl: './images/details.jpg',
    },
    {
      id: 'wd-3',
      time: '13:00',
      title: 'Groom Sherwani & Sehra Bandi',
      description: 'Muzamil’s brothers and father tie the ceremonial royal turban. Warm blessings, laughter, and final adjustments.',
      authorRole: 'groom',
    },
    {
      id: 'wd-4',
      time: '17:30',
      title: 'The Grand Baraat Arrival',
      description: 'Dhol players lead the royal procession under fairy lights. Brass lanterns, flower petal shower, and the groom’s entrance.',
      authorRole: 'family',
      photoUrl: './images/baraat.jpg',
    },
    {
      id: 'wd-5',
      time: '19:15',
      title: 'The Sacred Nikah Vows',
      description: 'Three quiet words of acceptance. Tears of joy from both sets of parents. The pen signs the paper, sealing eternity.',
      authorRole: 'bride',
    },
    {
      id: 'wd-6',
      time: '21:00',
      title: 'First Photograph as Husband & Wife',
      description: 'Standing side by side on the grand stage under chandeliers. Hand in hand, looking at each other as one.',
      authorRole: 'groom',
      photoUrl: './images/walima.jpg',
    },
    {
      id: 'wd-7',
      time: '23:30',
      title: 'The Emotional Rukhsati & Farewell',
      description: 'Surrounded by family prayers under the Holy Book. Tears, tight embraces, and stepping into their new shared home.',
      authorRole: 'family',
    },
  ],

  // 10. Family Blessings
  familyBlessings: [
    {
      id: 'fb-1',
      authorName: 'Ammi (Bride’s Mother)',
      relationship: 'Mother of the Bride',
      side: 'her_family',
      message: 'Muniza meri jaan, from the day you took your first step into my arms, you brought light into our house. Muzamil beta, I hand over my most precious diamond into your care. May Allah protect your home from every evil eye and fill your days with barakah.',
      mediaType: 'voice',
      voiceWaveform: [35, 55, 75, 95, 80, 60, 45, 65, 85, 90, 70, 50, 60, 75, 90, 65, 45, 30],
      voiceDuration: 48,
    },
    {
      id: 'fb-2',
      authorName: 'Abba (Groom’s Father)',
      relationship: 'Father of the Groom',
      side: 'his_family',
      message: 'Muzamil has always been our pride, but seeing him beside Muniza brings a joy words cannot describe. Muniza, welcome to our family as our daughter, not a daughter-in-law. May your union be as strong and timeless as granite.',
      mediaType: 'voice',
      voiceWaveform: [20, 40, 65, 85, 75, 55, 60, 80, 95, 80, 60, 70, 85, 65, 50, 35, 25],
      voiceDuration: 52,
    },
    {
      id: 'fb-3',
      authorName: 'Zain & Bilal (Best Friends)',
      relationship: 'Groom’s Best Friends',
      side: 'friends',
      message: 'Muzamil bhai, we remember the days you wouldn’t stop talking about her! You hit the jackpot brother. Muniza bhabhi, take good care of him, and don’t let him spend all his money on vintage watches!',
      mediaType: 'text',
    },
    {
      id: 'fb-4',
      authorName: 'Dadi Jan (Grandmother)',
      relationship: 'Elder Matriarch',
      side: 'special',
      message: 'Mera bacha, meri duaein hamesha tum dono ke sath hain. Hamesha ek doosray ki dhal ban kar rehna. Mohabbat sabr se banti hai, aur tum dono ki jori aasmaan mein bani hai.',
      mediaType: 'voice',
      voiceWaveform: [15, 30, 50, 70, 85, 90, 75, 60, 45, 55, 70, 80, 60, 40, 25],
      voiceDuration: 36,
    },
  ],

  // 11. Memory Surprises ("Do You Remember?")
  memorySurprises: [
    {
      id: 'ms-1',
      imageUrl: './images/hero.jpg',
      title: 'The Stolen Gelato in Istanbul',
      date: 'Summer 2024',
      location: 'Galata Tower Square',
      memory: 'We walked 18,000 steps that day, our feet were blistering, but we refused to take a taxi because we wanted to watch the ferry lights across the Bosphorus. We shared one pistacchio gelato and dropped half of it on the cobblestones.',
      herComment: '“You promised you would buy me another one, and I am still waiting for it!”',
      hisComment: '“Best 40 Liras I ever spent. Your smile was priceless.”',
    },
    {
      id: 'ms-2',
      imageUrl: './images/proposal.jpg',
      title: 'The Surprise Birthday Car Trunk',
      date: 'March 2023',
      location: 'DHA Phase 5, Lahore',
      memory: 'He hid fifty handwritten letters in the trunk of his car with fairy lights and baby’s breath flowers. It took him four hours to set up in the afternoon heat.',
      herComment: '“I kept every single letter in my bedside drawer.”',
      hisComment: '“The scotch tape kept melting, but it was worth every drop of sweat.”',
    },
  ],

  // 12. Secret Surprises
  secretSurprises: [
    {
      id: 'ss-1',
      title: 'A Secret Surprise for My Beautiful Wife ❤️',
      createdByRole: 'groom',
      targetRole: 'bride',
      revealDate: '2026-12-18',
      letter: `Muniza,

If you are seeing this, the lock has opened on our wedding morning! 

I have booked us five days in a private overwater villa in the Maldives for our honeymoon, completely secluded with private candlelit dinners on the sand. You thought we were just doing a short weekend trip—surprise my love!

Pack your breezy summer dresses. Forever begins today.

Your husband,
Muzamil`,
      photos: ['./images/hero.jpg'],
      isLocked: true,
    },
  ],

  // 13. Couple Personalization Answers
  personalization: {
    howWeMet: 'At the historical architectural library archives in Old Anarkali on a rainy Tuesday.',
    firstImpression: 'Muniza thought he was shy and bookish; Muzamil thought she was an ethereal queen far out of his league.',
    whoSaidILoveYouFirst: 'Muzamil whispered it on the rooftop terrace; Muniza confessed she had felt it months before.',
    favoriteMemory: 'Eating warm dhabba parathas and drinking cardamom chai on chilly winter evenings.',
    mostMeaningfulPlace: 'The viewpoint overlooking the golden minarets of Badshahi Mosque.',
    ourSpecialSong: 'Afreen Afreen & Chandni Raat (Ali Sethi)',
    petNames: 'He calls her “Noor-e-Jaan”; She calls him “Miyan”.',
    funniestMemory: 'The late-night 1:00 AM burnt brownie disaster eaten with soup spoons.',
    mostExcitedAbout: 'Waking up on quiet Sunday mornings, making fresh coffee together, and building our sanctuary.',
    sacredPromise: 'To never let the world harden our gentleness toward each other.',
  },
};
