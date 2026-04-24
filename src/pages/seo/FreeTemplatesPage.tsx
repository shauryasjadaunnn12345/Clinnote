import { Link } from 'react-router-dom';
import { Download, ArrowRight, FileText } from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';

const templates = [
  {
    name: 'Standard SOAP Note Template',
    format: 'SOAP',
    description: 'General outpatient individual therapy SOAP note.',
    content: `S (Subjective): Client presented reporting [chief complaint]. Client described [symptoms/concerns]. Client denied [relevant negatives]. Mood reported as [mood].

O (Objective): Client appeared [appearance/grooming]. Affect was [affect]. Behavior during session was [behavior]. Cognitive functioning appeared [intact/impaired].

A (Assessment): Client presents with [diagnostic impression]. Progress toward [goal] is [describe progress]. Risk assessment: Suicidal ideation: [none/present - describe]. Homicidal ideation: [none/present]. Self-harm: [none/present].

P (Plan): Continue [modality] therapy targeting [goal]. Interventions used: [list]. Homework assigned: [describe]. Next session: [date/focus]. Referrals: [none/describe].`,
  },
  {
    name: 'Anxiety & CBT SOAP Template',
    format: 'SOAP',
    description: 'For CBT sessions targeting anxiety disorders.',
    content: `S (Subjective): Client reported [anxiety symptoms]. Client rated anxiety at [0-10] this week. Client completed [homework] with [outcome]. Identified automatic thought: "[thought]".

O (Objective): Client presented as [anxious/calm]. Physiological anxiety symptoms observed: [none/describe]. Engaged actively in cognitive restructuring exercise.

A (Assessment): Generalized Anxiety Disorder, consistent with presentation. Client demonstrating [progress/difficulty] with thought challenging. Safety: no SI/HI/SH reported.

P (Plan): Continue CBT for GAD. Practiced thought records. Assigned [homework]. Address [target] next session.`,
  },
  {
    name: 'Depression SOAP Template',
    format: 'SOAP',
    description: 'For individual therapy targeting depressive disorders.',
    content: `S (Subjective): Client reported [mood]. PHQ-9 score: [score]. Client described [specific concerns]. Sleep: [describe]. Appetite: [describe]. Energy: [describe]. Anhedonia: [present/absent].

O (Objective): Client appeared [appearance]. Psychomotor [retardation/agitation/normal]. Affect [congruent/incongruent] with stated mood.

A (Assessment): Major Depressive Disorder [single episode/recurrent], [mild/moderate/severe]. Client [making progress/struggling] with [goal]. Safety: SI [absent/passive ideation/active — describe]. No plan/intent/means.

P (Plan): [Modality] therapy continued. Behavioral activation homework assigned. Discussed sleep hygiene. Next session: focus on [area].`,
  },
  {
    name: 'Couples Therapy SOAP Template',
    format: 'SOAP',
    description: 'For couples or relational therapy sessions.',
    content: `S (Subjective): Couple presented reporting [presenting concern]. Partner A described [concern]. Partner B described [concern]. Both partners [agreed/disagreed] on [issue].

O (Objective): Partners [engaged/disengaged] in session. Communication patterns observed: [describe]. Emotional reactivity [high/moderate/low].

A (Assessment): Relational distress secondary to [issues]. Gottman's Four Horsemen [observed/not observed]. Progress toward [goal]: [describe].

P (Plan): Continued Gottman/EFT/[modality] couples therapy. Practiced [skill]. Assigned [homework] for both partners. Next session focus: [area].`,
  },
  {
    name: 'Standard DAP Note Template',
    format: 'DAP',
    description: 'General individual therapy DAP note.',
    content: `D (Data): Client reported [subjective concerns]. Client appeared [affect/presentation]. Discussed [topics]. Client [responded/did not respond] well to [intervention]. Mood: [mood]. Safety: no SI/HI.

A (Assessment): Clinical impression consistent with [diagnosis]. Client demonstrating [progress level] toward [goal]. Functional impairment [improving/stable/worsening] in [area].

P (Plan): Continue [modality] therapy. Next session will focus on [area]. Homework assigned: [describe]. Referrals: [none/describe].`,
  },
  {
    name: 'Trauma-Focused DAP Template',
    format: 'DAP',
    description: 'For trauma-informed individual therapy sessions.',
    content: `D (Data): Client presented for trauma-focused session. Client reported [current symptoms/distress level]. Discussed [trauma material/coping]. Client utilized [grounding/coping skill] during session. Distress level [decreased/remained elevated/increased].

A (Assessment): PTSD/trauma symptoms [improving/stable/worsening]. Client [showing/not showing] readiness for trauma processing. Safety: SI absent. Trauma-related dissociation [present/absent].

P (Plan): Continue [TF-CBT/CPT/EMDR/trauma-informed therapy]. Next session: [focus]. Safety plan [reviewed/updated]. Grounding homework assigned.`,
  },
  {
    name: 'BIRP Session Note Template',
    format: 'BIRP',
    description: 'Standard BIRP format for individual therapy.',
    content: `B (Behavior): Client [arrived on time/late]. Client presented as [presentation]. Client stated [direct quote or paraphrase]. Client demonstrated [behavior/coping patterns].

I (Intervention): Therapist utilized [CBT/DBT/psychoeducation/motivational interviewing/other]. Explored [topic]. Practiced [skill]. Provided [support/validation/challenge].

R (Response): Client responded [positively/with resistance/with insight]. Client [identified/was unable to identify] [insight/skill]. Client affect [shifted/remained] [describe].

P (Plan): Continue [modality]. Assigned [homework]. Next session: [focus]. Referrals: [none/describe]. Frequency: [weekly/biweekly].`,
  },
  {
    name: 'Group Therapy SOAP Template',
    format: 'SOAP',
    description: 'For group therapy session documentation.',
    content: `S (Subjective): Group member [client initials/ID] participated in [group name] group therapy. Member reported [presenting issue] during check-in. Member shared [content].

O (Objective): Member attended [session number] of [total] planned sessions. Participation level: [active/passive/resistant]. Group cohesion: [strong/developing/low].

A (Assessment): Member demonstrating [progress/difficulty] with [treatment goal]. Group dynamics [supportive/conflicted]. Safety: No safety concerns identified for this member.

P (Plan): Continue group participation. Individual goals for next session: [describe]. Any between-session contact: [none/describe].`,
  },
  {
    name: 'EMDR Session SOAP Template',
    format: 'SOAP',
    description: 'Specific to EMDR protocol documentation.',
    content: `S (Subjective): Client presented for EMDR session [session number]. Client reported SUDS for target memory at [score/10] at session start. Negative cognition: "[NC]". Positive cognition: "[PC]". VoC: [score/7].

O (Objective): EMDR Phase [phase number]: [Assessment/Desensitization/Installation/Body Scan/Closure]. BLS type: [eye movements/tapping/audio tones]. Client demonstrated [abreaction/calm processing]. Body scan: [findings].

A (Assessment): Target [trauma memory] showing [reprocessing progress]. SUDS decreased to [score] by end of session. VoC increased to [score]. Safety assessment: no SI/HI.

P (Plan): Continue EMDR protocol. Next target: [describe]. Containment/safe place exercise if needed. Next session: [date].`,
  },
  {
    name: 'GIRP Therapy Note Template',
    format: 'GIRP',
    description: 'Standard GIRP format for goal-oriented therapy.',
    content: `G (Goal): Session goal: [specific goal from treatment plan]. This addresses [larger treatment goal].

I (Intervention): Therapist employed [specific modality/technique]. Psychoeducation provided on [topic]. Skills practiced: [skills]. Explored [area] using [approach].

R (Response): Client responded [positively/with difficulty/with insight]. Demonstrated understanding of [concept]. Client identified [insight/barrier/strength].

P (Plan): Progress toward goal: [describe]. Next session focus: [area]. Homework: [describe]. Treatment plan update needed: [yes/no - describe].`,
  },
];

