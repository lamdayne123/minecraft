type Props = {
  icon: string;
  title: string;
  description: string;
  commands: string[];
  color: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
  commands,
  color,
}: Props) {
  return (
    <div className="group relative rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-green-500">

      <h3 className="text-xl font-bold">
        {icon} {title}
      </h3>

      <div className="
        invisible
        absolute
        left-1/2
        top-full
        z-50
        mt-4
        w-80
        -translate-x-1/2
        rounded-2xl
        border
        border-zinc-700
        bg-zinc-900
        p-5
        opacity-0
        shadow-2xl
        transition-all
        duration-300
        group-hover:visible
        group-hover:opacity-100
      ">

        <h4 className={`text-lg font-bold ${color}`}>
          {icon} {title}
        </h4>

        <p className="mt-2 text-sm text-zinc-400">
          {description}
        </p>

        <div className="mt-4 space-y-2">
          {commands.map((cmd) => (
            <div
              key={cmd}
              className="rounded bg-black/40 px-3 py-2 font-mono text-green-400"
            >
              {cmd}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}