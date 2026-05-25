export default function SectionHead({
  idx,
  title,
  note,
}: {
  idx: string;
  title: string;
  note?: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-3 mb-5">
      <span className="text-[13px] font-bold tracking-[0.2em] text-clay">{idx}</span>
      <h2 className="font-display font-bold text-[30px] tracking-tight">{title}</h2>
      {note ? (
        <span className="text-[12.5px] text-paper-dim ml-auto text-right">{note}</span>
      ) : null}
    </div>
  );
}
