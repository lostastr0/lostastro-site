import { useEffect, useRef, useState } from "react";

type Skill = {
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
};

type SkillToolsProps = {
  skills: Skill[];
  learningNext: Skill[];
};

export default function SkillTools({ skills, learningNext }: SkillToolsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ob = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    ob.observe(sectionRef.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen flex flex-col items-center px-4 py-16 bg-black text-sky-200 transition duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="mx-auto max-w-5xl w-full">
        <h2 className="text-4xl font-extrabold mb-8 border-b-2 border-sky-500 pb-3">Skills & Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 mb-14">
          {skills.map(({ name, Icon, description }) => (
            <div
              key={name}
              className="flex flex-col items-center p-5 rounded-2xl bg-slate-800/80 shadow group hover:scale-105 transition-transform duration-200 relative"
              tabIndex={0}
              aria-label={`${name} skill`}
              role="img"
              title={description}
            >
              <Icon className="w-10 h-10 mb-2" aria-label={name} />
              <span className="text-base font-medium">{name}</span>
              <span className="pointer-events-none absolute opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition bg-sky-900 px-3 py-1 text-xs text-white rounded-lg bottom-[110%] left-1/2 -translate-x-1/2 z-20 w-max max-w-[11rem]">
                {description}
              </span>
            </div>
          ))}
        </div>
        <h3 className="text-3xl font-semibold mb-6">Learning Next</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7">
          {learningNext.map(({ name, Icon, description }) => (
            <div
              key={name}
              className="flex flex-col items-center p-5 rounded-2xl bg-slate-900/60 shadow group hover:scale-105 transition-transform duration-200 relative"
              tabIndex={0}
              aria-label={`${name} learning skill`}
              role="img"
              title={description}
            >
              <Icon className="w-10 h-10 mb-2" aria-label={name} />
              <span className="text-base font-medium text-sky-200">{name}</span>
              <span className="pointer-events-none absolute opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition bg-sky-900 px-3 py-1 text-xs text-white rounded-lg bottom-[110%] left-1/2 -translate-x-1/2 z-20 w-max max-w-[11rem]">
                {description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
