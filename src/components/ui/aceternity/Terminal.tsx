import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Terminal Aceternity, adapté au thème du portfolio.
 *
 * Le composant est volontairement « dumb » : il ne connaît ni `useI18n` ni les
 * données du site. Passer des tableaux **stables** (constantes de module) à
 * `commands` / `outputs`, sinon l'effet d'écriture redémarre à chaque render.
 */

interface TerminalProps {
  /** Commandes jouées en boucle, une par `delayBetweenCommands`. */
  commands: string[];
  /** Sortie affichée sous une commande, indexée par la commande. */
  outputs?: Record<string, string[]>;
  /** Délai entre deux caractères, en ms. */
  typingSpeed?: number;
  /** Pause entre deux commandes, en ms. */
  delayBetweenCommands?: number;
  /** Invite affichée avant chaque commande. */
  prompt?: string;
  accentColor?: string;
  className?: string;
}

interface TerminalLine {
  id: number;
  kind: "command" | "output";
  text: string;
}

export function Terminal({
  commands,
  outputs,
  typingSpeed = 50,
  delayBetweenCommands = 1000,
  prompt = "j0n1c4@portfolio",
  accentColor = "#12F7D6",
  className,
}: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  // `once` : le terminal démarre quand on le voit, et ne se rejoue pas ensuite.
  const isVisible = useInView(scrollRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isVisible) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });

    const run = async () => {
      let id = 0;

      for (const command of commands) {
        if (cancelled) return;
        const lineId = (id += 1);

        // Une commande = une ligne dont le texte grandit caractère par caractère.
        for (let length = 1; length <= command.length; length += 1) {
          if (cancelled) return;
          const text = command.slice(0, length);
          setLines((current) => [
            ...current.filter((line) => line.id !== lineId),
            { id: lineId, kind: "command", text },
          ]);
          await wait(typingSpeed);
        }

        for (const text of outputs?.[command] ?? []) {
          if (cancelled) return;
          const outputId = (id += 1);
          setLines((current) => [...current, { id: outputId, kind: "output", text }]);
          await wait(typingSpeed * 4);
        }

        await wait(delayBetweenCommands);
      }
    };

    void run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [isVisible, commands, outputs, typingSpeed, delayBetweenCommands]);

  // Le curseur doit toujours rester visible, comme dans un vrai shell.
  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [lines]);

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] font-mono text-xs shadow-2xl",
        className,
      )}
    >
      {/* Barre de titre — les trois pastilles sont décoratives */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
        <span className="h-3 w-3 rounded-full bg-green-400/70" />
        <span className="ml-2 text-[11px] text-gray-500">zsh — portfolio</span>
      </div>

      <div ref={scrollRef} className="h-72 space-y-1 overflow-y-auto p-4 leading-relaxed">
        {lines.map((line, index) => (
          <p
            key={line.id}
            className={cn(
              "break-words whitespace-pre-wrap",
              line.kind === "command" ? "text-gray-200" : "text-gray-500",
            )}
          >
            {line.kind === "command" && (
              <>
                <span style={{ color: accentColor }}>{prompt}</span>
                <span className="text-gray-600">:~$ </span>
              </>
            )}
            {line.text}
            {index === lines.length - 1 && (
              <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-current align-middle" />
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
