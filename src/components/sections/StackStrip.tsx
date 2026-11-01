import BrandIcon from "@/components/ui/BrandIcon";
import { Container } from "@/components/ui/Section";
import { stackGroups } from "@/content/stack";

export default function StackStrip() {
  return (
    <section aria-label="Tools I build with" className="border-y border-border bg-surface/40 py-12">
      <Container>
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {stackGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-4 flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.16em] text-text-dim uppercase">
                <span aria-hidden className="size-1.5 rounded-full border border-text-dim" />
                {group.label}
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-3">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-2 text-sm text-text-dim transition-colors duration-200 hover:text-text"
                  >
                    {item.icon ? (
                      <BrandIcon icon={item.icon} className="size-4" />
                    ) : (
                      <span aria-hidden className="font-mono text-xs text-text-dim/70">
                        {"{}"}
                      </span>
                    )}
                    <span className={item.icon ? "" : "font-mono text-[0.8rem]"}>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
