"use client";

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

// Bottom, thumb-reachable navigation. Horizontally scrollable so all sections
// fit on a narrow phone without shrinking tap targets.
export default function BottomNav({
  items,
  active,
  onJump,
}: {
  items: NavItem[];
  active: string;
  onJump: (id: string) => void;
}) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 safe-bottom border-t border-line bg-bg/90 backdrop-blur-xl">
      <div className="flex gap-1 overflow-x-auto no-scrollbar px-2 py-2">
        {items.map((it) => {
          const on = active === it.id;
          return (
            <button
              key={it.id}
              onClick={() => onJump(it.id)}
              aria-current={on ? "page" : undefined}
              className={`flex-1 min-w-[62px] flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-2xl transition-colors ${
                on ? "bg-clay text-ink" : "text-paper-dim hover:text-paper"
              }`}
            >
              <span className="text-[18px] leading-none">{it.icon}</span>
              <span className={`text-[10px] font-semibold ${on ? "text-ink" : ""}`}>
                {it.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
