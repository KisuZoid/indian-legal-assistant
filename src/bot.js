import React, { useState } from 'react';
import { Scale, Search, FileText, AlertCircle, BookOpen, Info, ExternalLink, MessageSquare, ChevronRight } from 'lucide-react';

export default function LegalAIAssistant() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [stats, setStats] = useState({ l1: 0, l2: 0, l3: 0, total: 0, cost: 0 });

  const legalKB = {
    'rude behavior': {
      quickAnswer: 'Generally, NO - rude or offensive speech alone is NOT grounds for a lawsuit in most cases. The First Amendment protects free speech, including offensive or rude comments. However, there ARE legal exceptions when speech crosses into harassment, defamation, threats, or discrimination.',
      
      comprehensiveAnswer: `While someone being rude to you is hurtful and unprofessional, U.S. law strongly protects freedom of speech under the First Amendment. This means people have the right to express opinions—even offensive ones—without facing legal consequences in most situations.

However, the law does recognize boundaries. Speech loses its protection when it becomes:

**Defamation (Slander/Libel):** If someone makes FALSE statements about you that damage your reputation, you may have a case. The statement must be presented as fact (not opinion), be provably false, and cause actual harm to your reputation or livelihood.

**Harassment:** Repeated, unwanted contact intended to intimidate, threaten, or cause emotional distress. This goes beyond a single rude comment—it requires a pattern of behavior.

**Threats:** Any statement suggesting physical harm or violence. Even implied threats can be criminal if a reasonable person would feel genuinely threatened.

**Workplace Discrimination:** If the rude behavior targets your protected characteristics (race, gender, religion, age, disability) and creates a hostile work environment, employment discrimination laws may apply.

**Intentional Infliction of Emotional Distress (IIED):** Extreme and outrageous conduct that causes severe emotional trauma. Courts set a very high bar—the behavior must be truly shocking and beyond all bounds of decency.`,

      legalReference: {
        primaryLaw: {
          name: 'First Amendment to U.S. Constitution',
          fullText: 'Congress shall make no law... abridging the freedom of speech, or of the press. This fundamental protection extends to offensive, rude, or unpopular speech, with narrow exceptions for speech that causes direct harm (defamation, true threats, incitement).',
          url: 'https://constitution.congress.gov/constitution/amendment-1/'
        },
        supportingLaws: [
          {
            name: 'Defamation Law (State Common Law)',
            citation: 'Varies by jurisdiction',
            summary: 'Protects individuals from false statements that harm reputation. Requires: (1) False statement of fact, (2) Publication to third party, (3) Fault (negligence or malice), (4) Damages or presumed damages.'
          },
          {
            name: 'Criminal Harassment Statutes (e.g., CA Penal Code §646.9)',
            citation: 'State-specific',
            summary: 'Prohibits willful course of conduct directed at specific person that seriously alarms, annoys, or harasses, and serves no legitimate purpose. Requires repeated behavior, not isolated incidents.'
          },
          {
            name: 'Title VII Civil Rights Act (42 U.S.C. §2000e)',
            citation: '42 U.S.C. §2000e',
            summary: 'Prohibits workplace discrimination and harassment based on protected characteristics. Employer liable if harassment is severe or pervasive enough to create hostile work environment.'
          }
        ],
        caseLaw: [
          {
            name: 'Hustler Magazine v. Falwell (1988)',
            citation: '485 U.S. 46',
            holding: 'Supreme Court held that public figures cannot recover for intentional infliction of emotional distress based on offensive parody unless it contains false statements of fact made with actual malice.',
            keyQuote: 'Outrageousness in the area of political and social discourse has an inherent subjectiveness about it which would allow a jury to impose liability on the basis of jurors\' tastes or views.'
          },
          {
            name: 'Snyder v. Phelps (2011)',
            citation: '562 U.S. 443',
            holding: 'First Amendment protects even deeply offensive speech on matters of public concern. Westboro Baptist Church\'s protests at military funerals, while hurtful, were protected speech.',
            keyQuote: 'Speech is powerful. It can stir people to action, move them to tears of both joy and sorrow, and—as it did here—inflict great pain. We cannot react to that pain by punishing the speaker.'
          }
        ]
      },

      exceptions: [
        {
          title: 'Defamation Exception',
          shortDesc: 'False statements that damage your reputation',
          fullDesc: 'If someone spreads FALSE information about you that harms your reputation, you may sue for defamation. Must prove: statement was false (not opinion), published to others, caused actual harm.',
          legalBasis: 'State Common Law + Restatement (Second) of Torts §558',
          requirements: [
            'Statement must be factual (not opinion)',
            'Statement must be FALSE and provably so',
            'Statement must be communicated to third party',
            'Statement must cause reputational or economic harm',
            'Public figures must prove "actual malice"'
          ],
          example: 'Someone tells your employer FALSE information that you embezzled money, causing you to lose your job. This could be defamation.'
        },
        {
          title: 'Criminal Harassment',
          shortDesc: 'Repeated unwanted contact causing fear',
          fullDesc: 'Pattern of behavior intended to harass, intimidate, or terrorize. Single rude comment typically insufficient—requires multiple incidents over time that would cause reasonable person serious alarm.',
          legalBasis: 'State Harassment/Stalking Statutes (e.g., Model Penal Code §250.4)',
          requirements: [
            'Course of conduct (multiple incidents, not isolated)',
            'Intent to harass or knowing conduct would harass',
            'Causes reasonable person substantial emotional distress',
            'Serves no legitimate purpose'
          ],
          example: 'Someone sends you threatening messages daily for weeks, follows you, appears at your home uninvited. This crosses into criminal harassment.'
        },
        {
          title: 'True Threats',
          shortDesc: 'Statements suggesting physical harm',
          fullDesc: 'Speech loses First Amendment protection when it constitutes a "true threat"—a serious expression of intent to commit unlawful violence against specific person or group.',
          legalBasis: 'Virginia v. Black, 538 U.S. 343 (2003)',
          requirements: [
            'Statement communicates serious expression of intent to harm',
            'Reasonable person would interpret as genuine threat',
            'Not hyperbole, political rhetoric, or jest',
            'Directed at specific individual or identifiable group'
          ],
          example: '"I know where you live and I\'m going to hurt you" could constitute criminal threat, depending on context and credibility.'
        },
        {
          title: 'Workplace Hostile Environment',
          shortDesc: 'Discriminatory conduct in employment',
          fullDesc: 'Employer can be liable if workplace behavior based on protected characteristics (race, gender, religion, etc.) is severe or pervasive enough to create abusive working environment.',
          legalBasis: 'Title VII, 42 U.S.C. §2000e + EEOC Guidelines',
          requirements: [
            'Behavior targets protected characteristic',
            'Severe or pervasive (not isolated incidents)',
            'Objectively and subjectively offensive',
            'Employer knew or should have known',
            'Employer failed to take corrective action'
          ],
          example: 'Supervisor makes repeated gender-based derogatory comments, creating hostile environment. Company does nothing despite complaints. Possible Title VII violation.'
        },
        {
          title: 'Intentional Infliction of Emotional Distress (IIED)',
          shortDesc: 'Extreme and outrageous conduct',
          fullDesc: 'Extremely rare cause of action requiring conduct so outrageous it exceeds all bounds of decency tolerated in civilized society. Courts set very high bar—typical rudeness does NOT qualify.',
          legalBasis: 'Restatement (Second) of Torts §46',
          requirements: [
            'Conduct must be EXTREME and OUTRAGEOUS',
            'Intentional or reckless behavior',
            'Causes severe emotional distress',
            'Distress must be medically documented',
            'Higher threshold than ordinary rudeness'
          ],
          example: 'Rare cases: falsely telling parent their child died, systematic psychological torture campaign. Standard rudeness does NOT meet this threshold.'
        }
      ],

      definitions: [
        { term: 'Defamation', definition: 'False statement presented as fact that injures someone\'s reputation. Divided into slander (spoken) and libel (written). Truth is absolute defense—true statements cannot be defamatory even if harmful.' },
        { term: 'Slander', definition: 'Spoken defamation. Temporary form of defamation that is heard but not recorded in permanent form. Generally requires proof of actual damages except for "slander per se" (accusations of crime, disease, professional incompetence, sexual misconduct).' },
        { term: 'Libel', definition: 'Written or recorded defamation. Published in permanent form (writing, video, social media posts). Courts often presume damages for libel without requiring proof of specific financial harm.' },
        { term: 'Actual Malice', definition: 'Legal standard requiring proof that defendant knew statement was false OR acted with reckless disregard for truth. Required for public figures/officials to win defamation cases. Higher burden than ordinary negligence.' },
        { term: 'Protected Speech', definition: 'Expression protected by First Amendment including opinions, political commentary, satire, hyperbole, and offensive ideas. Government cannot punish speech based on content except in narrow categories (true threats, defamation, incitement).' },
        { term: 'Harassment', definition: 'Conduct intended to disturb, threaten, or upset another person through repeated unwanted contact. Must be pattern of behavior—single rude incident typically insufficient. Can be civil (restraining order) or criminal (charges) depending on severity.' },
        { term: 'Hostile Work Environment', definition: 'Workplace atmosphere so severe or pervasive with discriminatory harassment that it alters conditions of employment. Must be based on protected characteristic (race, sex, religion, etc.). Occasional teasing or isolated incidents generally insufficient.' }
      ],

      suggestedQuestions: [
        'What evidence do I need to prove defamation?',
        'How do I file a harassment restraining order?',
        'Can I sue for emotional distress damages?',
        'What is the difference between slander and libel?',
        'How do I report workplace harassment to HR?',
        'Can I be sued for leaving a negative review?'
      ]
    },

    'eviction notice': {
      quickAnswer: 'NO - Your landlord CANNOT evict you without proper legal notice and court process. Most jurisdictions require 30-60 days written notice for standard evictions, with shorter periods only for specific violations like non-payment or lease breaches.',
      
      comprehensiveAnswer: `Eviction law is heavily regulated to protect tenants from arbitrary displacement. Your landlord cannot simply tell you to leave or change the locks—they must follow strict legal procedures that vary by state and local jurisdiction.

**The Standard Process:** For month-to-month tenancies or lease violations, landlords typically must provide written notice (usually 30 days minimum). The notice must state the specific reason and inform you of your rights. For non-payment of rent, most states allow shorter "pay or quit" notices (3-14 days depending on jurisdiction).

**Court Process Required:** Even with proper notice, if you don't voluntarily leave, the landlord MUST file an eviction lawsuit (unlawful detainer) in court. You have the right to appear, present evidence, and contest the eviction. Only a judge can order eviction—landlords who forcibly remove tenants commit illegal "self-help" eviction and can face serious penalties.

**Illegal Eviction Tactics:** Your landlord CANNOT change locks, shut off utilities, remove your belongings, threaten violence, or make the unit uninhabitable to force you out. These "self-help" evictions are illegal in all states and can result in the landlord owing you significant damages—often 2-3 times your monthly rent plus attorney fees.

**Protected Scenarios:** Eviction is prohibited in certain circumstances: during local eviction moratoriums, in retaliation for reporting code violations or exercising tenant rights, or based on discriminatory reasons (race, family status, disability, etc.).`,

      legalReference: {
        primaryLaw: {
          name: 'State Landlord-Tenant Acts (e.g., Uniform Residential Landlord and Tenant Act)',
          fullText: 'Establishes procedures landlords must follow to terminate tenancy and evict tenants. Requires written notice, specifies grounds for eviction, mandates court process, and prohibits self-help evictions. Notice periods vary: typically 30-60 days for no-cause termination, 3-30 days for lease violations, immediate removal only for extreme circumstances (illegal activity, imminent danger).',
          url: 'https://www.uniformlaws.org/committees/community-home?CommunityKey=78bd2909-60a5-4a22-a871-b4e0430e79e3'
        },
        supportingLaws: [
          {
            name: 'State Unlawful Detainer Statutes',
            citation: 'Varies by state (e.g., CA Code of Civil Procedure §1161)',
            summary: 'Defines legal grounds for eviction and court procedures. Landlord must prove: valid tenancy exists, proper notice given, grounds for eviction established (non-payment, lease violation, end of term), tenant failed to comply.'
          },
          {
            name: 'Federal Fair Housing Act (42 U.S.C. §3604)',
            citation: '42 U.S.C. §3604',
            summary: 'Prohibits discriminatory evictions based on race, color, national origin, religion, sex, familial status, or disability. Landlord cannot evict or refuse to renew lease for discriminatory reasons.'
          },
          {
            name: 'CDC Eviction Moratorium / State Emergency Orders',
            citation: 'Temporary orders during COVID-19 and other emergencies',
            summary: 'During declared emergencies, federal or state governments may temporarily halt evictions. Check current status as these orders change frequently and may have expired or been modified.'
          }
        ],
        caseLaw: [
          {
            name: 'Berg v. Wiley (1978)',
            citation: '264 N.W.2d 145 (Minn. 1978)',
            holding: 'Minnesota Supreme Court held that landlord who forcibly locked tenant out without court process committed illegal self-help eviction. Tenant entitled to damages even though she was actually in breach of lease.',
            keyQuote: 'The landlord may not use self-help to evict a tenant... The policy of the law is to discourage extra-judicial methods of resolving controversies and to encourage resort to orderly legal processes.'
          },
          {
            name: 'Edwards v. Habib (1968)',
            citation: '397 F.2d 687 (D.C. Cir. 1968)',
            holding: 'Retaliatory eviction—evicting tenant for reporting housing code violations—is prohibited and against public policy. Tenant can raise retaliation as defense to eviction even with proper notice.',
            keyQuote: 'To permit retaliatory evictions would clearly frustrate the effectiveness of the housing code as a means of upgrading the quality of housing in the District of Columbia.'
          }
        ]
      },

      exceptions: [
        {
          title: 'Immediate Eviction for Illegal Activity',
          shortDesc: 'Drug manufacturing, weapons offenses',
          fullDesc: 'Most states allow expedited or immediate eviction process when tenant engages in serious illegal activity on premises—particularly drug manufacturing/distribution, weapons violations, or activities threatening safety of others.',
          legalBasis: 'State Criminal Activity Eviction Statutes',
          requirements: [
            'Police report or criminal charges filed',
            'Illegal activity occurred on rental property',
            'Activity poses danger to property or others',
            'Still requires court process (but expedited)',
            'Notice period may be 3 days or immediate'
          ],
          example: 'Police discover tenant operating methamphetamine lab. Landlord can pursue immediate eviction with 3-day notice or less, depending on state law.'
        },
        {
          title: 'Non-Payment Eviction (Shorter Notice)',
          shortDesc: '3-14 day "pay or quit" notice',
          fullDesc: 'When tenant fails to pay rent, most jurisdictions allow shorter notice period (typically 3-14 days depending on state). Notice must give tenant opportunity to pay overdue rent and avoid eviction.',
          legalBasis: 'State Landlord-Tenant Statutes',
          requirements: [
            'Rent payment actually due and unpaid',
            'No legitimate withholding reason (habitability issues)',
            '"Pay or quit" notice specifies exact amount owed',
            'Grace period for payment (3-14 days)',
            'If tenant pays within period, eviction stops'
          ],
          example: 'Tenant misses March rent. Landlord serves 3-day pay or quit notice. If tenant pays within 3 days plus any late fees, eviction process ends.'
        },
        {
          title: 'Imminent Safety Threat',
          shortDesc: 'Violence, arson, severe property damage',
          fullDesc: 'Emergency eviction may be permitted when tenant poses immediate physical danger to others or property. Requires evidence of genuine threat, often police involvement.',
          legalBasis: 'Emergency Eviction Provisions',
          requirements: [
            'Documented imminent threat to safety',
            'Police reports or restraining orders',
            'Emergency court order often required',
            'Threat must be immediate, not speculative',
            'Standard due process still applies'
          ],
          example: 'Tenant threatens violence against neighbors, brandishes weapons. Landlord can seek emergency court order for immediate eviction with police assistance.'
        }
      ],

      definitions: [
        { term: 'Eviction', definition: 'Legal process by which landlord removes tenant from rental property. MUST follow statutory procedures including proper notice and court proceedings. Extrajudicial "self-help" evictions are illegal nationwide.' },
        { term: 'Unlawful Detainer', definition: 'Legal action landlord files to evict tenant after proper notice. Court proceeding where landlord must prove grounds for eviction. Tenant has right to appear and contest. Only after court judgment can sheriff physically remove tenant.' },
        { term: 'Self-Help Eviction', definition: 'ILLEGAL practice where landlord attempts to force tenant out without court process—changing locks, removing belongings, shutting off utilities, threats. Can result in landlord owing tenant substantial damages (often 2-3x monthly rent plus attorney fees).' },
        { term: 'Notice to Quit', definition: 'Written notice landlord must provide before filing eviction lawsuit. Specifies reason for eviction and deadline for tenant to cure violation or vacate. Notice period varies: 30-60 days for no-cause, 3-30 days for violations, varies by jurisdiction.' },
        { term: 'Retaliatory Eviction', definition: 'ILLEGAL eviction attempt motivated by tenant exercising legal rights—reporting code violations, organizing tenant union, requesting repairs. Tenant can raise retaliation as defense even if notice otherwise proper.' },
        { term: 'Just Cause Eviction', definition: 'Required in some jurisdictions with rent control or tenant protection ordinances. Landlord must have legally specified reason to evict (non-payment, lease violation, owner move-in). Cannot evict without cause even with proper notice.' },
        { term: 'Habitability Defense', definition: 'Tenant\'s right to withhold rent or defend against eviction when landlord fails to maintain property in livable condition. Must follow proper notice procedures—notify landlord of defects in writing, allow reasonable time to repair, deposit rent in escrow.' }
      ],

      suggestedQuestions: [
        'What should I do if my landlord changes the locks?',
        'Can I withhold rent for repair issues?',
        'How do I respond to an eviction notice?',
        'What is a retaliatory eviction?',
        'Can my landlord evict me for having a baby?',
        'How long does the eviction court process take?'
      ]
    }
  };

  const [cache, setCache] = useState({});

  const detectScenario = (q) => {
    const scenarioKeywords = ['someone', 'person', 'they', 'he', 'she', 'my', 'can i', 'what if'];
    return scenarioKeywords.some(kw => q.toLowerCase().includes(kw));
  };

  const analyzeQuery = (q) => {
    const normalized = q.toLowerCase();
    
    for (let [key, value] of Object.entries(legalKB)) {
      const keywords = key.split(' ');
      if (keywords.some(kw => normalized.includes(kw))) {
        return { matched: key, data: value, level: 'L1', hasScenario: detectScenario(q), userQuery: q };
      }
    }

    return { matched: null, data: null, level: 'L3', hasScenario: detectScenario(q), userQuery: q };
  };

  const generateScenario = (topic, userQuery, hasUserScenario) => {
    if (hasUserScenario) {
      return {
        title: 'Your Scenario Analysis',
        userQuestion: userQuery,
        analysis: `Based on your question "${userQuery}", let's analyze the legal implications step by step.`,
        advice: 'Given the situation you described, here\'s what the law says and what actions you can consider.'
      };
    }

    const scenarios = {
      'rude behavior': {
        title: 'Example Scenario',
        situation: 'Sarah works as a retail manager. A customer becomes angry about a return policy and starts yelling at her in front of other customers, calling her "incompetent," "stupid," and saying "you don\'t deserve this job." The customer posts similar comments on the store\'s social media page, tagging Sarah by name.',
        question: 'Can Sarah sue the customer for this rude behavior?',
        analysis: 'While the customer\'s behavior is clearly inappropriate and unprofessional, it likely does NOT meet the legal threshold for a lawsuit. Here\'s why: The comments, while hurtful, are expressions of opinion ("incompetent," "stupid") rather than false statements of fact. The First Amendment protects even offensive opinions. The social media post is problematic but would need to contain provably false factual allegations to constitute defamation.',
        outcome: 'Sarah probably cannot successfully sue. However, she has other remedies: (1) Her employer can ban the customer from the store, (2) She can report the social media post as harassment to the platform, (3) If the behavior escalates to threats or repeated stalking behavior, she could seek a restraining order, (4) Her employer may have workplace violence policies providing support.'
      },
      'eviction notice': {
        title: 'Example Scenario',
        situation: 'Marcus has rented an apartment for 2 years with a month-to-month lease. On Friday afternoon, his landlord calls and says "I need you out by next Monday because my daughter is moving back to town and needs the unit." When Marcus says he needs more time, the landlord threatens to change the locks if Marcus isn\'t gone by Monday.',
        question: 'Is this eviction legal? What can Marcus do?',
        analysis: 'This attempted eviction is ILLEGAL on multiple grounds: (1) The landlord must provide written notice—verbal notice is insufficient, (2) Even for month-to-month tenancy, most states require 30-60 days written notice, (3) The 3-day deadline is grossly insufficient, (4) The threat to change locks constitutes illegal self-help eviction, (5) The landlord must follow court procedures; they cannot unilaterally force Marcus out.',
        outcome: 'Marcus should: (1) Document everything (record conversations if legal in your state, save texts/emails), (2) Send written communication stating he knows his rights and will not vacate without proper legal process, (3) If landlord changes locks, call police immediately and potentially sue for illegal eviction (damages often 2-3x monthly rent), (4) Continue paying rent to avoid giving landlord legitimate grounds, (5) Consider consulting a tenant rights attorney or legal aid organization. Marcus can legally stay in the apartment until landlord follows proper legal eviction procedures.'
      }
    };

    return scenarios[topic] || null;
  };

  const handleQuery = () => {
    if (!query.trim()) return;

    setProcessing({ stage: 'Analyzing query...', level: 'L0' });
    
    setTimeout(() => {
      const normalized = query.toLowerCase();
      
      if (cache[normalized]) {
        setProcessing({ stage: 'Found in cache!', level: 'L2' });
        setTimeout(() => {
          setResult({ ...cache[normalized], level: 'L2', cached: true });
          setStats(prev => ({ ...prev, l2: prev.l2 + 1, total: prev.total + 1 }));
          setProcessing(null);
        }, 300);
        return;
      }

      const analysis = analyzeQuery(query);
      setProcessing({ stage: 'Searching legal database...', level: analysis.level });

      setTimeout(() => {
        let response;

        if (analysis.level === 'L1' && analysis.data) {
          setProcessing({ stage: 'Found matching law!', level: 'L1' });
          
          const scenario = generateScenario(analysis.matched, analysis.userQuery, analysis.hasScenario);
          
          response = {
            query,
            quickAnswer: analysis.data.quickAnswer,
            comprehensiveAnswer: analysis.data.comprehensiveAnswer,
            legalReference: analysis.data.legalReference,
            exceptions: analysis.data.exceptions,
            definitions: analysis.data.definitions,
            scenario: scenario,
            suggestedQuestions: analysis.data.suggestedQuestions,
            level: 'L1',
            cost: 0,
            latency: 15,
            confidence: 'High',
            cached: false
          };

          setStats(prev => ({ ...prev, l1: prev.l1 + 1, total: prev.total + 1 }));
        } else {
          response = {
            query,
            comprehensiveAnswer: 'This question requires deeper legal analysis. In a production system with full legal database, this would search thousands of statutes, regulations, and case precedents to provide a comprehensive answer.',
            level: 'L3',
            cost: 0.0001,
            latency: 45,
            confidence: 'Medium',
            cached: false
          };

          setStats(prev => ({ ...prev, l3: prev.l3 + 1, total: prev.total + 1, cost: prev.cost + 0.0001 }));
        }

        setCache(prev => ({ ...prev, [normalized]: response }));
        setResult(response);
        setProcessing(null);
      }, 800);
    }, 500);

    setQuery('');
  };

  const handleSuggestedQuestion = (question) => {
    setQuery(question);
    setTimeout(() => handleQuery(), 100);
  };

  const examples = [
    "Someone talks rude to me, can I charge them a legal case?",
    "Can my landlord evict me without notice?",
    "What happens if someone posts lies about me online?",
    "My boss fired me for complaining about safety issues"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Scale className="text-blue-400" size={36} />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Legal AI Assistant</h1>
          </div>
          <p className="text-blue-300 text-sm md:text-base">Get Clear Legal Guidance with Real Examples</p>
        </div>

        {/* Stats - Compact */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label: 'L1', value: stats.l1, color: 'yellow' },
            { label: 'L2', value: stats.l2, color: 'green' },
            { label: 'L3', value: stats.l3, color: 'purple' },
            { label: 'Total', value: stats.total, color: 'blue' }
          ].map((stat, i) => (
            <div key={i} className="bg-white/10 backdrop-blur rounded-lg p-3 border border-blue-500/30">
              <div className={`text-${stat.color}-400 text-xs font-semibold`}>{stat.label}</div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-blue-500/30 mb-4">
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
              placeholder="Ask your legal question or describe your situation..."
              className="flex-1 bg-white/20 text-white placeholder-blue-300 border border-blue-500/50 rounded px-4 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
            <button
              onClick={handleQuery}
              disabled={processing}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded font-semibold transition text-sm"
            >
              {processing ? 'Searching...' : 'Ask'}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {examples.map((ex, i) => (
              <button
                key={i}
                onClick={() => setQuery(ex)}
                className="bg-blue-500/20 hover:bg-blue-500/40 text-blue-200 px-2 py-1 rounded text-xs transition"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Processing */}
        {processing && (
          <div className="bg-blue-500/20 backdrop-blur rounded-lg p-3 border border-blue-400/50 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <span className="text-white">{processing.stage}</span>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !processing && (
          <div className="space-y-4">
            
            {/* 1. Quick Answer Banner */}
            {result.quickAnswer && (
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 border border-blue-400">
                <div className="flex items-start gap-3">
                  <MessageSquare className="text-white mt-1 flex-shrink-0" size={24} />
                  <div>
                    <div className="text-white font-bold text-lg mb-2">Quick Answer</div>
                    <p className="text-blue-100 leading-relaxed">{result.quickAnswer}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Comprehensive Answer */}
            <div className="bg-white/10 backdrop-blur rounded-lg p-5 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="text-blue-400" size={20} />
                <h3 className="text-xl font-bold text-white">Detailed Explanation</h3>
              </div>
              <div className="text-blue-100 leading-relaxed space-y-3 whitespace-pre-line">
                {result.comprehensiveAnswer}
              </div>
            </div>

            {/* 3. Legal Reference */}
            {result.legalReference && (
              <div className="bg-white/10 backdrop-blur rounded-lg p-5 border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <Scale className="text-yellow-400" size={20} />
                  <h3 className="text-xl font-bold text-white">Legal Reference & Case Law</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Primary Law */}
                  <div className="bg-yellow-500/10 rounded-lg p-4">
                    <div className="text-yellow-300 font-semibold mb-2">Primary Authority:</div>
                    <div className="relative inline-block">
                      <button
                        onMouseEnter={() => setHoveredItem(result.legalReference.primaryLaw.name)}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => window.open(result.legalReference.primaryLaw.url, '_blank')}
                        className="text-blue-300 hover:text-blue-200 underline decoration-dotted flex items-center gap-1 cursor-pointer font-semibold"
                      >
                        {result.legalReference.primaryLaw.name}
                        <ExternalLink size={14} />
                      </button>
                      
                      {hoveredItem === result.legalReference.primaryLaw.name && (
                        <div className="absolute z-50 left-0 top-full mt-2 bg-slate-800 border border-yellow-400 rounded-lg p-4 shadow-xl max-w-lg">
                          <div className="text-blue-200 text-sm leading-relaxed">
                            {result.legalReference.primaryLaw.fullText}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Supporting Laws */}
                  {result.legalReference.supportingLaws && (
                    <div>
                      <div className="text-yellow-300 font-semibold mb-2">Supporting Statutes:</div>
                      <div className="space-y-3">
                        {result.legalReference.supportingLaws.map((law, i) => (
                          <div key={i} className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
                            <div className="text-blue-300 font-semibold text-sm">{law.name}</div>
                            <div className="text-blue-400 text-xs mb-1">{law.citation}</div>
                            <p className="text-blue-200 text-sm leading-relaxed">{law.summary}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Case Law */}
                  {result.legalReference.caseLaw && (
                    <div>
                      <div className="text-yellow-300 font-semibold mb-2">Relevant Case Precedents:</div>
                      <div className="space-y-3">
                        {result.legalReference.caseLaw.map((caseItem, i) => (
                          <div key={i} className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
                            <div className="text-purple-300 font-bold mb-1">{caseItem.name}</div>
                            <div className="text-purple-400 text-xs mb-2">{caseItem.citation}</div>
                            <div className="text-blue-200 text-sm mb-3">{caseItem.holding}</div>
                            <div className="bg-purple-500/20 border-l-4 border-purple-400 rounded p-3">
                              <div className="text-purple-400 text-xs mb-1">Court's Key Statement:</div>
                              <p className="text-blue-100 italic text-sm leading-relaxed">"{caseItem.keyQuote}"</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. Important Exceptions */}
            {result.exceptions && (
              <div className="bg-white/10 backdrop-blur rounded-lg p-5 border border-orange-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="text-orange-400" size={20} />
                  <h3 className="text-xl font-bold text-white">Important Exceptions</h3>
                </div>
                
                <div className="space-y-3">
                  {result.exceptions.map((exception, i) => (
                    <div key={i} className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/30">
                      <div className="relative">
                        <div
                          onMouseEnter={() => setHoveredItem(`exception-${i}`)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className="flex items-center gap-2 mb-2 cursor-help"
                        >
                          <div className="text-orange-300 font-semibold">{exception.title}</div>
                          <Info size={16} className="text-orange-400" />
                        </div>
                        
                        {hoveredItem === `exception-${i}` && (
                          <div className="absolute z-50 left-0 top-full mt-2 bg-slate-800 border border-orange-400 rounded-lg p-4 shadow-xl max-w-md">
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-orange-300 font-semibold">Legal Basis:</span>
                                <p className="text-blue-200 mt-1">{exception.legalBasis}</p>
                              </div>
                              <div>
                                <span className="text-orange-300 font-semibold">Requirements:</span>
                                <ul className="list-disc list-inside text-blue-200 mt-1 space-y-1">
                                  {exception.requirements.map((req, j) => (
                                    <li key={j} className="text-xs">{req}</li>
                                  ))}
                                </ul>
                              </div>
                              {exception.example && (
                                <div>
                                  <span className="text-orange-300 font-semibold">Example:</span>
                                  <p className="text-blue-200 mt-1 text-xs italic">{exception.example}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-blue-200 text-sm leading-relaxed">{exception.shortDesc}</p>
                      <p className="text-blue-300 text-xs mt-2 leading-relaxed">{exception.fullDesc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Legal Definitions */}
            {result.definitions && (
              <div className="bg-white/10 backdrop-blur rounded-lg p-5 border border-purple-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="text-purple-400" size={20} />
                  <h3 className="text-xl font-bold text-white">Legal Definitions</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-3">
                  {result.definitions.map((def, i) => (
                    <div key={i} className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                      <div className="text-purple-300 font-semibold text-sm mb-1">{def.term}</div>
                      <p className="text-blue-200 text-xs leading-relaxed">{def.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Scenario Analysis */}
            {result.scenario && (
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur rounded-lg p-5 border border-green-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="text-green-400" size={20} />
                  <h3 className="text-xl font-bold text-white">{result.scenario.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {result.scenario.userQuestion ? (
                    <>
                      <div>
                        <div className="text-green-300 font-semibold mb-2">Your Question:</div>
                        <p className="text-blue-100 leading-relaxed italic">"{result.scenario.userQuestion}"</p>
                      </div>
                      <div>
                        <div className="text-yellow-300 font-semibold mb-2">Analysis:</div>
                        <p className="text-blue-100 leading-relaxed">{result.scenario.analysis}</p>
                      </div>
                      <div>
                        <div className="text-blue-300 font-semibold mb-2">What You Should Know:</div>
                        <p className="text-blue-100 leading-relaxed">{result.scenario.advice}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="text-green-300 font-semibold mb-2">Situation:</div>
                        <p className="text-blue-100 leading-relaxed">{result.scenario.situation}</p>
                      </div>
                      <div>
                        <div className="text-yellow-300 font-semibold mb-2">Question:</div>
                        <p className="text-blue-100 leading-relaxed italic">{result.scenario.question}</p>
                      </div>
                      <div>
                        <div className="text-blue-300 font-semibold mb-2">Legal Analysis:</div>
                        <p className="text-blue-100 leading-relaxed">{result.scenario.analysis}</p>
                      </div>
                      <div>
                        <div className="text-purple-300 font-semibold mb-2">Likely Outcome & Actions:</div>
                        <p className="text-blue-100 leading-relaxed">{result.scenario.outcome}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* 7. Suggested Follow-up Questions */}
            {result.suggestedQuestions && (
              <div className="bg-white/10 backdrop-blur rounded-lg p-5 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="text-blue-400" size={20} />
                  <h3 className="text-xl font-bold text-white">Related Questions</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-2">
                  {result.suggestedQuestions.map((question, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500/30 rounded-lg p-3 text-left transition group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-blue-200 text-sm leading-relaxed pr-2">{question}</span>
                        <ChevronRight className="text-blue-400 group-hover:translate-x-1 transition flex-shrink-0" size={16} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center">
              <p className="text-yellow-200 text-sm">
                ⚠️ <strong>Disclaimer:</strong> This information is for educational purposes only and does not constitute legal advice. 
                Laws vary by jurisdiction. For specific legal matters, consult a licensed attorney in your area.
              </p>
            </div>
          </div>
        )}

        {/* How It Works - Only show when no result */}
        {!result && !processing && (
          <div className="bg-white/10 backdrop-blur rounded-lg p-5 border border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-4">How This Works</h3>
            
            <div className="space-y-3 text-blue-200 text-sm">
              <div className="flex gap-3">
                <div className="text-xl">1️⃣</div>
                <div>
                  <span className="font-semibold text-white">Ask Your Question:</span> Describe your legal situation in plain language. Include specific details or scenarios.
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-xl">2️⃣</div>
                <div>
                  <span className="font-semibold text-yellow-300">L1: Instant Search:</span> System searches comprehensive legal database (laws, regulations, case precedents).
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-xl">3️⃣</div>
                <div>
                  <span className="font-semibold text-green-300">L2: Smart Cache:</span> Previously answered questions load instantly from memory.
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-xl">4️⃣</div>
                <div>
                  <span className="font-semibold text-purple-300">Get Comprehensive Answer:</span> Detailed explanation + legal references + real examples + follow-up questions.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
              