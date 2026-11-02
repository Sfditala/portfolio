"use client";

import { Check } from "lucide-react";
import { siTelegram } from "simple-icons";
import BrandIcon from "@/components/ui/BrandIcon";
import type { ReplayResult } from "@/content/workflows/types";
import { AudioView, ChatBubble, JsonView, TableView } from "./OutputViews";

type TelegramData = { bot: string; messages: { from: "user" | "bot"; text: string }[] };
type SheetData = { sheet: string; columns: string[]; rows: string[][] };
type OrderData = {
  orderId: string;
  items: { qty: number; name: string }[];
  orderType: string;
  pickup: string;
  language: string;
  transcript?: string;
};

function TelegramResult({ data }: { data: TelegramData }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-center gap-2.5 border-b border-border bg-white/5 px-3 py-2">
        <span className="flex size-7 items-center justify-center rounded-full bg-white/10 text-text">
          <BrandIcon icon={siTelegram} className="size-3.5" />
        </span>
        <div className="leading-tight">
          <p className="text-[0.8rem] font-medium text-text">{data.bot}</p>
          <p className="font-mono text-[0.65rem] text-text-dim">bot</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-3">
        {data.messages.map((message, i) => (
          <ChatBubble key={i} message={message} />
        ))}
      </div>
    </div>
  );
}

function OrderResult({ data, audioSrc }: { data: OrderData; audioSrc?: string }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border p-4">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs text-text-dim">order {data.orderId}</p>
          <span className="flex items-center gap-1 font-mono text-[0.68rem] text-success">
            <Check className="size-3.5" /> logged
          </span>
        </div>
        <ul className="mt-3 space-y-1.5">
          {data.items.map((item) => (
            <li key={item.name} className="flex gap-2 text-sm text-text">
              <span className="font-mono text-text-dim">{item.qty}×</span>
              {item.name}
            </li>
          ))}
        </ul>
        <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3 font-mono text-[0.68rem]">
          {[
            ["type", data.orderType],
            ["pickup", data.pickup],
            ["language", data.language],
          ].map(([term, value]) => (
            <div key={term}>
              <dt className="text-text-dim">{term}</dt>
              <dd className="mt-0.5 text-text-muted">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <AudioView transcript={data.transcript} src={audioSrc} />
    </div>
  );
}

export default function ResultView({ result }: { result: ReplayResult }) {
  switch (result.type) {
    case "telegram":
      return <TelegramResult data={result.data as TelegramData} />;
    case "order":
      return <OrderResult data={result.data as OrderData} audioSrc={result.audioSrc} />;
    case "sheet": {
      const sheet = result.data as SheetData;
      return (
        <div>
          <p className="mb-2 font-mono text-xs text-text-dim">{sheet.sheet}</p>
          <TableView table={sheet} />
        </div>
      );
    }
    default:
      return typeof result.data === "string" ? (
        <p dir="auto" className="text-sm leading-relaxed text-text-muted">
          {result.data}
        </p>
      ) : (
        <JsonView value={result.data} />
      );
  }
}