export default function FreeTemplatesPage() {
  const handleDownload = (template: typeof templates[0]) => {
    const content = `ClinNote — Free ${template.format} Note Template\n${template.name}\n\n${template.content}\n\n---\nDownloaded from ClinNote (clinnote.in)\nAlways review and edit before saving in your EHR.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clinnote-${template.name.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEOHead
        title="Free SOAP Note Templates for Therapists — 10 Downloadable Templates — ClinNote"
        description="Download 10 free SOAP, DAP, BIRP, and GIRP therapy note templates for therapists and counselors. Professional clinical documentation templates ready to use."
        canonical="/free-soap-note-templates"
      />
      <main className="pt-24">
        <section className="bg-gradient-to-br from-[#F0FAF6] to-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav className="text-xs text-gray-400 mb-6 flex items-center justify-center gap-2">
              <Link to="/" className="hover:text-[#0E7A5F]">Home</Link>
              <span>/</span>
              <span className="text-gray-600">Free Templates</span>
            </nav>
            <h1 className="text-5xl font-extrabold text-[#1A1A2E] mb-6">Free SOAP Note Templates for Therapists</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
              10 professionally designed therapy note templates for SOAP, DAP, BIRP, and GIRP formats. Free to download and use immediately.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {templates.map((t, i) => (
                <article key={i} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#0E7A5F]/30 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="bg-[#F0FAF6] text-[#0E7A5F] text-xs font-semibold px-2.5 py-1 rounded-full">{t.format}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] mb-1 text-sm">{t.name}</h3>
                  <p className="text-xs text-gray-400 mb-4">{t.description}</p>
                  <div className="bg-gray-50 rounded-xl p-3 mb-4 max-h-28 overflow-hidden">
                    <p className="text-xs text-gray-500 font-mono leading-relaxed whitespace-pre-wrap line-clamp-4">{t.content.slice(0, 200)}...</p>
                  </div>
                  <button
                    onClick={() => handleDownload(t)}
                    className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-[#0E7A5F] border border-[#0E7A5F]/30 py-2.5 rounded-xl hover:bg-[#F0FAF6] transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Template
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F0FAF6]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-12 h-12 bg-[#0E7A5F] rounded-2xl flex items-center justify-center mx-auto mb-5">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-[#1A1A2E] mb-4">Skip the template — let AI write your notes</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Instead of filling in templates manually, use ClinNote to generate complete, professional notes from a 2-sentence session summary. Free 14-day trial, no credit card required.
            </p>
            <Link to="/signup" className="inline-flex items-center gap-2 bg-[#0E7A5F] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#0a6550] transition-colors shadow-lg shadow-[#0E7A5F]/25">
              Try AI Note Generation Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
